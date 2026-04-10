# PlanBranch
Manage your adult support center's activities.

## Features
* Set permissions and levels for residents.
* Assign training, counseling, and volunteer work for residents.
* Generate a space-efficient one-page schedule for the week.
* Develop week overview.
* Copy from week to day (then add more details on day roster,
  such as activities).

## Setup
- Install nvm
- nvm install v22
- nvm use v22
```
cd planbranch-js && npm install && npm run seed
```
(`npm run seed` sets up an SQLite database using TypeORM. See src directory for details)

## Known Issues
### Outliers on destination schedule
* testing: newcomer & every 6 wks
* small class on Tues, Wed, Fri

### Not yet implemented
* Job Hunting on Days Specified (copied to day schedule)
* [ ] Override background color with ScheduleItemsReasons.SIR_Color if ScheduleItems.SIR_Id is set
  - only if the related ScheduleItemsReasons.SIR_WarnOnChange is set (to 1)
* [ ] See who can go to lighthouse on a certain day
* Add PeopleUnavailableReasons
* If People.Note is not null, Show ID in red and click/hover to see note.
* Italicize ShowAs string if related field in AT_Italics is 1
* Enforce SC_LimitPerWeek (prevent count of this type
  `> SC_LimitPerWeek`).
* Enforce SC_FractionOfDay (prevent > 1.0).
* Prefill the ScheduleItems.SIR_Id if ActivitiesTypes.SIR_Id is not null.
* Prefill the ScheduleItems.ET_Id if SlotCodes.ET_Id is not null.
* Fill entire row of schedule with reasons if a row in
  PeopleUnavailableReasons exists for the row in People.
* If WorkPermissionsTypes.PFT_Id is not null, that PeopleFlagType
  prevents scheduling the person for that permission.
* Manually track current value of ID of each table (Sample data is
  dependent on manually-assigned primary keys).
* Make sticky setting (0 or 1) for ScheduleItems that should be
  copied to next week (or possibly to a separate template table
  containing malleable default values).
* App-Defined Roles:
  - Master Scheduler (Jason)
  - Desk Scheduler
  - Counseling Scheduler
* The director or assistant director could call and place a resident in
  a staff position or direct that the resident must be working that day
  (see `higher level decision` in ScheduleItemsReasons).
* Teacher (only day classes affect master scheduler)
  - assigned to certain students
  - no truck, nor lighthouse that day
* Tutor: Tutor may ask to switch time later
  - Tutor says when they can come.
    - The master scheduler may switch which tutor a resident sees, such
      as by switching two residents.
* Every 4-5 weeks, someone gets overnight desk--usually give them off
  the next day

### Master Schedule Caveats Not Yet Implemented
* truck/cashier: (not guys flagged purple)
  - truck: only if healthy, & only certain guys
  - lighthouse: offsite thrift store w/ limited staff, 30min bus, 30 m
    walk (2 or 3 guys usually)
* Sundays off usually, else Sat

### Desk Schedule Features Not Yet Implemented
* Volunteers are at the desk when staff is not available
* Printed for each student from MS Access,
  but only item from day classes is GED class,
  so it doesn't need input from master day schedule
  - Access DB needs work: such as, hide fields on report
* Someone sends this to the master scheduler (to Jason).
* The master scheduler changes the timeslot.
  - same for Counselor schedule
    - REQUIRED: keep person w/ same counselor
      but prioritize tutoring because tutors are only available certain
      times (keeping residents with same tutor is preferred)

### Desk Schedule Caveats Not Yet Implemented
* Avoid revisiting each day roster multiple times (see related info that
  affects schedule)
* Groups don't always start the same week, but a group lasts 4 weeks.
* Tutoring schedule: Accommodate changes to tutor & resident
  availability.
  - Master scheduler (Jason) may sub, possibly at a different
    time.
* Discretionary or last-minute changes to day schedule (must go back to
  week schedule--posted week schedule must be changed by hand)
  - OR edit week schedule
* Day & Deskmen Schedule (keep record)
  - such as, switch.
    - must get permission to make further changes
* Staff members like to have a paper copy, but it has limited info:
  - day off, truck, lighthouse, kitchen, desk, work
    (class schedule is computerized, but there is a printable version)



## Master Day Schedule
("At a Glance")
* write-in codes usually done that day
* hidden column: lighthouse permission (darkorange)
  - [ ] change to colored bullet by name instead of hiding
    People with kitchen or truck permission can already go to lighthouse
    generally. It was just hidden because cumbersome to show multiple
    color codes in a spreadsheet program.

### Slots
Denote on master schedule as:
```HTML
Black numbers: tutoring time
<br/><span style="color:red">Red</span> numbers: counseling time
<br/><span style="background-color:plum">^^ 9am Computer class (W); ^ 4pm GED (T), Communication (W), or Discipleship (F) class</span>
```

### Slot Codes
* Black #: tutoring time (hour of day)
* Red #: counseling time 1/wk (hour of day)
* `OFF*`: personal appt on 2nd off day (not movable)
  - otherwise 2nd off day can be any day (movable)
* `OFF` (no asterisk): split 2nd off day, such as if they have an
  afternoon personal appt. (can have 2 half days off instead of a second whole one)
  - Job search guys have 2.5 of job search, so don't get 2nd day off
* `&`
  - Describe on master schedule as: `'<span style="background-color:lightcoral">& TABE</span'`
* `^` Light Purple, & caret: class (stays same each week, but edited
  after group's 4 weeks are complete)
  - restricted to regular on-site work day (not lighthouse, not truck, not kitchen since starts 4)
  - Wed caret implies either Communication (" ^" with extra space
    implies Communication) or Computer Class.
    - change to:
      - "^^" Computer Class
      - "^" Communication
  - Tue caret implies GED
  - Fri caret implies Discipleship

### Slot settings (0-1 per slot)
* Dark Purple: Keep day off after overnight desk (don't change)
* Yellow don't change (directive from mgmt, filling in for staff, or resident requested day off)

### Person Permissions
* Describe on Master schedule as:
  ```HTML
<span color="gold">&bull;</span> Light Duty<br/>
span color="limegreen">&bull; Kitchen</span><br/>
<span color="steelblue">&bull; TRUCK</span>
```
* Permissions and Colors
  * blue: truck
  * green: kitchen
  * red: staff stand-in ("sub")
  * darkorange: lighthouse

## Work Assignments
* [ ] Handwritten number code on master schedule determines how roster
  is filled (change to `AT_ShowOnDayAs` on day roster), but that is not needed if
  the week schedule is on a computerized display--only needed if
  printed.
* Each roster is either phase 1 (foundation) or phase 2 (career)
  * Foundation: some need GED, some need math. Includes anyone:
    - not employed
    - not student
    - not on job search
    - not career
* Sorting Room is last (It is a catch-all for anyone working but not
  scheduled anywhere else).


### Questions for Master Scheduler
* [x] Is there ever a day off that is changeable but not split?
  - If there is nothing else that day, that is how OFF is distinguish
  - Fill all that must be off, then save rest for the end--avoid too
    many people off at ones
* [x] What is TABE?
  - It is a test every monday afternoon (Mon 1-3).
* [x] Regarding "not guys in purple": Where is purple shown?
  - Dark purple: after overnight, ensure that day remains off
  - add flag that prevents truck/lighthouse as separate issue
    - [x] Should that be hidden from master schedule? Yes.
* [x] One ID is red:--why? (reason is unknown, so I added
  a P_Note column to People as a basis for highlighting the ID and
  adding a message.

* [ ] Phase corresponding to...Counseling, Tutoring, Computer Class, Other Class
* [ ] Why is JobSearch sometimes red?
* [ ] Why is JobSearch sometimes italicized?

### First-time setup only
#### Oracle Only
* Run the setup-db-oracle-xe-win.sql file IF on Windows
  - You must first modify the SQL file if your pluggable database seed
    is not in:
    `C:\APP\OWNER\PRODUCT\18.0.0\ORADATA\XE\pdbseed`
    (after changing the two paths, the script should work on your
    operating system and version)
* Run the setup-tables.sql file
* OPTIONALLY run the setup-sample-data.sql file (only for demonstration
  purposes).
* Connect to the database and change the password. The script above sets
  the "pbappsetup" password to "arst2020#PW".
  - Example connection using SQL Developer:
    - username: 
    - password: 
    - role: SYSDBA
    - Connection Type: Local/Bequeeth
    (Data Science Center, 2017)
  - list SIDs using Command Prompt (not SQL Plus!) like this:
    `lsnrctl status`
* Connecting normally
(after running setup-db-oracle-xe-win.sql)
  - Enter user-name: `connect pbappsetup/arst2020#PW@//localhost:1521/wdpdb` WORKS
  - `connect pbappsetup/arst2020#PW@//localhost:1521/wdpdb` WORKS
  - Enter user-name: `pbappsetup/arst2020#PW@wdpdb`
  - `connect pbappsetup/arst2020#PW@wdpdb`

#### universal steps 
* get npm packages
```
npm install
```

#### First-time development only
```
#npm init
#npm install oracledb express cookie-parser body-parser ejs
npm install express-generator -g
express --view=ejs planbranch --git
# git: option adds .gitignore
# --view=ejs (formerly --ejs): adds ejs engine support
cd planbranch
npm install
npm install oracledb install cookie-parser body-parser
```

## Run
* run with debugging: `SET DEBUG=planbranch:* & npm start`


## References
Data Science Center. (n.d.). *How to connect SQL DEVELOPER ORACLE 12C: ORA-01017: invalid user name/password; logon denied*. Retrieved from https://www.youtube.com/watch?v=0qh6NG3UcgM 
