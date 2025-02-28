"use client";

import { ArrowLeft, Copy, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { QUERIES } from "@/db/queries";

import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AddTaskDialog } from "./AddTask";
import { TaskItem } from "./task";

type GroupType = Awaited<ReturnType<typeof QUERIES.getGroupInfo>>;
export type TaskType = Awaited<ReturnType<typeof QUERIES.getGroupTasks>>;

interface GroupTasksProps {
  tasks: TaskType;
  group: GroupType;
}

export function GroupTasks({ tasks, group }: GroupTasksProps) {
  const router = useRouter();
  return (
    <div className="container mx-auto space-y-4">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center justify-between md:justify-start gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="flex items-center gap-2 p-2 md:px-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only md:not-sr-only">Back</span>
          </Button>
          <h2 className="text-xl md:text-3xl font-semibold truncate max-w-[50vw]">
            {group?.group_name}
          </h2>
        </div>
        <GroupInfo group={group} />
      </header>

      <Card className="w-full">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-xl md:text-2xl">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] min-h-[300px]">
            {tasks.length > 0 ? (
              <ul className="space-y-2 md:space-y-4">
                {tasks.map((task) => (
                  <Fragment key={task.id}>
                    <TaskItem task={task} />
                    <Separator className="md:hidden" />
                  </Fragment>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No tasks yet.
              </p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <AddTaskDialog groupId={group?.id} />
    </div>
  );
}

interface GroupInfoProps {
  group: GroupType;
}

function GroupInfo({ group }: GroupInfoProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (group?.join_code) {
      navigator.clipboard.writeText(group.join_code);
      setCopied(true);
      toast.success("Join code copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Sheet>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 w-full md:w-auto">
          <Info className="h-4 w-4" />
          <span className="text-sm md:text-base">Group Info</span>
        </Button>
      </SheetTrigger>

      {/* Content */}
      <SheetContent className="w-full sm:max-w-md p-6">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-lg md:text-xl font-semibold">
            {group?.group_name || "Group"}
          </SheetTitle>
        </SheetHeader>

        {/* Group Details */}
        <div className="space-y-6">
          {/* Created by */}
          <div>
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground">
              Created by
            </h3>
            <p className="text-sm md:text-base">
              {group?.creator_name || "Unknown"}
            </p>
          </div>

          <Separator />

          {/* Join Code */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs md:text-sm font-medium text-muted-foreground">
                Join Code
              </h3>
              <Badge variant="secondary" className="text-sm py-1 px-3">
                {group?.join_code || "N/A"}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              <Copy className={`h-4 w-4 ${copied ? "text-green-500" : ""}`} />
            </Button>
          </div>

          <Separator />

          {/* Members List */}
          <div>
            <h3 className="text-sm md:text-base font-semibold">Members</h3>
            <ScrollArea className="max-h-40 space-y-2 mt-2">
              {group?.members.length ? (
                group.members.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition"
                  >
                    <Avatar>
                      <AvatarImage src={member.avatar_url ?? ""} />
                      <AvatarFallback>
                        {member.user_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm md:text-base">
                      {member.user_name}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No members yet.</p>
              )}
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
