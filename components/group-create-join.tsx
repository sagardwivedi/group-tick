"use client";

import { createGroupAction, joinGroupAction } from "@/lib/actions/action";
import { useUser } from "@clerk/nextjs";
import {
  Check,
  Copy,
  Loader2,
  Share2,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function GroupManager() {
  const [joinResponse, joinAction, isJoining] = useActionState(
    joinGroupAction,
    {}
  );
  const [createResponse, createAction, isCreating] = useActionState(
    createGroupAction,
    {}
  );
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("join");
  const [joinCode, setJoinCode] = useState("");
  const [groupName, setGroupName] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (createResponse.success) {
      setGroupName("");
    }
  }, [createResponse]);

  useEffect(() => {
    if (joinResponse?.success) {
      toast.success("Successfully joined group", {
        description: "You can now collaborate with other members.",
        icon: <Check className="h-4 w-4 text-green-500" />,
      });
      setIsOpen(false);
      setJoinCode("");
    }

    if (joinResponse.error) {
      toast.error("Failed to join group", {
        description: joinResponse.error,
      });
    }
  }, [joinResponse]);

  useEffect(() => {
    if (!isOpen) {
      setJoinCode("");
      setGroupName("");
      setActiveTab("join");
      setCopied(false);
    }
  }, [isOpen]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Code copied to clipboard", {
      description: "Share this code with others to join your group",
      icon: <Copy className="h-4 w-4" />,
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const shareGroupCode = async (code: string) => {
    const shareData = {
      title: "Join My Collaboration Group",
      text: `Use this code to join my group: ${code}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      copyToClipboard(code);
    }
  };

  const formatCode = (code: string) => {
    // Format code with a space in the middle for better readability
    if (code && code.length === 8) {
      return `${code.slice(0, 4)} ${code.slice(4)}`;
    }
    return code;
  };

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="cursor-pointer flex items-center gap-2 hover:shadow-md transition-all duration-300"
                size="sm"
              >
                <Users className="size-4" />
                <span>Groups</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent
            sideOffset={5}
            className="bg-primary text-primary-foreground"
          >
            <p>Join or create a collaboration group</p>
          </TooltipContent>
        </Tooltip>

        <DialogContent className="p-0 rounded-xl max-w-md border shadow-xl bg-background">
          <DialogHeader className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 rounded-t-xl">
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Group Collaboration
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-1">
              Create or join a group to collaborate with others
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 pt-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted/50 rounded-lg">
                <TabsTrigger
                  value="join"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-200"
                >
                  <UserPlus className="size-4 mr-2" />
                  Join Group
                </TabsTrigger>
                <TabsTrigger
                  value="create"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-200"
                >
                  <Sparkles className="size-4 mr-2" />
                  Create Group
                </TabsTrigger>
              </TabsList>

              {/* Join Group */}
              <TabsContent value="join" className="space-y-4 mt-2">
                <form action={joinAction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="group-code" className="text-sm font-medium">
                      Enter Group Code
                    </Label>
                    <Input
                      id="group-code"
                      name="code"
                      placeholder="XXXX XXXX"
                      required
                      className="text-center font-mono text-lg tracking-wider h-12"
                      maxLength={8}
                      value={joinCode}
                      onChange={(e) =>
                        setJoinCode(e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <input
                    type="hidden"
                    name="joiner_name"
                    defaultValue={user?.fullName ?? ""}
                  />
                  <Button
                    disabled={isJoining || joinCode.length < 8}
                    className="w-full h-10 mt-2"
                    variant="default"
                  >
                    {isJoining ? (
                      <>
                        <Loader2 className="size-4 mr-2 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      "Join Group"
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Create Group */}
              <TabsContent value="create" className="space-y-4 mt-2">
                <form action={createAction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="group-name" className="text-sm font-medium">
                      Group Name
                    </Label>
                    <Input
                      id="group-name"
                      name="group_name"
                      placeholder="Enter a name for your group"
                      className="h-12"
                      required
                      autoComplete="off"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </div>
                  <input
                    type="hidden"
                    name="creator_name"
                    defaultValue={user?.fullName ?? ""}
                  />
                  <Button
                    disabled={isCreating || !groupName.trim()}
                    className="w-full h-10 mt-2"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="size-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Group"
                    )}
                  </Button>
                </form>

                {createResponse?.success && (
                  <Card className="mt-4 border border-green-100 bg-green-50 dark:bg-green-950/20 dark:border-green-900/50">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="font-medium text-green-800 dark:text-green-400">
                          Group created successfully!
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <span className="font-mono text-lg tracking-wider">
                          {formatCode(createResponse.success as string)}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={() => {
                              copyToClipboard(createResponse.success as string);
                            }}
                            size="icon"
                            variant="outline"
                            className="size-9 cursor-pointer transition-all duration-200"
                          >
                            {copied ? (
                              <Check className="size-4 text-green-600" />
                            ) : (
                              <Copy className="size-4" />
                            )}
                          </Button>
                          <Button
                            type="button"
                            onClick={() =>
                              shareGroupCode(createResponse.success as string)
                            }
                            size="icon"
                            variant="outline"
                            className="size-9 cursor-pointer"
                          >
                            <Share2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
