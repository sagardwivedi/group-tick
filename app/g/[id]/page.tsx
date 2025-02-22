import GroupTasks from "@/components/group-tasks";
import { QUERIES } from "@/db/queries";

export default async function Tasks({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const tasks = await QUERIES.getTasksAndSubtasksByGroupId(
		Number((await params).id),
	);
	const group = await QUERIES.getGroupById(Number((await params).id));
	return <GroupTasks group={group} tasks={tasks} />;
}
