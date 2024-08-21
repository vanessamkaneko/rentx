import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";


interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject ("DateProvider")
    private dateProvider: IDateProvider
  ){}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental!.car_id!)

    const minimum_daily = 1;

    if(!rental) {
      throw new AppError("Rental does not exist!")
    }

    const dateNow = this.dateProvider.dateNow();

    // Quantas diárias tem o aluguel
    let daily = this.dateProvider.compareInDays(
      rental.start_date!,
      this.dateProvider.dateNow()
    )

    // Se for menos de 1 dia, é atribuído 1 diária
    if(daily <= 0) {
      daily = minimum_daily;
    }

    // Cálculo de dia de atrasos (se houver)
    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date!
    )

    let total = 0;
    
    // Dias de atraso * valor da multa
    if(delay > 0) {
      const calculate_fine = delay * car!.fine_amount!;
      total = calculate_fine;
    }

    total += daily * car!.daily_rate! // total com multa + (diárias * valor da diária)

    rental.end_date = this.dateProvider.dateNow(); //atualizando end date...
    rental.total = total; //atualizando total...

    const rentalDTO: ICreateRentalDTO = {
      user_id: rental.user_id!,
      car_id: rental.car_id!,
      expected_return_date: rental.expected_return_date!,
    }
 
    await this.rentalsRepository.create(rentalDTO) // atualizando o rental
    await this.carsRepository.updateAvailable(car!.id!, true) // carro disponível novamente

    return rental
  }
}

export { DevolutionRentalUseCase }