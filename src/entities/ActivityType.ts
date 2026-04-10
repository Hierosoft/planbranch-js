import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Permission } from "./Permission.ts";
import { PersonPhase } from "./PersonPhase.ts";
import { ScheduleItemReason } from "./ScheduleItemReason.ts";
import { VolunteerLevel } from "./VolunteerLevel.ts";

@Entity("activity_types")
export class ActivityType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;

  @ManyToOne(() => Permission, { nullable: true })
  @JoinColumn({ name: "permissionId" })
  permission?: Permission;

  @Column({ nullable: true })
  permissionId?: number;

  @ManyToOne(() => ScheduleItemReason, { nullable: true })
  @JoinColumn({ name: "scheduleItemReasonId" })
  scheduleItemReason?: ScheduleItemReason;

  @Column({ nullable: true })
  scheduleItemReasonId?: number;

  @ManyToOne(() => PersonPhase, { nullable: true })
  @JoinColumn({ name: "personPhaseId" })
  personPhase?: PersonPhase;

  @Column({ nullable: true })
  personPhaseId?: number;

  @Column({ default: false })
  showOnDay: boolean;

  @Column({ type: "text", nullable: true })
  showOnDayAs?: string;

  @Column({ nullable: true })
  showOnWeekAs?: string;

  @Column({ default: false })
  bold: boolean;

  @Column({ default: false })
  italics: boolean;

  @Column({ type: "varchar", length: 20, nullable: true })
  fgColor?: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  bgColor?: string;

  @Column({ nullable: true })
  timeOnWeekAs?: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  timeColor?: string;

  @Column({ type: "int", nullable: true })
  limitPerWeek?: number;

  @Column({ type: "float", default: 0.5 })
  fractionOfDay: number = 0.5;

  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => VolunteerLevel, { nullable: true })
  @JoinColumn({ name: "minVolunteerLevelId" })
  minVolunteerLevel?: VolunteerLevel;

  @Column({ nullable: true })
  minVolunteerLevelId?: number;
}