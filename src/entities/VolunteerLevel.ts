import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("volunteer_levels")
export class VolunteerLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: false })
  allowsSpecialOpportunities: boolean;
}