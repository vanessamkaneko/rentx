import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid"
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id?: string;

  @Column({ type: 'varchar', nullable: true })
  name: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  description: string | undefined;

  @Column({ type: 'numeric' })
  daily_rate: number | undefined;

  @Column({ type: 'boolean', default: true })
  available: boolean | undefined;

  @Column({ type: 'varchar', nullable: true })
  license_plate: string | undefined;

  @Column({ type: 'numeric' })
  fine_amount: number | undefined;

  @Column({ type: 'varchar', nullable: true })
  brand: string | undefined;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category | undefined

  @Column({ type: 'varchar', nullable: true })
  category_id: string | undefined;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "car_id" }],
    inverseJoinColumns:[{ name: "specification_id" }]
  })
  specifications: Specification[] | undefined

  @CreateDateColumn()
  created_at: Date | undefined;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
    }
  }
}

export { Car }