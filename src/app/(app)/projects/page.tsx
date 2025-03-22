import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectsView } from "./projects-view";

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
