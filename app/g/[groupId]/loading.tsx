import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-5 mt-10">
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-[50vh]" />
      <Skeleton className="w-full h-10" />
    </div>
  );
}
