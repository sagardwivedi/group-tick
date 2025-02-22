"use server";

import { MUTATIONS } from "@/db/queries";
import { revalidatePath } from "next/cache";

interface FormError {
    error?: string;
    success?: boolean;
}

// 🔹 Generic function to handle errors gracefully
async function handleMutation<T>(mutation: () => Promise<T>, successMessage = "Success"): Promise<FormError> {
    try {
        await mutation();
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { error: error instanceof Error ? error.message : `Error: ${successMessage} failed.` };
    }
}

// 🔹 Create Group
export async function createGroup(_: FormError, queryData: FormData): Promise<FormError> {
    const groupName = queryData.get("group_name")?.toString()?.trim();
    if (!groupName) return { error: "Group name is required." };

    return handleMutation(() => MUTATIONS.createGroup(groupName), "Group creation");
}

// 🔹 Join Group
export async function joinGroup(_: FormError, queryData: FormData): Promise<FormError> {
    const joinCode = queryData.get("code")?.toString()?.trim();
    if (!joinCode) return { error: "Group code is required." };

    return handleMutation(() => MUTATIONS.joinGroupByCode(joinCode), "Joining group");
}

// 🔹 Create Task
export async function createTask(_: FormError, queryData: FormData): Promise<FormError> {
    const task = queryData.get("task")?.toString()?.trim();
    const groupIdStr = queryData.get("group_id")?.toString();
    const groupId = groupIdStr ? Number.parseInt(groupIdStr, 10) : Number.NaN;

    if (!task) return { error: "Task is required." };
    if (Number.isNaN(groupId)) return { error: "Invalid or missing Group ID." };

    // ✅ Extract subtasks
    const subtasks: string[] = [];
    for (const [key, value] of queryData.entries()) {
        if (key.startsWith("subtask_") && value.toString().trim() !== "") {
            subtasks.push(value.toString().trim());
        }
    }

    return handleMutation(() => MUTATIONS.createTask(groupId, task, subtasks), "Task creation");
}
