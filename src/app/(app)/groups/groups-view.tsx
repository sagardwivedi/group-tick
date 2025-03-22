"use client";

import * as React from "react";
import {
  CheckCircle,
  Clock,
  Filter,
  Grid,
  List,
  MoreHorizontal,
  Search,
  SortAsc,
  Users,
  UserPlus,
  Settings,
  LogOut,
  X,
  Edit,
  Trash,
  Mail,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Sample group data
const groups = [
  {
    id: "group-1",
    name: "Marketing Team",
    description: "Responsible for all marketing activities and campaigns",
    createdAt: new Date(2023, 2, 15),
    isAdmin: true,
    members: [
      {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
        role: "Admin",
      },
      {
        id: "user-2",
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
        role: "Member",
      },
      {
        id: "user-3",
        name: "David Lee",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DL",
        role: "Member",
      },
    ],
    taskCount: 12,
    completedTasks: 8,
    activeProjects: 2,
    recentActivity: [
      {
        id: "activity-1",
        user: "Sarah Miller",
        action: "completed task",
        target: "Update website content",
        time: "2 hours ago",
      },
      {
        id: "activity-2",
        user: "Alex Johnson",
        action: "created task",
        target: "Q3 Marketing Strategy",
        time: "1 day ago",
      },
    ],
  },
  {
    id: "group-2",
    name: "Development Team",
    description: "Frontend and backend development for all products",
    createdAt: new Date(2023, 1, 10),
    isAdmin: false,
    members: [
      {
        id: "user-4",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
        role: "Admin",
      },
      {
        id: "user-5",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "EW",
        role: "Member",
      },
      {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
        role: "Member",
      },
      {
        id: "user-6",
        name: "James Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JR",
        role: "Member",
      },
      {
        id: "user-7",
        name: "Lisa Wang",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "LW",
        role: "Member",
      },
    ],
    taskCount: 24,
    completedTasks: 15,
    activeProjects: 3,
    recentActivity: [
      {
        id: "activity-3",
        user: "Michael Chen",
        action: "assigned task",
        target: "Fix navigation bug",
        time: "3 hours ago",
      },
      {
        id: "activity-4",
        user: "Emma Wilson",
        action: "completed task",
        target: "Implement user feedback",
        time: "1 day ago",
      },
    ],
  },
  {
    id: "group-3",
    name: "Design Team",
    description: "UI/UX design for web and mobile applications",
    createdAt: new Date(2023, 3, 5),
    isAdmin: true,
    members: [
      {
        id: "user-5",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "EW",
        role: "Admin",
      },
      {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
        role: "Member",
      },
    ],
    taskCount: 8,
    completedTasks: 5,
    activeProjects: 1,
    recentActivity: [
      {
        id: "activity-5",
        user: "Emma Wilson",
        action: "created task",
        target: "Design new logo options",
        time: "5 hours ago",
      },
      {
        id: "activity-6",
        user: "Alex Johnson",
        action: "commented on",
        target: "Mobile app redesign",
        time: "2 days ago",
      },
    ],
  },
  {
    id: "group-4",
    name: "Executive Team",
    description: "Company leadership and strategic planning",
    createdAt: new Date(2023, 0, 1),
    isAdmin: false,
    members: [
      {
        id: "user-8",
        name: "Robert Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "RS",
        role: "Admin",
      },
      {
        id: "user-9",
        name: "Jennifer Taylor",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JT",
        role: "Member",
      },
      {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
        role: "Member",
      },
    ],
    taskCount: 6,
    completedTasks: 2,
    activeProjects: 2,
    recentActivity: [
      {
        id: "activity-7",
        user: "Robert Smith",
        action: "created task",
        target: "Q2 Strategy Review",
        time: "1 day ago",
      },
      {
        id: "activity-8",
        user: "Jennifer Taylor",
        action: "scheduled meeting",
        target: "Budget Planning",
        time: "3 days ago",
      },
    ],
  },
  {
    id: "group-5",
    name: "Product Team",
    description: "Product management and roadmap planning",
    createdAt: new Date(2023, 4, 20),
    isAdmin: false,
    members: [
      {
        id: "user-10",
        name: "Daniel Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DB",
        role: "Admin",
      },
      {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
        role: "Member",
      },
      {
        id: "user-4",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
        role: "Member",
      },
      {
        id: "user-5",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "EW",
        role: "Member",
      },
    ],
    taskCount: 15,
    completedTasks: 7,
    activeProjects: 2,
    recentActivity: [
      {
        id: "activity-9",
        user: "Daniel Brown",
        action: "updated roadmap",
        target: "Q3 Product Roadmap",
        time: "12 hours ago",
      },
      {
        id: "activity-10",
        user: "Alex Johnson",
        action: "added comment",
        target: "Feature Prioritization",
        time: "2 days ago",
      },
    ],
  },
];

export function GroupsView() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedGroup, setSelectedGroup] = React.useState<
    (typeof groups)[0] | null
  >(null);
  const [isGroupDialogOpen, setIsGroupDialogOpen] = React.useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<string>("name");
  const [showAdminOnly, setShowAdminOnly] = React.useState(false);

  // Filter groups based on search query and admin filter
  const filteredGroups = React.useMemo(() => {
    return groups.filter((group) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Admin filter
      const matchesAdminFilter = !showAdminOnly || group.isAdmin;

      return matchesSearch && matchesAdminFilter;
    });
  }, [searchQuery, showAdminOnly]);

  // Sort filtered groups
  const sortedGroups = React.useMemo(() => {
    return [...filteredGroups].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "members":
          return b.members.length - a.members.length;
        case "tasks":
          return b.taskCount - a.taskCount;
        case "created":
          return b.createdAt.getTime() - a.createdAt.getTime();
        default:
          return 0;
      }
    });
  }, [filteredGroups, sortBy]);

  const handleGroupClick = (group: (typeof groups)[0]) => {
    setSelectedGroup(group);
    setIsGroupDialogOpen(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setShowAdminOnly(false);
  };

  return (
    <div className="space-y-4">
      {/* Filters and View Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search groups..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => setShowAdminOnly(!showAdminOnly)}
              >
                <div className="flex items-center">
                  <div
                    className={`mr-2 h-4 w-4 rounded-sm border ${
                      showAdminOnly
                        ? "bg-primary border-primary"
                        : "border-input"
                    } flex items-center justify-center`}
                  >
                    {showAdminOnly && (
                      <CheckCircle className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>
                  <span>Show only groups I admin</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <SortAsc className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSortBy("name")}>
                Name {sortBy === "name" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("members")}>
                Member Count {sortBy === "members" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("tasks")}>
                Task Count {sortBy === "tasks" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("created")}>
                Recently Created {sortBy === "created" && "✓"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-2">
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "grid" | "list")}
          >
            <TabsList className="grid w-[160px] grid-cols-2">
              <TabsTrigger value="grid">
                <Grid className="mr-2 h-4 w-4" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="mr-2 h-4 w-4" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Active Filters */}
      {(searchQuery || showAdminOnly) && (
        <div className="flex flex-wrap items-center gap-2 rounded-md border bg-background p-2">
          <div className="text-sm font-medium">Active filters:</div>
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {searchQuery}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </Button>
            </Badge>
          )}
          {showAdminOnly && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Admin groups only
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => setShowAdminOnly(false)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </Button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-8"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Group Count */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {filteredGroups.length}{" "}
          {filteredGroups.length === 1 ? "Group" : "Groups"}
        </h2>
        {filteredGroups.length !== groups.length && (
          <p className="text-sm text-muted-foreground">
            Showing {filteredGroups.length} of {groups.length} groups
          </p>
        )}
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedGroups.length > 0 ? (
            sortedGroups.map((group) => (
              <Card
                key={group.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        {group.name}
                        {group.isAdmin && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Admin
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {group.description}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleGroupClick(group)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Tasks</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {group.isAdmin ? (
                          <>
                            <DropdownMenuItem>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Invite Members
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Group Settings
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem className="text-destructive">
                            <LogOut className="mr-2 h-4 w-4" />
                            Leave Group
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
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
                    <div className="text-sm font-medium mb-2">
                      Members ({group.members.length})
                    </div>
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 5).map((member, i) => (
                        <TooltipProvider key={member.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Avatar className="border-2 border-background h-8 w-8">
                                <AvatarImage
                                  src={member.avatar}
                                  alt={member.name}
                                />
                                <AvatarFallback>
                                  {member.initials}
                                </AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {member.name} ({member.role})
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                      {group.members.length > 5 && (
                        <Avatar className="border-2 border-background h-8 w-8 bg-muted">
                          <AvatarFallback>
                            +{group.members.length - 5}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      {group.isAdmin && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full h-8 w-8 ml-1"
                          onClick={() => setIsInviteDialogOpen(true)}
                        >
                          <UserPlus className="h-4 w-4" />
                          <span className="sr-only">Add member</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t pt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    Created {format(group.createdAt, "MMM d, yyyy")}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGroupClick(group)}
                  >
                    View Group
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No groups found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No groups match your current filters. Try adjusting your search
                or filters.
              </p>
              <Button className="mt-4" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {sortedGroups.length > 0 ? (
            sortedGroups.map((group) => (
              <Card
                key={group.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center">
                          {group.name}
                          {group.isAdmin && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Admin
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {group.description}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleGroupClick(group)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Tasks</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {group.isAdmin ? (
                            <>
                              <DropdownMenuItem>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Invite Members
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Group Settings
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <DropdownMenuItem className="text-destructive">
                              <LogOut className="mr-2 h-4 w-4" />
                              Leave Group
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {group.members.length} members
                        </span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {group.taskCount} tasks ({group.completedTasks}{" "}
                          completed)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          Created {format(group.createdAt, "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
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
                  </div>

                  <div className="border-t md:border-t-0 md:border-l p-6 md:w-64 flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Members</h4>
                      <div className="space-y-2">
                        {group.members.slice(0, 3).map((member) => (
                          <div key={member.id} className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage
                                src={member.avatar}
                                alt={member.name}
                              />
                              <AvatarFallback>{member.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm truncate">
                              {member.name}
                            </span>
                            {member.role === "Admin" && (
                              <Badge
                                variant="outline"
                                className="ml-auto text-xs"
                              >
                                Admin
                              </Badge>
                            )}
                          </div>
                        ))}
                        {group.members.length > 3 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs mt-1"
                          >
                            View all {group.members.length} members
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGroupClick(group)}
                      >
                        View Group
                      </Button>
                      {group.isAdmin ? (
                        <Button variant="outline" size="sm">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Invite Members
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Leave Group
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No groups found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No groups match your current filters. Try adjusting your search
                or filters.
              </p>
              <Button className="mt-4" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Group Detail Dialog */}
      {selectedGroup && (
        <Dialog open={isGroupDialogOpen} onOpenChange={setIsGroupDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {selectedGroup.name}
                {selectedGroup.isAdmin && (
                  <Badge variant="outline" className="ml-2">
                    Admin
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription>{selectedGroup.description}</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="members">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="members" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Group Members ({selectedGroup.members.length})
                  </h3>
                  {selectedGroup.isAdmin && (
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsGroupDialogOpen(false);
                        setIsInviteDialogOpen(true);
                      }}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite Members
                    </Button>
                  )}
                </div>

                <div className="border rounded-md">
                  {selectedGroup.members.map((member, index) => (
                    <div
                      key={member.id}
                      className={cn(
                        "flex items-center justify-between p-4",
                        index !== selectedGroup.members.length - 1 && "border-b"
                      )}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </div>

                      {selectedGroup.isAdmin && member.role !== "Admin" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Make Admin
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Remove from Group
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Group Tasks ({selectedGroup.taskCount})
                  </h3>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Task Progress</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedGroup.completedTasks}/{selectedGroup.taskCount}{" "}
                      completed
                    </div>
                  </div>
                  <Progress
                    value={
                      (selectedGroup.completedTasks / selectedGroup.taskCount) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                <div className="border rounded-md">
                  <div className="p-4 text-center text-muted-foreground">
                    <p>Task list will be displayed here.</p>
                    <p className="text-sm">View all tasks in the Tasks page.</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline">View All Tasks</Button>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Recent Activity</h3>

                <div className="border rounded-md divide-y">
                  {selectedGroup.recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4">
                      <div className="flex items-start">
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>{" "}
                            <span className="text-muted-foreground">
                              {activity.action}
                            </span>{" "}
                            <span className="font-medium">
                              "{activity.target}"
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Created {format(selectedGroup.createdAt, "MMMM d, yyyy")}
              </div>
              <div className="flex gap-2">
                {selectedGroup.isAdmin ? (
                  <>
                    <Button variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Group
                    </Button>
                    <Button variant="destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Group
                    </Button>
                  </>
                ) : (
                  <Button variant="destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Leave Group
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Invite Members Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Invite Members</DialogTitle>
            <DialogDescription>
              Add new members to your group by email or username.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="emails">Email Addresses</Label>
              <Textarea
                id="emails"
                placeholder="Enter email addresses separated by commas"
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">
                Enter multiple email addresses separated by commas.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Invitation Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a personal message to your invitation"
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select defaultValue="member">
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsInviteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Send Invitations</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
