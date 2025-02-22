"use client";

import { createGroup, joinGroup } from "@/lib/actions/action";
import { PlusCircle } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function GroupCreateJoin() {
  const [joinMessage, joinAction, isJoining] = useActionState(joinGroup, {});
  const [createMessage, createAction, isCreating] = useActionState(
    createGroup,
    {}
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (joinMessage?.success || createMessage?.success) {
      setOpen(false);
    }
  }, [createMessage, joinMessage]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <PlusCircle className="w-5 h-5" />
          Join/Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6">
        <DialogTitle>Manage Your Groups</DialogTitle>
        <DialogDescription>
          Join an existing group or create a new one.
        </DialogDescription>
        <Tabs defaultValue="join" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="join">Join Group</TabsTrigger>
            <TabsTrigger value="create">Create Group</TabsTrigger>
          </TabsList>

          {/* Join Group */}
          <TabsContent value="join" className="mt-4">
            <form action={joinAction} className="space-y-3">
              <Label htmlFor="group-code">Group Code</Label>
              <Input
                id="group-code"
                name="code"
                placeholder="Enter group code..."
              />
              <Button className="w-full" disabled={isJoining}>
                {isJoining ? "Joining..." : "Join"}
              </Button>
              {joinMessage && (
                <p className="text-red-500">{joinMessage.error}</p>
              )}
            </form>
          </TabsContent>

          {/* Create Group */}
          <TabsContent value="create" className="mt-4">
            <form action={createAction} className="space-y-3">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                name="group_name"
                placeholder="Enter group name..."
              />
              <Button className="w-full" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create"}
              </Button>
              {createMessage && (
                <p className="text-red-500">{createMessage.error}</p>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
