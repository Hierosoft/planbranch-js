import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { PersonPhase } from "./PersonPhase.ts";
import { VolunteerLevel } from "./VolunteerLevel.ts";
import { PersonPermission } from "./PersonPermission.ts";
import { IncompatiblePerson } from "./IncompatiblePerson.ts";
import { PersonUnavailablePeriod } from "./PersonUnavailablePeriod.ts";
import { PersonFlag } from "./PersonFlag.ts";
import { ScheduleItem } from "./ScheduleItem.ts";

@Entity("people")
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName?: string;

  @ManyToOne(() => PersonPhase, { nullable: false })
  @JoinColumn({ name: "personPhaseId" })
  personPhase: PersonPhase;

  @Column()
  personPhaseId: number;

  @ManyToOne(() => VolunteerLevel, { nullable: true })
  @JoinColumn({ name: "volunteerLevelId" })
  volunteerLevel?: VolunteerLevel;

  @Column({ nullable: true })
  volunteerLevelId?: number;

  @Column({ default: true })
  active: boolean;

  @Column({ type: "text", nullable: true })
  note?: string;

  @OneToMany(() => PersonFlag, (pf) => pf.person)
  personFlags: PersonFlag[];

  @OneToMany(() => PersonPermission, (pp) => pp.person)
  personPermissions: PersonPermission[];

  @OneToMany(() => IncompatiblePerson, (inc) => inc.person)
  incompatibleWith: IncompatiblePerson[];

  @OneToMany(() => PersonUnavailablePeriod, (pup) => pup.person)
  unavailablePeriods: PersonUnavailablePeriod[];

  @OneToMany(() => ScheduleItem, (si) => si.person)
  scheduleItems: ScheduleItem[];
}