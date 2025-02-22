import { GroupCreateJoin } from "@/components/group-create-join";
import { currentUser } from "@clerk/nextjs/server";
import { Sparkles } from "lucide-react";

export default async function GroupsDashboard() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex bg-gradient-to-b from-gray-50/50 to-white">
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Welcome back{user.fullName && ","}
                </h1>
              </div>
              {user.fullName && (
                <p className="text-lg md:text-xl font-medium text-gray-700">
                  {user.fullName}
                </p>
              )}
            </div>
            <GroupCreateJoin />
          </div>
        </div>
      </div>
    </div>
  );
}
