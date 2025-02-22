"use server";

import { revalidatePath } from "next/cache";

import { MUTATIONS } from "@/db/queries";

interface FormError {
  error?: string;
  success?: boolean;
}

async function handleMutation<T>(
  mutation: () => Promise<T>,
  successMessage = "Success"
): Promise<FormError> {
  try {
    await mutation();
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : `${successMessage} failed.`,
    };
  }
}

// 🔹 Create Group
export async function createGroup(
  _: FormError,
  queryData: FormData
): Promise<FormError> {
  const groupName = queryData.get("group_name")?.toString()?.trim();
  if (!groupName) return { error: "Group name is required." };

  return handleMutation(
    () => MUTATIONS.createGroup(groupName),
    "Group creation"
  );
}

// 🔹 Join Group
export async function joinGroup(
  _: FormError,
  queryData: FormData
): Promise<FormError> {
  const joinCode = queryData.get("code")?.toString()?.trim();
  if (!joinCode) return { error: "Group code is required." };

  return handleMutation(
    () => MUTATIONS.joinGroupByCode(joinCode),
    "Joining group"
  );
}

// 🔹 Create Task
export async function createTask(
  _: FormError,
  queryData: FormData
): Promise<FormError> {
  const task = queryData.get("task")?.toString()?.trim();
  const groupIdStr = queryData.get("group_id")?.toString();
  const groupId = groupIdStr ? Number.parseInt(groupIdStr, 10) : NaN;

  if (!task) return { error: "Task is required." };
  if (Number.isNaN(groupId)) return { error: "Invalid or missing Group ID." };

  const subtasks: string[] = [];
  for (const [key, value] of queryData.entries()) {
    if (key.startsWith("subtask_") && value.toString().trim() !== "") {
      subtasks.push(value.toString().trim());
    }
  }

  return handleMutation(
    () => MUTATIONS.createTask(groupId, task, subtasks),
    "Task creation"
  );
}

// 🔹 Update Task Status
export async function updateTaskStatus(
  _: FormError,
  queryData: FormData
): Promise<FormError> {
  const taskIdStr = queryData.get("task_id")?.toString()?.trim();
  const taskId = taskIdStr ? Number.parseInt(taskIdStr, 10) : NaN;

  if (isNaN(taskId)) {
    return { error: "Invalid task ID." };
  }

  return handleMutation(
    () => MUTATIONS.markTaskComplete(taskId),
    "Marking task as complete"
  );
}

export async function unmarkTaskStatus(
  _: FormError,
  queryData: FormData
): Promise<FormError> {
  const taskIdStr = queryData.get("task_id")?.toString()?.trim();
  const taskId = taskIdStr ? Number.parseInt(taskIdStr, 10) : NaN;

  if (isNaN(taskId)) {
    return { error: "Invalid task ID." };
  }

  return handleMutation(
    () => MUTATIONS.unmarkTaskComplete(taskId),
    "Marking task as complete"
  );
}

// 🔹 Update Subtask Status
export async function updateSubtaskStatus(
  _: FormError,
  queryData: FormData
): Promise<FormError> {
  const subtaskIdStr = queryData.get("subtask_id")?.toString()?.trim();
  const subtaskId = subtaskIdStr ? Number.parseInt(subtaskIdStr, 10) : NaN;

  if (isNaN(subtaskId)) {
    return { error: "Invalid subtask ID." };
  }

  return handleMutation(
    () => MUTATIONS.markSubtaskComplete(subtaskId),
    "Marking subtask as complete"
  );
}

export async function unmarkSubtaskStatus(_: FormError, queryData: FormData) {
  const subtaskIdStr = queryData.get("subtask_id")?.toString()?.trim();
  const subtaskId = subtaskIdStr ? Number.parseInt(subtaskIdStr, 10) : NaN;

  if (isNaN(subtaskId)) {
    return { error: "Invalid subtask ID." };
  }

  return handleMutation(
    () => MUTATIONS.unmarkSubtaskComplete(subtaskId),
    "Marking subtask as complete"
  );
}
