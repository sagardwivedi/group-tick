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
import { TaskType } from "./group-tasks";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

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
    <Card
      className={cn(
        "border p-4 shadow-sm transition hover:shadow-md",
        task.isCompleted ? "bg-green-50 border-green-300" : ""
      )}
    >
      <CardHeader className="flex justify-between items-start">
        {/* Task Checkbox & Title */}
        <form action={action} className="flex items-center gap-2">
          <input type="hidden" name="task_id" value={task.id} />
          <CheckboxWithStatus checked={task.isCompleted} pending={isPending} />
          <CardTitle
            className={cn(
              "text-lg font-medium",
              task.isCompleted && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </CardTitle>
        </form>

        {/* Priority Badge */}
        {task.priority && (
          <Badge
            className={cn(
              "text-xs capitalize",
              getPriorityVariant(task.priority)
            )}
          >
            {task.priority}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Due Date */}
        {task.due_date && (
          <p className="text-xs text-muted-foreground">
            Due:{" "}
            {formatDistanceToNow(new Date(task.due_date), { addSuffix: true })}
          </p>
        )}

        {/* Subtasks */}
        {task.subtasks?.length > 0 && (
          <div className="border-t pt-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Subtasks
            </p>
            <ul className="mt-2 space-y-2 pl-4">
              {task.subtasks.map((subtask) => (
                <SubtaskItem key={subtask.id} subtask={subtask} />
              ))}
            </ul>
          </div>
        )}

        {/* Completed By */}
        {task.completions?.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Completed by:</span>
            <UserAvatarGroup users={task.completions} />
          </div>
        )}

        {/* Error Message */}
        {state?.error && (
          <p className="text-red-500 text-sm mt-1">{state.error}</p>
        )}
      </CardContent>
    </Card>
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
    <li className="flex items-center gap-3 text-sm">
      <form action={action} className="flex items-center gap-2">
        <input type="hidden" name="subtask_id" value={subtask.id} />
        <CheckboxWithStatus checked={subtask.isCompleted} pending={isPending} />
        <span
          className={cn(
            subtask.isCompleted && "line-through text-muted-foreground"
          )}
        >
          {subtask.title}
        </span>
      </form>

      {/* Completed By for Subtask */}
      {subtask.completions?.length > 0 && (
        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          <UserAvatarGroup users={subtask.completions} />
        </div>
      )}

      {state.error && <p>{state.error}</p>}
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
    <Checkbox className="cursor-pointer h-4 w-4" checked={checked} />
  );
}

interface UserAvatarGroupProps {
  users: TaskType[0]["completions"];
}

function UserAvatarGroup({ users }: UserAvatarGroupProps) {
  return (
    <div className="flex -space-x-2">
      {users.map((user, index) => (
        <Tooltip key={user.user_id} delayDuration={200}>
          <TooltipTrigger>
            <Avatar className="h-6 w-6 border border-white shadow-sm">
              <AvatarImage
                src={user.user_id || "/default-avatar.png"}
                alt={user.user_id}
              />
              <AvatarFallback>{user.user_id.charAt(0)}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>{user.user_id}</TooltipContent>
        </Tooltip>
      ))}
    </div>
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
