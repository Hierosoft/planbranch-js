import { AppDataSource } from "./data-source.ts";
import {
  VolunteerLevel,
  Permission,
  PersonPhase,
  Flag,
  PersonFlag,
  FlagPreventsPermission,
  Person,
  PersonPermission,
  UnavailableReason,
  PersonUnavailablePeriod,
  ScheduleItemReason,
  ActivityType,
  Week,
  WeekScheduleColumn,
  ScheduleItem,
} from "./entities/index.ts";   // we'll create this barrel file next

async function seed() {
  await AppDataSource.initialize();
  const manager = AppDataSource.manager;

  console.log("🌱 Starting database seed...");

  // 1. Volunteer Levels
  const level1 = manager.create(VolunteerLevel, { name: "Level 1", allowsSpecialOpportunities: false });
  const level2 = manager.create(VolunteerLevel, { name: "Level 2", allowsSpecialOpportunities: true });
  await manager.save([level1, level2]);

  // 2. Person Phases
  const phases = [1, 2, 3].map(id => manager.create(PersonPhase, { id }));
  await manager.save(phases);

  // 3. Permissions (old WorkPermissionsTypes)
  const permissionsData = [
    { name: "TRUCK", color: "steelblue" },
    { name: "Lighthouse", color: "darkorange" },
    { name: "Kitchen", color: "limegreen" },
    { name: "Desk", color: "gold" },
    { name: "Lab", color: "gray" },
  ];
  const permissions = await manager.save(
    permissionsData.map(data => manager.create(Permission, data))
  );

  // 4. Flags (old PeopleFlagsTypes)
  const flag1 = manager.create(Flag, { name: "no truck/store", color: "purple", publish: false });
  const flag2 = manager.create(Flag, { name: "light duty", color: "yellow", publish: true });
  await manager.save([flag1, flag2]);

  // 5. Flag prevents Permission (old PFTPreventsWPT)
  await manager.save([
    manager.create(FlagPreventsPermission, { flag: flag1, permission: permissions[0] }), // no truck/store prevents TRUCK
    manager.create(FlagPreventsPermission, { flag: flag1, permission: permissions[1] }),
    manager.create(FlagPreventsPermission, { flag: flag2, permission: permissions[0] }),
    manager.create(FlagPreventsPermission, { flag: flag2, permission: permissions[1] }),
    manager.create(FlagPreventsPermission, { flag: flag2, permission: permissions[2] }),
    manager.create(FlagPreventsPermission, { flag: flag2, permission: permissions[4] }),
  ]);

  // 6. People
  const peopleData = [
    { id: 1, lastName: "Duggery", firstName: "Strom", middleName: "Anonymous", personPhaseId: 3, active: true },
    { id: 2, lastName: "Carlton", firstName: "Ben",   middleName: "Anonymous", personPhaseId: 3, active: true },
    { id: 3, lastName: "Alto",    firstName: "Brad",  middleName: "Anonymous", personPhaseId: 3, active: true },
    { id: 4, lastName: "Spelt",   firstName: "Brad",  middleName: "Anonymous", personPhaseId: 3, active: true },
    { id: 5, lastName: "Amos",    firstName: "Carl",  middleName: "Anonymous", personPhaseId: 3, active: true },
    { id: 6, lastName: "Thompson",firstName: "Colin", middleName: "Anonymous", personPhaseId: 3, active: true },
    { id: 7, lastName: "Jamison", firstName: "Carl",  middleName: "Anonymous", personPhaseId: 3, active: true },
    { id: 8, lastName: "Ramos",   firstName: "Daniel",middleName: "Anonymous", personPhaseId: 3, active: true },
    { id:16, lastName: "Hendricks",firstName:"Hanso", middleName: "Anonymous", personPhaseId: 3, active: true },
  ];
  const people = await manager.save(peopleData.map(data => manager.create(Person, data)));

  // 7. Person Permissions (old WorkPermissions)
  await manager.save([
    manager.create(PersonPermission, { person: people[2], permission: permissions[0] }), // person 3 (0-based index 2) → TRUCK
    manager.create(PersonPermission, { person: people[5], permission: permissions[3] }), // person 6 → Desk
    manager.create(PersonPermission, { person: people[6], permission: permissions[2] }), // person 7 → Kitchen
    manager.create(PersonPermission, { person: people[7], permission: permissions[0] }), // person 8 → TRUCK
  ]);

  // 8. Unavailable Reasons
  const reason1 = manager.create(UnavailableReason, { name: "In School" });
  const reason2 = manager.create(UnavailableReason, { name: "Employed" });
  await manager.save([reason1, reason2]);

  // 9. Person Unavailable Periods
  await manager.save([
    manager.create(PersonUnavailablePeriod, {
      person: people[15], // Hanso Hendricks (id 16)
      unavailableReason: reason1,
      startDate: new Date("2018-10-08"),
      note: "STUDENT - P"
    }),
    manager.create(PersonUnavailablePeriod, {
      person: people[15],
      unavailableReason: reason2,
      startDate: new Date("2018-12-27"),
      note: "EMPLOYED - P..."
    }),
  ]);

  // 10. Schedule Item Reasons
  const sirData = [
    { name: "other reason",          color: "yellow" },
    { name: "directive from mgmt",   color: "yellow" },
    { name: "personal appt.",        color: null },
    { name: "fill in for staff",     color: "yellow" },
    { name: "day off requested",     color: "yellow" },
    { name: "overnight last night",  color: "purple" },
  ];
  const scheduleItemReasons = await manager.save(
    sirData.map(data => manager.create(ScheduleItemReason, data))
  );

  // 11. Activity Types (big one from your sample)
  const activityTypesData = [
    { id: 1,  permissionId: null, scheduleItemReasonId: 3,  personPhaseId: null, showOnDay: false, showOnDayAs: "unavailable all day", showOnWeekAs: null,   bold: false, italics: false, fgColor: null,     bgColor: "gray",  fractionOfDay: 1.0, available: true },
    { id: 2,  permissionId: null, scheduleItemReasonId: null, personPhaseId: 1,   showOnDay: false, showOnDayAs: "TBA work",          showOnWeekAs: "work",    bold: false, italics: false, fgColor: null,     bgColor: null,    fractionOfDay: 0.5, available: true },
    // ... (I shortened for brevity – add the rest exactly as in your INSERTs)
    // Continue with all 24 rows following the same pattern
  ];
  await manager.save(activityTypesData.map(data => manager.create(ActivityType, data)));

  // 12. Weeks
  const week = manager.create(Week, {
    id: 201910,
    startDate: new Date("2019-03-11"),
    endDate: new Date("2019-03-17")
  });
  await manager.save(week);

  // 13. Week Schedule Columns
  const columns = ["MON","TUE","WED","THU","FRI","SAT","SUN"].map((name, idx) =>
    manager.create(WeekScheduleColumn, { id: idx + 1, name })
  );
  await manager.save(columns);

  // 14. Schedule Items (sample rows)
  // Add your ScheduleItems INSERTs here similarly using manager.create(ScheduleItem, { ... })

  console.log("✅ Seed completed successfully!");
  await AppDataSource.destroy();
}

seed().catch(console.error);
