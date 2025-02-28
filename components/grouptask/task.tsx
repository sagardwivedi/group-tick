"use client";

import {
  unmarkSubtaskStatus,
  unmarkTaskStatus,
  updateSubtaskStatus,
  updateTaskStatus,
} from "@/lib/actions/action";
import { formatDistanceToNow } from "date-fns";
import { Loader } from "lucide-react";
import { useActionState } from "react";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { TaskType } from "./group-tasks";

interface TaskItemProps {
  task: TaskType[0];
}

export function TaskItem({ task }: TaskItemProps) {
  const [state, action, isPending] = useActionState(
    task.isCompleted ? unmarkTaskStatus : updateTaskStatus,
    {},
    task.id
  );

  return (
    <li
      className={`p-4 rounded-xl border transition-all shadow-sm hover:shadow-md space-y-3 ${
        task.isCompleted ? "bg-green-50 border-green-300" : ""
      }`}
    >
      {/* Task Header */}
      <form action={action} className="flex items-start gap-3">
        <input type="hidden" name="task_id" value={task.id} />
        <CheckboxWithStatus checked={task.isCompleted} pending={isPending} />

        <div className="flex-1 space-y-1">
          <h3
            className={`text-base font-medium truncate ${
              task.isCompleted ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.title}
          </h3>

          {/* Due Date */}
          {task.due_date && (
            <p className="text-xs text-muted-foreground">
              Due:{" "}
              {formatDistanceToNow(new Date(task.due_date), {
                addSuffix: true,
              })}
            </p>
          )}
        </div>

        {/* Priority Badge */}
        {task.priority && (
          <Badge
            className={`text-xs capitalize ${getPriorityVariant(
              task.priority
            )}`}
          >
            {task.priority}
          </Badge>
        )}
      </form>

      {/* Subtasks */}
      {task.subtasks?.length > 0 && (
        <ul className="mt-2 space-y-1 border-l-2 border-muted pl-4">
          {task.subtasks.map((subtask) => (
            <SubtaskItem key={subtask.id} subtask={subtask} />
          ))}
        </ul>
      )}

      {/* Completed By */}
      <p className="text-xs text-muted-foreground">
        Completed by {task.completedCount} members
      </p>

      {/* Error Message */}
      {state?.error && (
        <p className="text-red-500 text-sm mt-1">{state.error}</p>
      )}
    </li>
  );
}

interface SubtaskItemProps {
  subtask: TaskType[0]["subtasks"][0];
}

function SubtaskItem({ subtask }: SubtaskItemProps) {
  const [state, action, isPending] = useActionState(
    subtask.isCompleted ? unmarkSubtaskStatus : updateSubtaskStatus,
    {},
    subtask.id
  );

  return (
    <li className="flex items-center gap-3">
      <form action={action} className="flex items-center gap-2">
        <input type="hidden" name="subtask_id" value={subtask.id} />
        <CheckboxWithStatus checked={subtask.isCompleted} pending={isPending} />
        <span
          className={`text-xs md:text-sm ${
            subtask.isCompleted ? "line-through text-muted-foreground" : ""
          }`}
        >
          {subtask.title}
        </span>
      </form>
    </li>
  );
}

interface CheckboxWithStatusProps {
  checked: boolean;
  pending: boolean;
}

function CheckboxWithStatus({ checked, pending }: CheckboxWithStatusProps) {
  return pending ? (
    <Loader className="h-4 w-4 animate-spin text-muted-foreground" />
  ) : (
    <Checkbox
      className="cursor-pointer h-4 w-4 md:h-5 md:w-5"
      checked={checked}
    />
  );
}

function getPriorityVariant(priority: string) {
  switch (priority) {
    case "low":
      return "bg-blue-100 text-blue-600";
    case "medium":
      return "bg-yellow-100 text-yellow-600";
    case "high":
      return "bg-red-100 text-red-600";
    case "urgent":
      return "bg-red-200 text-red-700 font-semibold";
    default:
      return "bg-gray-100 text-gray-600";
  }
}