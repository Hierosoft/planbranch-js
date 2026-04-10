import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("schedule_item_reasons")
export class ScheduleItemReason {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  color?: string;
}