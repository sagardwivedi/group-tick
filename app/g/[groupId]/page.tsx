import { GroupTasks } from "@/components/group-tasks";
import { QUERIES } from "@/db/queries";

export default async function Tasks({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const id = (await params).groupId;
  const groupPromise = QUERIES.getGroupInfo(id);
  const tasksPromise = QUERIES.getGroupTasks(id);

  const [tasks, group] = await Promise.all([tasksPromise, groupPromise]);
  return <GroupTasks group={group} tasks={tasks} />;
}
