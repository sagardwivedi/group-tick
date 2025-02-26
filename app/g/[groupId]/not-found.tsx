import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost, Users, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-6 px-4">
      <Ghost className="w-16 h-16 text-gray-400" />
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
        Lost in the Task Maze?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md">
        The page you’re looking for doesn’t exist. Maybe it was archived, or you followed an old link.  
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </Button>
        </Link>
        <Link href="/groups">
          <Button className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            View Groups
          </Button>
        </Link>
      </div>
    </div>
  );
}
