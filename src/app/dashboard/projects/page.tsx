import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ProjectsView } from "@/components/projects-view";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProjectsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Projects"
        text="Manage your projects and track their progress."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Project
        </Button>
      </DashboardHeader>
      <ProjectsView />
    </DashboardShell>
  );
}
