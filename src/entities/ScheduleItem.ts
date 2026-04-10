import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Person } from "./Person.ts";
import { Week } from "./Week.ts";
import { WeekScheduleColumn } from "./WeekScheduleColumn.ts";
import { ActivityType } from "./ActivityType.ts";
import { ScheduleItemReason } from "./ScheduleItemReason.ts";

@Entity("schedule_items")
export class ScheduleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, { nullable: false })
  @JoinColumn({ name: "personId" })
  person: Person;

  @Column()
  personId: number;

  @ManyToOne(() => Week, { nullable: false })
  @JoinColumn({ name: "weekId" })
  week: Week;

  @Column()
  weekId: number;

  @ManyToOne(() => WeekScheduleColumn, { nullable: false })
  @JoinColumn({ name: "weekScheduleColumnId" })
  weekScheduleColumn: WeekScheduleColumn;

  @Column()
  weekScheduleColumnId: number;

  @ManyToOne(() => ActivityType, { nullable: false })
  @JoinColumn({ name: "activityTypeId" })
  activityType: ActivityType;

  @Column()
  activityTypeId: number;

  @Column({ type: "time", nullable: true })
  time?: string;

  @Column({ nullable: true })
  showOnWeekAs?: string;

  @ManyToOne(() => ScheduleItemReason, { nullable: true })
  @JoinColumn({ name: "scheduleItemReasonId" })
  scheduleItemReason?: ScheduleItemReason;

  @Column({ nullable: true })
  scheduleItemReasonId?: number;
}