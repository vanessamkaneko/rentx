import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
  name: string | undefined;
  description: string | undefined;
  daily_rate: number | undefined;
  license_plate: string | undefined;
  fine_amount: number | undefined;
  brand: string | undefined;
  category_id: string | undefined;
  specifications?: Specification[];
  id?: string;
}

export { ICreateCarDTO }