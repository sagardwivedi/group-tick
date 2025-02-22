import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { Menu } from "lucide-react";
import { Suspense } from "react";
import { GroupsList } from "./group-list";

export function MobileGroupsDrawer() {
  return (
    <div className="md:hidden">
      <Drawer direction="bottom">
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full mt-24 rounded-r-xl">
          <div className="p-4 h-full">
            <h2 className="text-xl font-bold mb-4">Your Groups</h2>
            <Suspense fallback={<GroupsSkeleton />}>
              <GroupsList mobileView />
            </Suspense>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

const GroupsSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <Skeleton key={i} className="h-12 w-full rounded-lg" />
    ))}
  </div>
);
