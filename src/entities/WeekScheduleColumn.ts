import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("week_schedule_columns")
export class WeekScheduleColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // MON, TUE, etc.
}