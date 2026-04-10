import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PersonFlag } from "./PersonFlag.ts";
import { FlagPreventsPermission } from "./FlagPreventsPermission.ts";

@Entity("flags")
export class Flag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ default: false })
  publish: boolean;

  @OneToMany(() => PersonFlag, (pf) => pf.flag)
  personFlags: PersonFlag[];

  @OneToMany(() => FlagPreventsPermission, (fpp) => fpp.flag)
  preventedPermissions: FlagPreventsPermission[];
}