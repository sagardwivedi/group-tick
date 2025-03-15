import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Calendar } from "@/components/calendar/calendar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CalendarPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Calendar"
        text="View and manage your tasks and deadlines in calendar format."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </DashboardHeader>
      <Calendar />
    </DashboardShell>
  );
}
