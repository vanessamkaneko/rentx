import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../../ormconfig";


class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car)
  }

  async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } })

    return car!
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    console.log(brand, category_id, name)
    const carsQuery = await this.repository
    .createQueryBuilder("c")
    .where("available = :available", { available: true })

    if(brand) {
      carsQuery.andWhere("c.brand = :brand", { brand })
    }

    if(name) {
      carsQuery.andWhere("c.name = :name", { name })
    }

    if(category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  async findById(id: string): Promise<Car | null> {
    const car = await this.repository.findOne( { where: { id } })
    return car
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute()
      // Update cars set available = 'true' where id = :id
  }
}

export { CarsRepository }