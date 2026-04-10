import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Person } from "./Person.ts";
import { Flag } from "./Flag.ts";

@Entity("person_flags")
export class PersonFlag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, (person) => person.personFlags, { onDelete: "CASCADE" })
  @JoinColumn({ name: "personId" })
  person: Person;

  @Column()
  personId: number;

  @ManyToOne(() => Flag, (flag) => flag.personFlags, { onDelete: "CASCADE" })
  @JoinColumn({ name: "flagId" })
  flag: Flag;

  @Column()
  flagId: number;
}