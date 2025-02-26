"use server";

import { revalidatePath } from "next/cache";

import { MUTATIONS } from "@/db/queries";

interface FormError {
  error?: string;
  success?: string | boolean;
}

async function handleMutation<T>(
  mutation: () => Promise<T>,
  successMessage = "Success"
): Promise<FormError> {
  try {
    await mutation();
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : `${successMessage} failed.`,
    };
  }
}

// 🔹 Create Group
export async function createGroupAction(
  _: FormError,
  queryData: FormData
): Promise<FormError> {
  const groupName = queryData.get("group_name")?.toString()?.trim();
  const creatorName = queryData.get("creator_name")?.toString()?.trim();
  if (!groupName) return { error: "Group name is required." };
  if (!creatorName) return { error: "Creator name is required." };

  try {
    const { code } = await MUTATIONS.createGroup(groupName, creatorName);
    revalidatePath("/");
    return { success: code };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : `Group creation failed.`,
    };
  }
}

// 🔹 Join Group
export async function joinGroupAction(
  _: FormError,
  queryData: FormData
): Promise<FormError> {
  const joinCode = queryData.get("code")?.toString()?.trim();
  const creatorName = queryData.get("joiner_name")?.toString()?.trim();
  if (!joinCode) return { error: "Group code is required." };
  if (!creatorName) return { error: "Creator name is required." };

  try {
    await MUTATIONS.joinGroup(joinCode, creatorName);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : `Joining group failed.`,
    };
  }
}

export async function createTask(
  _: FormError,
  queryData: FormData
): Promise<FormError> {
  const task = queryData.get("task")?.toString()?.trim();
  const groupIdStr = queryData.get("group_id")?.toString();
  const dueDateStr = queryData.get("due_date")?.toString();

  if (!task) return { error: "Task is required." };
  if (!groupIdStr) return { error: "Invalid or missing Group ID." };

  let dueDate = null;
  if (dueDateStr) {
    dueDate = new Date(dueDateStr);
    if (isNaN(dueDate.getTime())) {
      return { error: "Invalid date format." }; // Handle invalid date format
    }
  }

  const subtasks: string[] = [];
  for (const [key, value] of queryData.entries()) {
    if (key.startsWith("subtask_") && value.toString().trim() !== "") {
      subtasks.push(value.toString().trim());
    }
  }

  try {
    await MUTATIONS.createTask(groupIdStr, task, subtasks, dueDate);
    revalidatePath("/g/[groupId]/page");
    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : `Creating task failed.`,
    };
  }
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
