import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("cars_image")
class CarImage {
  @PrimaryColumn()
  id?: string;

  @Column({ type: 'varchar' })
  car_id: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  image_name: string | undefined;

  @CreateDateColumn()
  created_at: Date | undefined;

  constructor() {
    if(!this.id) {
      this.id = uuidv4()
    }
  }
}

export { CarImage }