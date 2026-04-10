import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { resolve } from "path";

import { VolunteerLevel } from "./entities/VolunteerLevel.ts";
import { Permission } from "./entities/Permission.ts";
import { PersonPhase } from "./entities/PersonPhase.ts";
import { Flag } from "./entities/Flag.ts";
import { PersonFlag } from "./entities/PersonFlag.ts";
import { FlagPreventsPermission } from "./entities/FlagPreventsPermission.ts";
import { Person } from "./entities/Person.ts";
import { PersonPermission } from "./entities/PersonPermission.ts";
import { IncompatiblePerson } from "./entities/IncompatiblePerson.ts";
import { UnavailableReason } from "./entities/UnavailableReason.ts";
import { PersonUnavailablePeriod } from "./entities/PersonUnavailablePeriod.ts";
import { ScheduleItemReason } from "./entities/ScheduleItemReason.ts";
import { ActivityType } from "./entities/ActivityType.ts";
import { Week } from "./entities/Week.ts";
import { WeekScheduleColumn } from "./entities/WeekScheduleColumn.ts";
import { ScheduleItem } from "./entities/ScheduleItem.ts";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: resolve(process.cwd(), "data/planbranch.sqlite"),
  synchronize: true,           // Set to false + use migrations in production
  logging: process.env.NODE_ENV === "development",
  entities: [
    VolunteerLevel,
    Permission,
    PersonPhase,
    Flag,
    PersonFlag,
    FlagPreventsPermission,
    Person,
    PersonPermission,
    IncompatiblePerson,
    UnavailableReason,
    PersonUnavailablePeriod,
    ScheduleItemReason,
    ActivityType,
    Week,
    WeekScheduleColumn,
    ScheduleItem,
  ],
  namingStrategy: new SnakeNamingStrategy(),
});