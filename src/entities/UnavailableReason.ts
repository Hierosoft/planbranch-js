import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("unavailable_reasons")
export class UnavailableReason {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}