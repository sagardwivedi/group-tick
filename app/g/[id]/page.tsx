import { GroupTasks } from "@/components/group-tasks";
import { QUERIES } from "@/db/queries";

export default async function Tasks({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);

  const tasksPromise = QUERIES.getTasksAndSubtasksByGroupId(id);
  const groupPromise = QUERIES.getGroupById(id);

  const [tasks, group] = await Promise.all([tasksPromise, groupPromise]);
  return <GroupTasks group={group} tasks={tasks} />;
}
