import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Person } from "./Person.ts";

@Entity("incompatible_people")
export class IncompatiblePerson {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, (person) => person.incompatibleWith, { onDelete: "CASCADE" })
  @JoinColumn({ name: "personId" })
  person: Person;

  @Column()
  personId: number;

  @ManyToOne(() => Person, { onDelete: "CASCADE" })
  @JoinColumn({ name: "incompatiblePersonId" })
  incompatiblePerson: Person;

  @Column()
  incompatiblePersonId: number;
}