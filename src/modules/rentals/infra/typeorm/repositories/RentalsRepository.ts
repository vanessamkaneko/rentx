import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../../ormconfig";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = AppDataSource.getRepository(Rental)
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
    const openByCar = await this.repository.findOne({ where: { car_id, end_date: undefined }})

    return openByCar
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({ where: { user_id, end_date: undefined }})

    return openByUser!
  }

  async create({ user_id, car_id, expected_return_date, id, end_date, total }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create ({
      user_id, 
      car_id, 
      expected_return_date,
      id,
      end_date,
      total
    })

    await this.repository.save(rental)

    return rental
  }

  async findById(id: string): Promise<Rental | null> {
    const rental = await this.repository.findOne({ where: { id } });

    return rental
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({ where: { user_id }, relations: ["car"] })

    return rentals
  }

}

export { RentalsRepository }