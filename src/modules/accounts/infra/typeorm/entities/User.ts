import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
class User {

  @PrimaryColumn()
  id?: string;

  @Column({ type: 'varchar', nullable: true })
  name: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  email: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  password: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  driver_license: string | undefined;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean | undefined;

  @Column({ type: 'varchar', nullable: true })
  avatar: string | undefined;

  @CreateDateColumn()
  created_at: Date | undefined;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User }