import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("weeks")
export class Week {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date" })
  endDate: Date;
}