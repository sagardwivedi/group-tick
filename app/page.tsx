import { GroupCreateJoinDialog } from "@/components/group-create-join-dialog";

export default async function GroupsDashboard() {
	return (
		<div className="flex h-screen bg-gray-50">
			<div className="flex-1 overflow-auto">
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-2xl font-bold text-gray-800">
							{"Welcome to Your Dashboard"}
						</h1>
						<GroupCreateJoinDialog />
					</div>
				</div>
			</div>
		</div>
	);
}
