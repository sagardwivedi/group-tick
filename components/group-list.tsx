import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { QUERIES } from "@/db/queries";

type GroupSectionProps = {
  title: string;
  children: React.ReactNode;
};

const GroupSection = ({ title, children }: GroupSectionProps) => (
  <Card className="h-77 shadow-none">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="px-1">{children}</CardContent>
  </Card>
);

type GroupContentProps = {
  promise: Promise<
    {
      id: string;
      name: string;
    }[]
  >;
  emptyMessage: string;
};

const GroupContent = async ({ promise, emptyMessage }: GroupContentProps) => {
  const groups = await promise;

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center text-muted-foreground">
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {groups.map((group) => (
        <li key={group.id}>
          <Button
            asChild
            variant="ghost"
            size={"lg"}
            className="w-full justify-start"
          >
            <Link href={`/g/${group.id}`}>
              <span className="line-clamp-1">{group.name}</span>
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-2">
    {Array.from({ length: 3 }).map((_, i) => (
      <Skeleton key={i} className="h-10 w-full" />
    ))}
  </div>
);

export async function GroupsList() {
  // Start both promises in parallel
  const createdGroupsPromise = QUERIES.getCreatedGroup();
  const joinedGroupsPromise = QUERIES.getJoinedGroup();

  return (
    <div className="space-y-3 p-1">
      <GroupSection title="Created Groups">
        <Suspense fallback={<LoadingSkeleton />}>
          <ScrollArea className="h-60">
            <GroupContent
              promise={createdGroupsPromise}
              emptyMessage="You haven't created any groups yet."
            />
          </ScrollArea>
        </Suspense>
      </GroupSection>

      <GroupSection title="Joined Groups">
        <Suspense fallback={<LoadingSkeleton />}>
          <ScrollArea className="h-60">
            <GroupContent
              promise={joinedGroupsPromise}
              emptyMessage="You haven't joined any groups yet."
            />
          </ScrollArea>
        </Suspense>
      </GroupSection>
    </div>
  );
}
