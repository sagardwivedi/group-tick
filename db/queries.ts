"use server-only";

import { and, desc, eq, exists, sql } from "drizzle-orm";
import { db } from ".";
import {
    group_member_table,
    group_table,
    subtask_completion_table,
    subtask_table,
    task_completion_table,
    task_table,
} from "./schema";
import { currentUser } from "@clerk/nextjs/server";

export interface Subtask {
    id: string;
    name: string;
    completed: boolean;
    task_id: number; // ✅ Added reference to parent task for better structure
}

export interface TaskWithSubtask {
    id: string;
    name: string;
    description?: string; // ✅ Made optional for tasks without descriptions
    created_by: string;
    completed: boolean;
    due_date?: Date | null; // ✅ Made optional/null for tasks without a due date
    subtasks: Subtask[];
}


/**
 * Ensures the current user is authenticated.
 * @throws {Error} If the user is not authenticated.
 */
async function getAuthenticatedUser() {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");
    return user;
}

/**
 * Checks if a user is a member or owner of a group.
 * @param groupId The group ID.
 * @param userId The user ID.
 * @returns {boolean} Whether the user is a member or owner.
 */
async function isUserInGroup(groupId: number, userId: string): Promise<boolean> {
    const result = await db
        .select({
            isOwner: exists(
                db.select().from(group_table)
                    .where(and(eq(group_table.id, groupId), eq(group_table.created_by, userId)))
            ).as("isOwner"),

            isMember: exists(
                db.select().from(group_member_table)
                    .where(and(eq(group_member_table.group_id, groupId), eq(group_member_table.user_id, userId)))
            ).as("isMember")
        })
        .from(group_table) // Ensures the query executes
        .limit(1); // Only fetch one row

    return Boolean(result[0]?.isOwner) || Boolean(result[0]?.isMember);
}

export const QUERIES = {
    /**
     * Retrieves a group by its ID.
     * @param groupId The group ID.
     * @returns The group details.
     */
    getGroupById: async (groupId: number) => {
        const user = await getAuthenticatedUser();
        return await db
            .select({
                id: group_table.id,
                name: group_table.name,
                created_by: group_table.created_by,
                join_code: sql`IF(${group_table.created_by} = ${user.id}, ${group_table.join_code}, NULL)`.as("join_code")
            })
            .from(group_table)
            .where(eq(group_table.id, groupId))
            .then(rows => rows[0]);
    },

    /**
     * Fetches all groups where the user is an owner or a member.
     */
    getAllGroupsByUser: async () => {
        const user = await getAuthenticatedUser();

        const createdGroups = await db
            .select({ id: group_table.id, name: group_table.name })
            .from(group_table)
            .where(eq(group_table.created_by, user.id)).orderBy(desc(group_table.created_at));

        const joinedGroups = await db
            .select({ id: group_table.id, name: group_table.name })
            .from(group_table)
            .innerJoin(group_member_table, eq(group_table.id, group_member_table.group_id))
            .where(eq(group_member_table.user_id, user.id)).orderBy(desc(group_table.created_at));

        return { owner: createdGroups, member: joinedGroups };
    },

    /**
     * Retrieves tasks and their subtasks for a specific group.
     */
    getTasksAndSubtasksByGroupId: async (groupId: number) => {
        const user = await getAuthenticatedUser();

        const rows = await db
            .select({
                taskId: task_table.id,
                taskName: task_table.name,
                taskDescription: task_table.description,
                taskCreatedBy: task_table.created_by,
                taskDueDate: task_table.due_date,
                taskCompleted: exists(
                    db.select()
                        .from(task_completion_table)
                        .where(
                            and(
                                eq(task_completion_table.task_id, task_table.id),
                                eq(task_completion_table.completed_by, user.id)
                            )
                        )
                ).as("taskCompleted"),
                subtaskId: subtask_table.id,
                subtaskName: subtask_table.name,
                subtaskCompleted: exists(
                    db.select()
                        .from(subtask_completion_table)
                        .where(
                            and(
                                eq(subtask_completion_table.subtask_id, subtask_table.id),
                                eq(subtask_completion_table.completed_by, user.id)
                            )
                        )
                ).as("subtaskCompleted"),
            })
            .from(task_table)
            .leftJoin(subtask_table, eq(task_table.id, subtask_table.task_id))
            .where(eq(task_table.group_id, groupId))
            .orderBy(desc(task_table.created_at));

        const tasksMap: Record<string, TaskWithSubtask> = {};

        for (const row of rows) {
            const taskId = row.taskId?.toString(); // Ensure taskId is string

            if (!taskId) continue; // Skip if taskId is missing

            if (!tasksMap[taskId]) {
                tasksMap[taskId] = {
                    id: taskId,
                    name: row.taskName || "",
                    description: row.taskDescription ?? "", // Use `??` to avoid `null`
                    created_by: row.taskCreatedBy || "",
                    due_date: row.taskDueDate ?? null, // Use `null` for missing due dates
                    completed: Boolean(row.taskCompleted), // Convert to `boolean`
                    subtasks: [],
                };
            }

            if (row.subtaskId) {
                tasksMap[taskId].subtasks.push({
                    id: row.subtaskId?.toString() ?? "",
                    name: row.subtaskName ?? "",
                    completed: Boolean(row.subtaskCompleted),
                    task_id: row.taskId ?? ""
                });
            }
        }

        return Object.values(tasksMap);
    }
};

export const MUTATIONS = {
    /**
     * Creates a new group.
     */
    createGroup: async (groupName: string) => {
        const user = await getAuthenticatedUser();
        return db.insert(group_table).values([{ created_by: user.id, name: groupName }]);
    },

    /**
     * Joins a group using a join code.
     */
    joinGroupByCode: async (joinCode: string) => {
        const user = await getAuthenticatedUser();

        // 🔹 Validate if the group exists with the given join code
        const group = await db.select({ id: group_table.id })
            .from(group_table)
            .where(eq(group_table.join_code, joinCode))
            .limit(1)
            .then(rows => rows[0]);

        if (!group) {
            throw new Error("Invalid or expired join code.");
        }

        // 🔹 Check if the user is already a member
        const existingMembership = await db.select()
            .from(group_member_table)
            .where(and(eq(group_member_table.user_id, user.id), eq(group_member_table.group_id, group.id)))
            .limit(1);

        if (existingMembership.length > 0) {
            throw new Error("You are already a member of this group.");
        }

        // 🔹 Add user to the group
        return db.insert(group_member_table).values([{ user_id: user.id, group_id: group.id }]);
    },

    /**
     * Creates a task with optional subtasks.
     */
    createTask: async (groupId: number, taskName: string, subtasks: string[] = []) => {
        const user = await getAuthenticatedUser();

        if (!(await isUserInGroup(groupId, user.id))) {
            throw new Error("You are not a member of this group.");
        }

        return db.transaction(async (tx) => {
            const task = await tx.insert(task_table)
                .values([{ created_by: user.id, group_id: groupId, name: taskName }])
                .$returningId()
                .then(rows => rows[0]);

            if (subtasks.length > 0) {
                await tx.insert(subtask_table).values(subtasks.map(name => ({ task_id: task.id, name })));
            }

            return task;
        });
    },

    /**
     * Marks a task as completed.
     */
    markTaskComplete: async (taskId: number) => {
        const user = await getAuthenticatedUser();
        return db.insert(task_completion_table).values([{ task_id: taskId, completed_by: user.id }]);
    },

    /**
     * Marks a subtask as completed.
     */
    markSubtaskComplete: async (subtaskId: number) => {
        const user = await getAuthenticatedUser();
        return db.insert(subtask_completion_table).values([{ subtask_id: subtaskId, completed_by: user.id }]);
    },
};
