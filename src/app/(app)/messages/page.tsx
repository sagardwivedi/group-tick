import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { MessagesView } from "@/app/(app)/messages/messages-view";

export default function MessagesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Messages"
        text="Communicate with your team members and collaborators."
      />
      <MessagesView />
    </DashboardShell>
  );
}
