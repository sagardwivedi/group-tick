import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const taskPriorityEnum = pgEnum("task_priority", [
  "low",
  "medium",
  "high",
  "urgent",
  "none",
]);

// Groups table
export const group = pgTable(
  "group",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    creator_id: text("creator_id").notNull(),
    creator_name: text("creator_name").notNull(),
    group_name: text("group_name").notNull(),
    join_code: text("join_code")
      .notNull()
      .unique()
      .$default(() => Math.random().toString(36).slice(2, 10).toUpperCase()),
    created_at: timestamp("created_at").defaultNow(),
  },
  (t) => [index("idx_group_name").on(t.group_name)]
);

// Group members table
export const group_member = pgTable(
  "group_member",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: text("user_id").notNull(),
    user_name: text("user_name").notNull(),
    group_id: uuid("group_id")
      .notNull()
      .references(() => group.id, { onDelete: "cascade" }),
    joined_at: timestamp("joined_at").defaultNow().notNull(),
  },
  (t) => [
    index("idx_group_member_user").on(t.user_id),
    index("idx_group_member_group").on(t.group_id),
    uniqueIndex("uniq_group_member").on(t.user_id, t.group_id),
  ]
);

// Tasks table
export const task = pgTable(
  "task",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    creator_id: text("creator_id").notNull(),
    group_id: uuid("group_id")
      .notNull()
      .references(() => group.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    due_date: timestamp("due_date"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    priority: taskPriorityEnum("priority").default("none"),
    archived: boolean("archived").default(false),
  },
  (t) => [index("idx_task_group").on(t.group_id)]
);

// Subtasks table
export const subtask = pgTable(
  "subtask",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    task_id: uuid("task_id")
      .notNull()
      .references(() => task.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("idx_subtask_task").on(t.task_id)]
);

// Task completions table
export const task_completion = pgTable(
  "task_completion",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    task_id: uuid("task_id")
      .notNull()
      .references(() => task.id, { onDelete: "cascade" }),
    user_id: text("user_id").notNull(),
    completed_at: timestamp("completed_at").defaultNow().notNull(),
  },
  (t) => [
    index("idx_task_completion_task").on(t.task_id),
    index("idx_task_completion_user").on(t.user_id),
    uniqueIndex("uniq_task_completion").on(t.task_id, t.user_id),
  ]
);

// Subtask completions table
export const subtask_completion = pgTable(
  "subtask_completion",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    subtask_id: uuid("subtask_id")
      .notNull()
      .references(() => subtask.id, { onDelete: "cascade" }),
    user_id: text("user_id").notNull(),
    completed_at: timestamp("completed_at").defaultNow().notNull(),
  },
  (t) => [
    index("idx_subtask_completion_subtask").on(t.subtask_id),
    index("idx_subtask_completion_user").on(t.user_id),
    uniqueIndex("uniq_subtask_completion").on(t.subtask_id, t.user_id),
  ]
);

export const groupRelations = relations(group, ({ many }) => ({
  members: many(group_member),
  tasks: many(task),
}));

export const taskRelations = relations(task, ({ one, many }) => ({
  group: one(group, {
    fields: [task.group_id],
    references: [group.id],
  }),
  subtasks: many(subtask),
  completions: many(task_completion),
}));

export const subtaskRelations = relations(subtask, ({ one, many }) => ({
  task: one(task, {
    fields: [subtask.task_id],
    references: [task.id],
  }),
  completions: many(subtask_completion),
}));

export const groupMemberRelations = relations(group_member, ({ one }) => ({
  group: one(group, {
    fields: [group_member.group_id],
    references: [group.id],
  }),
}));

export const subtaskCompletionRelations = relations(subtask_completion, ({ one }) => ({
  subtask: one(subtask, {
    fields: [subtask_completion.subtask_id],
    references: [subtask.id],
  }),
}));

export const taskCompletionRelations = relations(task_completion, ({ one }) => ({
  task: one(task, {
    fields: [task_completion.task_id],
    references: [task.id],
  }),
}));
