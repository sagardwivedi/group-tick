"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function GroupTasks({ userId }: { userId?: number }) {
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const router = useRouter();

	const handleCreateTask = async (e: FormEvent) => {
		e.preventDefault();
		if (selectedGroup && newTask) {
			// Implement your create task logic here
			// For example: await QUERIES.createTask(selectedGroup.id, userId, newTask)
			setNewTask("");
			// Refetch tasks or update the local state
			router.refresh();
		}
	};

	const handleMarkTaskDone = async (taskId: number) => {
		// Implement your mark task as done logic here
		// For example: await QUERIES.markTaskDone(taskId, userId)
		// Update the local state or refetch tasks
		router.refresh();
	};

	return (
		<div className="bg-white shadow rounded-lg p-4">
			<h2 className="text-xl font-semibold mb-2">Group Tasks</h2>
			{selectedGroup ? (
				<>
					<h3 className="text-lg font-medium mb-2">{selectedGroup.name}</h3>
					<form onSubmit={handleCreateTask} className="mb-4">
						<input
							type="text"
							value={newTask}
							onChange={(e) => setNewTask(e.target.value)}
							placeholder="New Task"
							className="w-full p-2 border rounded mb-2"
							required
						/>
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						>
							Add Task
						</button>
					</form>
					<ul className="space-y-2">
						{tasks.map((task) => (
							<li key={task.id} className="flex items-center justify-between">
								<span>{task.description}</span>
								<button
									onClick={() => handleMarkTaskDone(task.id)}
									className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
								>
									Mark Done
								</button>
							</li>
						))}
					</ul>
				</>
			) : (
				<p>Select a group to view tasks</p>
			)}
		</div>
	);
}
