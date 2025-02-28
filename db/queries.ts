"use server-only";

import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

import { db } from ".";
import { group, group_member, subtask, task } from "./schema";

async function getAuthenticatedUser() {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");
  return user;
}

export const QUERIES = {
  getCreatedGroup: async () => {
    const { id: userId } = await getAuthenticatedUser();
    return await db
      .select({
        id: group.id,
        name: group.group_name,
      })
      .from(group)
      .where(eq(group.creator_id, userId))
      .orderBy(desc(group.created_at));
  },

  getJoinedGroup: async () => {
    const { id: userId } = await getAuthenticatedUser();
    return await db
      .select({
        id: group.id,
        name: group.group_name,
      })
      .from(group)
      .innerJoin(group_member, eq(group.id, group_member.group_id))
      .where(eq(group_member.user_id, userId))
      .orderBy(desc(group.created_at));
  },

  getGroupInfo: async (groupId: string) => {
    return db.query.group.findFirst({
      where: eq(group.id, groupId),
      columns: {
        id: true,
        group_name: true,
        join_code: true,
        creator_name: true,
      },
      with: {
        members: {
          columns: {
            user_name: true,
            avatar_url: true,
          },
          orderBy: group_member.user_name,
        },
      },
    });
  },

  getTotalMembers: async (groupId: string) => {
    const members = await db.query.group_member.findMany({
      where: eq(group_member.group_id, groupId),
      columns: { id: true },
    });

    return members.length;
  },

  getTasksWithCompletion: async (
    groupId: string,
    page: number,
    limit: number
  ) => {
    const offset = (page - 1) * limit;

    return await db.query.task.findMany({
      where: eq(task.group_id, groupId),
      with: {
        subtasks: {
          columns: {
            id: true,
            title: true,
          },
          with: {
            completions: {
              columns: { completed_at: true, user_id: true },
            },
          },
        },
        completions: {
          columns: { completed_at: true, user_id: true },
        },
      },
      columns: {
        id: true,
        title: true,
        due_date: true,
        priority: true,
        description: true,
      },
      orderBy: (tasks, { desc }) => desc(tasks.created_at),
      limit,
      offset,
    });
  },

  getGroupTasks: async (
    groupId: string,
    page: number = 1,
    limit: number = 10
  ) => {
    const { id: userId } = await getAuthenticatedUser();

    const [tasks, totalMembers] = await Promise.all([
      QUERIES.getTasksWithCompletion(groupId, page, limit),
      QUERIES.getTotalMembers(groupId),
    ]);

    return tasks.map((task) => ({
      ...task,
      isCompleted: task.completions.some((comp) => comp.user_id === userId),
      completedCount: `${task.completions.length} / ${totalMembers}`,
      subtasks: task.subtasks.map((subtask) => ({
        ...subtask,
        isCompleted: subtask.completions.some(
          (comp) => comp.user_id === userId
        ),
      })),
    }));
  },
};

export const MUTATIONS = {
  createGroup: async (group_name: string, creator_name: string) => {
    const { id: userId } = await getAuthenticatedUser();
    const [code] = await db
      .insert(group)
      .values({
        creator_id: userId,
        group_name: group_name,
        creator_name: creator_name,
      })
      .returning({ code: group.join_code });
    return code;
  },

  joinGroup: async (join_code: string, member_name: string) => {
    const { id: userId, imageUrl } = await getAuthenticatedUser();

    // first check if the group exists with the join_code
    const [group_id] = await db
      .select({ id: group.id })
      .from(group)
      .where(eq(group.join_code, join_code));

    // Join the group if i am not the member of it
    return await db.insert(group_member).values({
      group_id: group_id.id,
      user_id: userId,
      user_name: member_name,
      avatar_url: imageUrl,
    });
  },

  createTask: async (
    group_id: string,
    title: string,
    description: string,
    priority: "low" | "medium" | "high" | "urgent" | "none",
    subtasks: string[],
    due_date: Date | null
  ) => {
    const { id: userId } = await getAuthenticatedUser();

    const [newTask] = await db
      .insert(task)
      .values({
        creator_id: userId,
        title: title,
        description: description,
        group_id: group_id,
        priority: priority,
        due_date: due_date ?? null,
      })
      .returning({ taskId: task.id });

    if (!newTask?.taskId) {
      throw new Error("Failed to create task.");
    }

    if (subtasks.length > 0) {
      const subtasksToInsert = subtasks.map((name) => ({
        task_id: newTask.taskId,
        title: name.trim(),
      }));

      await db.insert(subtask).values(subtasksToInsert);
    }

    return { taskId: newTask.taskId };
  },
};
