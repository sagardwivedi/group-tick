"use server-only"

import { db } from ".";
import { group_members_table, groups_table, task_completion_table, tasks_table } from "./schema";
import { and, arrayContains, eq, or } from "drizzle-orm";

// QUERIES
export const QUERIES = {
    getGroupById: async (groupId: number) => {
        return db.select().from(groups_table).where(eq(groups_table.group_id, groupId)).limit(1);
    },

    getAllGroupsByUser: async (userId: string) => {
        const createdGroups = db
            .select({ id: groups_table.group_id, owner: groups_table.created_by, name: groups_table.name })
            .from(groups_table)
            .where(eq(groups_table.created_by, userId));

        const joinedGroups = db
            .select({ id: groups_table.group_id, owner: groups_table.created_by, name: groups_table.name })
            .from(groups_table)
            .innerJoin(group_members_table, eq(groups_table.group_id, group_members_table.group_id))
            .where(eq(group_members_table.user_id, userId));

        return createdGroups.union(joinedGroups);
    },

    getGroupMembers: async (groupId: number) => {
        return db
            .select()
            .from(group_members_table)
            .where(eq(group_members_table.group_id, groupId));
    },

    getTasksByGroupId: async (groupId: number) => {
        return db.select().from(tasks_table).where(eq(tasks_table.group_id, groupId));
    },

    getTaskById: async (taskId: number) => {
        return db.select().from(tasks_table).where(eq(tasks_table.task_id, taskId)).limit(1);
    },

    getTaskCompletionStatus: async (taskId: number, userId: string) => {
        return db
            .select()
            .from(task_completion_table)
            .where(and(eq(task_completion_table.task_id, taskId), eq(task_completion_table.completed_by, userId)))
            .limit(1);
    },

    getCompletedTasksByUserId: async (userId: string) => {
        return db
            .select()
            .from(task_completion_table)
            .innerJoin(tasks_table, eq(task_completion_table.task_id, tasks_table.task_id))
            .where(eq(task_completion_table.completed_by, userId));
    },
};

// MUTATIONS
export const MUTATIONS = {
    createGroup: async (createdBy: string, groupName: string) => {
        return db
            .insert(groups_table)
            .values({ created_by: createdBy, name: groupName })
    },

    addGroupMember: async (userId: string, groupId: number) => {
        return db
            .insert(group_members_table)
            .values({ user_id: userId, group_id: groupId });
    },

    createTask: async (
        createdBy: string,
        groupId: number,
        taskName: string,
        description: string,
        dueDate: Date
    ) => {
        return db.insert(tasks_table).values({
            created_by: createdBy,
            group_id: groupId,
            name: taskName,
            description,
            due_date: dueDate,
        });
    },

    completeTask: async (taskId: number, completedBy: number) => {
        return db.insert(task_completion_table).values({
            task_id: taskId,
            completed_by: completedBy,
        });
    },

    removeGroupMember: async (userId: string, groupId: number) => {
        return db
            .delete(group_members_table)
            .where(and(eq(group_members_table.user_id, userId), eq(group_members_table.group_id, groupId)));
    },

    updateTask: async (
        taskId: number,
        updatedName: string,
        updatedDescription: string,
        updatedDueDate: Date
    ) => {
        return db
            .update(tasks_table)
            .set({
                name: updatedName,
                description: updatedDescription,
                due_date: updatedDueDate,
            })
            .where(eq(tasks_table.task_id, taskId));
    },
};
