import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Plus, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RootObject {
  id: string;
  name: string;
  description: string;
  members: Member[];
  taskCount: number;
  completedTasks: number;
  activeProjects: number;
}

interface Member {
  name: string;
  avatar: string;
  initials: string;
}

export function GroupList({ data }: { data: RootObject[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Groups</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Group
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{group.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Group</DropdownMenuItem>
                    <DropdownMenuItem>Edit Group</DropdownMenuItem>
                    <DropdownMenuItem>Invite Members</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Leave Group
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Task Progress</div>
                  <div className="text-sm text-muted-foreground">
                    {group.completedTasks}/{group.taskCount}
                  </div>
                </div>
                <Progress
                  value={(group.completedTasks / group.taskCount) * 100}
                  className="h-2"
                />
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Members</div>
                <div className="flex -space-x-2">
                  {group.members.map((member, i) => (
                    <Avatar
                      key={i}
                      className="border-2 border-background h-8 w-8"
                    >
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-8 w-8 ml-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add member</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t pt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                {group.members.length} members
              </div>
              <Button variant="outline" size="sm">
                View Tasks
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
