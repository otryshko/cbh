# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Goal of the impovement is to extend Agent's metadata with one more property, `agentExtenalId` and wire it though the system.

0. Collect missing validation requirement for agent external UI (min/max length/etc)

1. Add new property to the DB
  - Declare a new property on the Agent table, non-null and unique. 
  - Add migration script if needed to run the DDL to actually add it to the live table. Back-populate it with DB ID as a default.
Time: 0.5 points.

2. Extend the API to add `agentExtenalId` to the data returned by `getShiftsByFacility`. Add a test that it is returned after being set by the test. Add a passing and failing validation test. Regenerate client proxies if needed/API docs.
Time: 0.5 points

3. Update `generateReport` to show `agentExtenalId` instead of `agentDbId`. Add a test that it is shown in the report.
Time: 0.5 points

4. Add editing UI to enable corresponding roles to change `agentExtenalId` via UI. Add a UI test covering the editing scenario. 
Time: 1 point.

