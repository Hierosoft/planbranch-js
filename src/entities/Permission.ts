import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("permissions")
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // TRUCK, Lighthouse, Kitchen, Desk, Lab, etc.

  @Column({ nullable: true })
  color?: string;
}