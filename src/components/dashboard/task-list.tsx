import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, MoreHorizontal } from "lucide-react";
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
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  group: string;
  assignee: Assignee;
}

interface Assignee {
  name: string;
  avatar: string;
  initials: string;
}

export function TaskList({ data }: { data: RootObject[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Tasks</h2>
        <Button variant="outline">
          <Clock className="mr-2 h-4 w-4" />
          Sort by Due Date
        </Button>
      </div>
      <div className="grid gap-4">
        {data.map((task) => (
          <Card key={task.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <Checkbox id={task.id} />
                  <div>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {task.description}
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit Task</DropdownMenuItem>
                    <DropdownMenuItem>Change Status</DropdownMenuItem>
                    <DropdownMenuItem>Reassign</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Delete Task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge
                  variant={
                    task.priority === "High"
                      ? "destructive"
                      : task.priority === "Medium"
                      ? "default"
                      : "secondary"
                  }
                >
                  {task.priority} Priority
                </Badge>
                <Badge variant="outline">{task.status}</Badge>
                <Badge variant="outline">{task.group}</Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-3 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">Assigned to:</span>
                <Avatar className="h-5 w-5 mr-1">
                  <AvatarImage
                    src={task.assignee.avatar}
                    alt={task.assignee.name}
                  />
                  <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                </Avatar>
                <span>{task.assignee.name}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
