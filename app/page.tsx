import { GroupCreateJoin } from "@/components/group-create-join-dialog";
import { currentUser } from "@clerk/nextjs/server";

export default async function GroupsDashboard() {
  const user = await currentUser();

  if (!user) {
    return "";
  }

  return (
    <div className="flex bg-gray-50">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome to Your Dashboard {user.fullName}
            </h1>
            <GroupCreateJoin />
          </div>
        </div>
      </div>
    </div>
  );
}
