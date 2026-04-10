import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("person_phases")
export class PersonPhase {
  @PrimaryGeneratedColumn()
  id: number;
}