import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("categories")
class Category {
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

export { Category }