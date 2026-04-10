import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Person } from "./Person.ts";
import { Permission } from "./Permission.ts";

@Entity("person_permissions")
export class PersonPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, (person) => person.personPermissions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "personId" })
  person: Person;

  @Column()
  personId: number;

  @ManyToOne(() => Permission, { onDelete: "CASCADE" })
  @JoinColumn({ name: "permissionId" })
  permission: Permission;

  @Column()
  permissionId: number;
}