import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RootObject {
  id: string;
  user: User;
  action: string;
  task?: string;
  group: string;
  time: string;
  comment?: string;
  assignee?: string;
}

interface User {
  name: string;
  avatar: string;
  initials: string;
}

export function RecentActivity({ activities }: { activities: RootObject[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Stay updated with the latest actions from your team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage
                  src={activity.user.avatar}
                  alt={activity.user.name}
                />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user.name}</span>{" "}
                  <span className="text-muted-foreground">
                    {activity.action}
                  </span>{" "}
                  {activity.task && (
                    <span className="font-medium">{activity.task}</span>
                  )}
                  {activity.action === "assigned" && (
                    <span>
                      {" "}
                      to{" "}
                      <span className="font-medium">{activity.assignee}</span>
                    </span>
                  )}
                  {activity.action === "created group" && (
                    <span>
                      {" "}
                      <span className="font-medium">{activity.group}</span>
                    </span>
                  )}
                </p>
                <div className="flex items-center pt-1">
                  {activity.group && (
                    <Badge variant="outline" className="mr-2">
                      {activity.group}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
                {activity.comment && (
                  <p className="text-sm text-muted-foreground mt-2 bg-muted p-2 rounded-md">
                    {activity.comment}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
