import { AnalyticsView } from "@/app/(app)/analytics/analytics-view";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics"
        text="Track performance metrics and gain insights into your team's productivity."
      >
        <Button>
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </DashboardHeader>
      <AnalyticsView />
    </DashboardShell>
  );
}
