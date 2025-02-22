"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import type { QUERIES, TaskWithSubtask } from "@/db/queries";
import { createTask } from "@/lib/actions/action";
import { ArrowLeft, Info, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

type GroupType = Awaited<ReturnType<typeof QUERIES.getGroupById>>;

export default function GroupTasks({
	tasks,
	group,
}: {
	tasks: TaskWithSubtask[];
	group: GroupType;
}) {
	const [message, action, isPending] = useActionState(createTask, {});
	const router = useRouter();

	const [taskName, setTaskName] = useState("");
	const [open, setOpen] = useState(false);
	const [subtasks, setSubtasks] = useState<{ name: string }[]>([]);

	const handleSubtaskChange = (index: number, value: string) => {
		setSubtasks((prev) =>
			prev.map((subtask, i) =>
				i === index ? { ...subtask, name: value } : subtask,
			),
		);
	};

	const addSubtaskField = () => {
		setSubtasks([...subtasks, { name: "" }]);
	};

	const removeSubtask = (index: number) => {
		setSubtasks(subtasks.filter((_, i) => i !== index));
	};

	useEffect(() => {
		if (message?.success) {
			setOpen(false);
			setTaskName("");
			setSubtasks([]);
		}
	}, [message]);

	return (
		<div className="container mx-auto p-6 space-y-6">
			<header className="flex justify-between items-center">
				<Button
					variant="ghost"
					onClick={() => router.back()}
					className="flex items-center gap-2"
				>
					<ArrowLeft className="h-4 w-4" />
					Back
				</Button>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" className="flex items-center gap-2">
							<Info className="h-4 w-4" />
							Group Info
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>{group.name}</SheetTitle>
						</SheetHeader>
						<div className="mt-4 space-y-4">
							<div>
								<h3 className="text-sm font-medium text-muted-foreground">
									Created by
								</h3>
								<p className="text-sm">{group.created_by}</p>
							</div>
							{group.join_code && group.join_code !== "unknown" ? (
								<div>
									<h3 className="text-sm font-medium text-muted-foreground">
										Join Code
									</h3>
									<Badge variant="secondary" className="mt-1">
										{group.join_code as string}
									</Badge>
								</div>
							) : (
								""
							)}
						</div>
					</SheetContent>
				</Sheet>
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
									<li key={task.id}>
										<div className="flex items-center space-x-3">
											<Checkbox checked={task.completed} />
											<span
												className={`transition ${task.completed ? "line-through text-muted-foreground" : ""}`}
											>
												{task.name}
											</span>
										</div>
										{task.subtasks.length > 0 && (
											<ul className="pl-6 mt-2 space-y-1">
												{task.subtasks.map((subtask) => (
													<li
														key={subtask.id}
														className="flex items-center space-x-3"
													>
														<Checkbox checked={subtask.completed} />
														<span
															className={`text-sm transition ${subtask.completed ? "line-through text-muted-foreground" : ""}`}
														>
															{subtask.name}
														</span>
													</li>
												))}
											</ul>
										)}
										<Separator className="my-2" />
									</li>
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

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button className="w-full">
						<Plus className="mr-2 h-4 w-4" /> Add Task
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create a New Task</DialogTitle>
						<DialogDescription>
							Add a task along with optional subtasks.
						</DialogDescription>
					</DialogHeader>

					<form action={action} className="space-y-4">
						<input type="hidden" name="group_id" value={group.id} />
						<Input
							name="task"
							placeholder="Task name..."
							required
							value={taskName}
							onChange={(e) => setTaskName(e.target.value)}
							disabled={isPending}
						/>

						<div className="space-y-2">
							<h3 className="text-sm font-medium">Subtasks</h3>
							{subtasks.map((subtask, index) => (
								<div key={subtask.name} className="flex items-center space-x-2">
									<Input
										placeholder={`Subtask ${index + 1}`}
										value={subtask.name}
										onChange={(e) => handleSubtaskChange(index, e.target.value)}
										name={`subtask_${index}`}
									/>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => removeSubtask(index)}
										className="text-destructive hover:text-destructive/90"
									>
										<Trash className="h-4 w-4" />
									</Button>
								</div>
							))}
							<Button
								variant="outline"
								size="sm"
								type="button"
								onClick={addSubtaskField}
								className="w-full"
							>
								<Plus className="mr-2 h-4 w-4" /> Add Subtask
							</Button>
						</div>

						<Button type="submit" disabled={isPending} className="w-full">
							{isPending ? "Adding..." : "Add Task"}
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
