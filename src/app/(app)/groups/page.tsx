import { GroupsView } from "@/app/(app)/groups/groups-view";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function GroupsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Groups"
        text="Manage your collaborative groups and teams."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Group
        </Button>
      </DashboardHeader>
      <GroupsView />
    </DashboardShell>
  );
}
