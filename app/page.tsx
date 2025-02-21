import CreateGroupForm from "@/components/create-group-form";
import { QUERIES } from "@/db/queries";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function GroupsDashboard() {
	const user = await currentUser();
	const groups = await QUERIES.getAllGroupsByUser(user?.id);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Groups Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="md:col-span-1 space-y-4">
					<GroupsList groups={groups} />
					<Suspense fallback={<div>Loading...</div>}>
						<CreateGroupForm userId={user?.id} />
					</Suspense>
					<Suspense fallback={<div>Loading...</div>}>
						<JoinGroupForm userId={user?.id} />
					</Suspense>
				</div>
				<div className="md:col-span-2">
					<Suspense fallback={<div>Loading tasks...</div>}>
						<GroupTasks userId={user?.id} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
