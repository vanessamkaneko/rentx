
import { Car } from "./src/modules/cars/infra/typeorm/entities/Car";
import { User } from "./src/modules/accounts/infra/typeorm/entities/User";
import { Category } from "./src/modules/cars/infra/typeorm/entities/Category";
import { Specification } from "./src/modules/cars/infra/typeorm/entities/Specification";
import { DataSource } from "typeorm";
import { CarImage } from "./src/modules/cars/infra/typeorm/entities/CarImage";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: process.env.NODE_ENV === 'test' ? "rentx_test" : 'rentx',
  synchronize: false,
  entities: [Category, Specification, User, Car, CarImage, Rental],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
})