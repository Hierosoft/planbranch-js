import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Person } from "./Person.ts";
import { UnavailableReason } from "./UnavailableReason.ts";

@Entity("person_unavailable_periods")
export class PersonUnavailablePeriod {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, (person) => person.unavailablePeriods, { onDelete: "CASCADE" })
  @JoinColumn({ name: "personId" })
  person: Person;

  @Column()
  personId: number;

  @ManyToOne(() => UnavailableReason, { nullable: false })
  @JoinColumn({ name: "unavailableReasonId" })
  unavailableReason: UnavailableReason;

  @Column()
  unavailableReasonId: number;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date", nullable: true })
  endDate?: Date;

  @Column({ type: "text", nullable: true })
  note?: string;
}