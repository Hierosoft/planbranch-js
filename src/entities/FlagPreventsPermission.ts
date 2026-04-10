import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Flag } from "./Flag.ts";
import { Permission } from "./Permission.ts";

@Entity("flag_prevented_permissions")
export class FlagPreventsPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Flag, (flag) => flag.preventedPermissions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "flagId" })
  flag: Flag;

  @Column()
  flagId: number;

  @ManyToOne(() => Permission, { onDelete: "CASCADE" })
  @JoinColumn({ name: "permissionId" })
  permission: Permission;

  @Column()
  permissionId: number;
}