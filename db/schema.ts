import {
  int,
  singlestoreTableCreator,
  timestamp,
  varchar
} from "drizzle-orm/singlestore-core";


export const createTable = singlestoreTableCreator(name => `group_tick_${name}`);


export const groups_table = createTable("groups", {
  group_id: int("group_id").autoincrement().primaryKey(),
  created_by: varchar("created_by").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});


export const group_members_table = createTable("group_members", {
  group_member_id: int("group_member_id").autoincrement().primaryKey(),
  user_id: varchar("user_id").notNull(),
  group_id: int("group_id").notNull(),
});


export const tasks_table = createTable("tasks", {
  task_id: int("task_id").autoincrement().primaryKey(),
  created_by: varchar("created_by").notNull(),
  group_id: int("group_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 500 }),
  due_date: timestamp("due_date"),
  created_at: timestamp("created_at").defaultNow(),
});


export const task_completion_table = createTable("task_completion", {
  task_completion_id: int("task_completion_id").autoincrement().primaryKey(),
  task_id: int("task_id").notNull(),
  completed_by: varchar("completed_by").notNull(),
  completed_at: timestamp("completed_at").defaultNow(),
});
