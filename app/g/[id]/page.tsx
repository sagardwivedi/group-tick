import { Suspense } from "react";
import GroupTasks from "@/components/group-tasks";
import { QUERIES } from "@/db/queries";

export default async function Tasks({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = Number((await params).id);

	return (
		<Suspense fallback={<SkeletonLoader />}>
			<AsyncGroupTasks id={id} />
		</Suspense>
	);
}

async function AsyncGroupTasks({ id }: { id: number }) {
	const tasksPromise = QUERIES.getTasksAndSubtasksByGroupId(id);
	const groupPromise = QUERIES.getGroupById(id);

	const [tasks, group] = await Promise.all([tasksPromise, groupPromise]);
	return <GroupTasks group={group} tasks={tasks} />;
}

// Skeleton Loader Component with Tailwind CSS
function SkeletonLoader() {
	return (
		<div className="p-4 space-y-6">
			{/* Group Section */}
			<div className="space-y-3">
				<div className="w-3/5 h-6 bg-gray-300 rounded-md animate-pulse" />
				<div className="w-4/5 h-5 bg-gray-300 rounded-md animate-pulse" />
			</div>

			{/* Task List */}
			<div className="space-y-4">
				{[...Array(3)].map((_, idx) => (
					<div
						key={idx}
						className="h-14 bg-gray-300 rounded-md animate-pulse"
					/>
				))}
			</div>
		</div>
	);
}
