import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });

    expect(car).toHaveProperty("id")
  })

  it("should not be able to create a car with existing license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "First Car",
        description: "Description car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category"
      });

      await createCarUseCase.execute({
        name: "Second Car",
        description: "Description car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category"
      });
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Available Car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });

    expect(car.available).toBe(true)
  })
})

