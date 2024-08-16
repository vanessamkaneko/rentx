import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid"

@Entity("rentals")
class Rental {
  @PrimaryColumn()
  id?: string;

  @Column({ type: 'varchar', nullable: true })
  car_id: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  user_id: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  start_date: Date | undefined;

  @Column({ type: 'varchar', nullable: true })
  end_date: Date | undefined;

  @Column({ type: 'varchar', nullable: true })
  expected_return_date: Date | undefined;

  @Column({ type: 'float', nullable: true })
  total: number | undefined;

  @CreateDateColumn()
  created_at: Date | undefined;

  @UpdateDateColumn()
  updated_at: Date | undefined;

  constructor() {
    if(!this.id) {
      this.id = uuidv4()
    }
  }
}

export { Rental }