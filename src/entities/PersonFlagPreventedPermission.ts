import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { PersonFlag } from "./PersonFlag.js";
import { Permission } from "./Permission.js";

@Entity("person_flag_prevented_permissions")
export class PersonFlagPreventsPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PersonFlag, { onDelete: "CASCADE" })
  @JoinColumn({ name: "personFlagId" })
  personFlag: PersonFlag;

  @Column()
  personFlagId: number;

  @ManyToOne(() => Permission, { onDelete: "CASCADE" })
  @JoinColumn({ name: "permissionId" })
  permission: Permission;

  @Column()
  permissionId: number;
}