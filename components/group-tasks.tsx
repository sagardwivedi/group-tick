"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { QUERIES, Subtask, TaskWithSubtask } from "@/db/queries";
import {
  createTask,
  unmarkSubtaskStatus,
  unmarkTaskStatus,
  updateSubtaskStatus,
  updateTaskStatus,
} from "@/lib/actions/action";
import { ArrowLeft, Info, Loader, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

type GroupType = Awaited<ReturnType<typeof QUERIES.getGroupById>>;

interface GroupTasksProps {
  tasks?: TaskWithSubtask[];
  group: GroupType;
}

export function GroupTasks({ tasks = [], group }: GroupTasksProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <header className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h2 className="text-3xl">{group.name}</h2>
        <GroupInfo group={group} />
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[50vh]">
            {tasks.length > 0 ? (
              <ul className="space-y-4">
                {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No tasks yet.
              </p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <AddTaskDialog groupId={group.id} />
    </div>
  );
}

interface TaskItemProps {
  task: TaskWithSubtask;
}

function TaskItem({ task }: TaskItemProps) {
  const [state, action, isPending] = useActionState(
    task.completed ? unmarkTaskStatus : updateTaskStatus,
    {},
    task.id
  );

  return (
    <li className="space-y-2">
      <form action={action} className="flex items-center gap-3">
        <input type="hidden" name="task_id" value={task.id} />
        <CheckboxWithStatus checked={task.completed} pending={isPending} />
        <span
          className={task.completed ? "line-through text-muted-foreground" : ""}
        >
          {task.name}
        </span>
        {state?.success ? (
          <p>{state.success}</p>
        ) : (
          state?.error && <p className="text-red-500">{state.error}</p>
        )}
      </form>

      {task.subtasks?.length > 0 && (
        <ul className="pl-6 space-y-2">
          {task.subtasks.map((subtask) => (
            <SubtaskItem key={subtask.id} subtask={subtask} />
          ))}
        </ul>
      )}
    </li>
  );
}

interface SubtaskItemProps {
  subtask: Subtask;
}

function SubtaskItem({ subtask }: SubtaskItemProps) {
  const [state, action, isPending] = useActionState(
    subtask.completed ? unmarkSubtaskStatus : updateSubtaskStatus,
    {},
    subtask.id
  );

  return (
    <li>
      <form action={action} className="flex items-center gap-3">
        <input type="hidden" name="subtask_id" value={subtask.id} />
        <CheckboxWithStatus checked={subtask.completed} pending={isPending} />
        <span
          className={
            subtask.completed ? "line-through text-muted-foreground" : ""
          }
        >
          {subtask.name}
        </span>
        {state?.success ? (
          <p>{state.success}</p>
        ) : (
          state?.error && <p className="text-red-500">{state.error}</p>
        )}
      </form>
    </li>
  );
}

interface CheckboxWithStatusProps {
  checked: boolean;
  pending: boolean;
}

function CheckboxWithStatus({ checked, pending }: CheckboxWithStatusProps) {
  return (
    <>
      {pending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <Checkbox type="submit" className="cursor-pointer" checked={checked} />
      )}
    </>
  );
}

interface GroupInfoProps {
  group: GroupType;
}

function GroupInfo({ group }: GroupInfoProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Info className="h-5 w-5" />
          <span className="font-medium">Group Info</span>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="mb-6">
          <SheetTitle className="text-lg font-semibold">
            {group.name}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">
              Created by
            </h3>
            <p className="text-sm">{group.created_by}</p>
          </div>

          {group.join_code !== "unknown" && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                Join Code
              </h3>
              <Badge variant="secondary" className="text-sm py-1 px-3">
                {group.join_code as string}
              </Badge>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface AddTaskDialogProps {
  groupId: number;
}

function AddTaskDialog({ groupId }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createTask, {});
  const [subtasks, setSubtasks] = useState<{ name: string }[]>([]);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      setSubtasks([]);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="group_id" value={groupId} />

          <Input
            name="task"
            placeholder="Task name"
            required
            aria-label="Task name"
          />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Subtasks</h3>
            {subtasks.map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  name={`subtasks[${index}]`}
                  placeholder={`Subtask ${index + 1}`}
                  aria-label={`Subtask ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setSubtasks((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSubtasks((prev) => [...prev, { name: "" }])}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Subtask
            </Button>
          </div>

          <SubmitButton pending={isPending} />
        </form>

        {state?.error && (
          <p className="text-sm text-destructive text-center">{state.error}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader className="h-4 w-4 animate-spin" /> : "Create Task"}
    </Button>
  );
}
