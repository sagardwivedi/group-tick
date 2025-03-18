import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { TasksView } from "@/components/tasks-view";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function TasksPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Tasks"
        text="Manage and organize all your tasks in one place."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </DashboardHeader>
      <TasksView />
    </DashboardShell>
  );
}
