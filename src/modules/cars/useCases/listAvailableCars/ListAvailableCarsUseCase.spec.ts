import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Description car",
      daily_rate: 110,
      license_plate: "DEF-1231",
      fine_amount: 40,
      brand: "Brand car",
      category_id: "categoryId",
    });

    const cars = await listAvailableCarsUseCase.execute({})
    
    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Description car",
      daily_rate: 110,
      license_plate: "DEF-1232",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "categoryId",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test"
    })
    
    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Description car",
      daily_rate: 110,
      license_plate: "DEF-1233",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "categoryId",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car 3"
    })
    
    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Description car",
      daily_rate: 110,
      license_plate: "DEF-1233",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345"
    })
    
    expect(cars).toEqual([car])
  })
})