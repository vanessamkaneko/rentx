import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity("specifications")
class Specification {
  @PrimaryColumn()
  id?: string;

  @Column({ type: 'varchar', nullable: true })
  name: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  description: string | undefined;

  @CreateDateColumn()
  created_at: Date | undefined;

  constructor() {
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Specification }
