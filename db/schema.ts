import {
  bigint,
  singlestoreTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(name => `group_tick_${name}`);

export const group_table = createTable("group", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  created_by: varchar("created_by", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  join_code: varchar("join_code", { length: 6 })
    .notNull()
    .$default(() => Math.random().toString(16).slice(2, 8).toUpperCase()),
});

export const group_member_table = createTable("group_member", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
  group_id: bigint("group_id", { mode: "number" }).notNull(),
});

export const task_table = createTable("task", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  created_by: varchar("created_by", { length: 255 }).notNull(),
  group_id: bigint("group_id", { mode: "number" }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 500 }),
  due_date: timestamp("due_date"),
  created_at: timestamp("created_at").defaultNow(),
});

export const subtask_table = createTable("subtask", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  task_id: bigint("task_id", { mode: "number" }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const task_completion_table = createTable("task_completion", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  task_id: bigint("task_id", { mode: "number" }).notNull(),
  completed_by: varchar("completed_by", { length: 255 }).notNull(),
  completed_at: timestamp("completed_at").defaultNow(),
});

export const subtask_completion_table = createTable("subtask_completion", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  subtask_id: bigint("subtask_id", { mode: "number" }).notNull(),
  completed_by: varchar("completed_by", { length: 255 }).notNull(),
  completed_at: timestamp("completed_at").defaultNow(),
});
