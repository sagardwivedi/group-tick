import Link from "next/link";
import { Crown, PlusCircle, Search, Users } from "lucide-react";
import { QUERIES } from "@/db/queries";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { GroupCreateJoin } from "./group-create-join";

type GroupsListProps = {
  mobileView?: boolean;
};

type GroupSectionProps = {
  title: string;
  groups: Array<{ id: number; name: string }>;
  icon: React.ReactNode;
  emptyIcon: React.ReactNode;
  emptyText: string;
  cta?: React.ReactNode;
  className?: string;
};

export async function GroupsList({ mobileView }: GroupsListProps) {
  const { owner: createdGroups, member: joinedGroups } =
    await QUERIES.getAllGroupsByUser();

  const GroupSection = ({
    title,
    groups,
    icon,
    emptyIcon,
    emptyText,
    cta,
    className,
  }: GroupSectionProps) => (
    <section
      className={cn("space-y-4 rounded-lg border bg-card p-4", className)}
    >
      <header className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
      </header>

      {groups.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center text-muted-foreground">
          {emptyIcon}
          <p className="text-sm">{emptyText}</p>
          {cta}
        </div>
      ) : (
        <ul className="space-y-2">
          {groups.map((group) => (
            <li key={group.id}>
              <Button
                asChild
                variant="ghost"
                className="h-auto w-full justify-start px-3 py-2 text-left"
              >
                <Link href={`/g/${group.id}`}>
                  <span className="line-clamp-1">{group.name}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  return (
    <ScrollArea className="h-full">
      <div className={cn("space-y-6", mobileView ? "p-2" : "p-4")}>
        <GroupSection
          title="Created Groups"
          groups={createdGroups}
          icon={<Crown className="h-5 w-5 text-amber-600" />}
          emptyIcon={
            <>
              <PlusCircle className="mx-auto h-8 w-8" />
              <GroupCreateJoin />
            </>
          }
          emptyText="You haven't created any groups yet"
          className="border-amber-100 bg-amber-50/50"
        />

        <GroupSection
          title="Joined Groups"
          groups={joinedGroups}
          icon={<Users className="h-5 w-5 text-emerald-600" />}
          emptyIcon={<Search className="mx-auto h-8 w-8" />}
          emptyText="You haven't joined any groups yet"
          className="border-emerald-100 bg-emerald-50/50"
        />
      </div>
    </ScrollArea>
  );
}
