"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CheckCircle,
  Clock,
  Filter,
  Grid,
  List,
  MoreHorizontal,
  Plus,
  Search,
  SortAsc,
  Tag,
  X,
} from "lucide-react";
import * as React from "react";
import { TaskDialog } from "./task-dialog";

// Sample task data
const tasks = [
  {
    id: "task-1",
    title: "Update website content",
    description: "Update the landing page with new testimonials and features",
    dueDate: new Date(2023, 5, 15),
    priority: "High",
    status: "In Progress",
    group: "Marketing Team",
    tags: ["Website", "Content"],
    assignee: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
  },
  {
    id: "task-2",
    title: "Prepare quarterly report",
    description: "Compile data and create presentation for quarterly meeting",
    dueDate: new Date(2023, 5, 20),
    priority: "Medium",
    status: "Not Started",
    group: "Executive Team",
    tags: ["Report", "Presentation"],
    assignee: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SM",
    },
  },
  {
    id: "task-3",
    title: "Fix navigation bug",
    description:
      "Address the issue with mobile navigation menu not closing properly",
    dueDate: new Date(2023, 5, 10),
    priority: "High",
    status: "In Progress",
    group: "Development Team",
    tags: ["Bug", "Mobile"],
    assignee: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
  },
  {
    id: "task-4",
    title: "Design new logo options",
    description: "Create 3-5 logo variations based on client feedback",
    dueDate: new Date(2023, 5, 18),
    priority: "Medium",
    status: "In Progress",
    group: "Design Team",
    tags: ["Design", "Logo"],
    assignee: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EW",
    },
  },
  {
    id: "task-5",
    title: "Update user documentation",
    description:
      "Revise user guide to include new features from latest release",
    dueDate: new Date(2023, 5, 25),
    priority: "Low",
    status: "Not Started",
    group: "Documentation Team",
    tags: ["Documentation", "User Guide"],
    assignee: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
  },
  {
    id: "task-6",
    title: "Team meeting",
    description: "Weekly team sync to discuss progress and blockers",
    dueDate: new Date(2023, 5, 12),
    priority: "Medium",
    status: "Not Started",
    group: "All Teams",
    tags: ["Meeting", "Weekly"],
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
  },
  {
    id: "task-7",
    title: "Client presentation",
    description: "Present new features to the client",
    dueDate: new Date(2023, 5, 22),
    priority: "High",
    status: "Not Started",
    group: "Marketing Team",
    tags: ["Client", "Presentation"],
    assignee: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SM",
    },
  },
  {
    id: "task-8",
    title: "Code review",
    description: "Review pull requests for the new feature",
    dueDate: new Date(2023, 5, 8),
    priority: "Medium",
    status: "Completed",
    group: "Development Team",
    tags: ["Code", "Review"],
    assignee: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
  },
  {
    id: "task-9",
    title: "Implement user feedback",
    description: "Address user feedback from the latest survey",
    dueDate: new Date(2023, 5, 30),
    priority: "Medium",
    status: "Not Started",
    group: "Development Team",
    tags: ["Feedback", "User Experience"],
    assignee: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EW",
    },
  },
  {
    id: "task-10",
    title: "Update privacy policy",
    description:
      "Review and update privacy policy to comply with new regulations",
    dueDate: new Date(2023, 5, 28),
    priority: "High",
    status: "Not Started",
    group: "Legal Team",
    tags: ["Legal", "Policy"],
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
  },
];

// Group tasks by status for board view
const tasksByStatus = {
  "Not Started": tasks.filter((task) => task.status === "Not Started"),
  "In Progress": tasks.filter((task) => task.status === "In Progress"),
  Completed: tasks.filter((task) => task.status === "Completed"),
};

export function TasksView() {
  const [viewMode, setViewMode] = React.useState<"list" | "board">("list");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTask, setSelectedTask] = React.useState<
    (typeof tasks)[0] | null
  >(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<string>("dueDate");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("all");
  const [groupFilter, setGroupFilter] = React.useState<string>("all");

  // Filter tasks based on search query and active filters
  const filteredTasks = React.useMemo(() => {
    return tasks.filter((task) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Status filter
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      // Priority filter
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      // Group filter
      const matchesGroup = groupFilter === "all" || task.group === groupFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesGroup;
    });
  }, [searchQuery, statusFilter, priorityFilter, groupFilter]);

  // Sort filtered tasks
  const sortedTasks = React.useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return a.dueDate.getTime() - b.dueDate.getTime();
        case "priority":
          const priorityOrder = { High: 0, Medium: 1, Low: 2 };
          return (
            priorityOrder[a.priority as keyof typeof priorityOrder] -
            priorityOrder[b.priority as keyof typeof priorityOrder]
          );
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [filteredTasks, sortBy]);

  // Group tasks by status for board view (after filtering)
  const filteredTasksByStatus = React.useMemo(() => {
    return {
      "Not Started": filteredTasks.filter(
        (task) => task.status === "Not Started"
      ),
      "In Progress": filteredTasks.filter(
        (task) => task.status === "In Progress"
      ),
      Completed: filteredTasks.filter((task) => task.status === "Completed"),
    };
  }, [filteredTasks]);

  const handleTaskClick = (task: (typeof tasks)[0]) => {
    setSelectedTask(task);
    setIsTaskDialogOpen(true);
  };

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchQuery("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setGroupFilter("all");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "bg-muted text-muted-foreground";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive text-destructive-foreground";
      case "Medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-muted text-muted-foreground";
    }
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
              placeholder="Search tasks..."
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
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Group</DropdownMenuLabel>
              <Select value={groupFilter} onValueChange={setGroupFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  <SelectItem value="Marketing Team">Marketing Team</SelectItem>
                  <SelectItem value="Development Team">
                    Development Team
                  </SelectItem>
                  <SelectItem value="Design Team">Design Team</SelectItem>
                  <SelectItem value="Executive Team">Executive Team</SelectItem>
                  <SelectItem value="Documentation Team">
                    Documentation Team
                  </SelectItem>
                  <SelectItem value="Legal Team">Legal Team</SelectItem>
                  <SelectItem value="All Teams">All Teams</SelectItem>
                </SelectContent>
              </Select>
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
              <DropdownMenuItem onClick={() => setSortBy("dueDate")}>
                Due Date {sortBy === "dueDate" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("priority")}>
                Priority {sortBy === "priority" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("title")}>
                Title {sortBy === "title" && "✓"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-2">
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "list" | "board")}
          >
            <TabsList className="grid w-[160px] grid-cols-2">
              <TabsTrigger value="list">
                <List className="mr-2 h-4 w-4" />
                List
              </TabsTrigger>
              <TabsTrigger value="board">
                <Grid className="mr-2 h-4 w-4" />
                Board
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Active Filters */}
      {(searchQuery ||
        statusFilter !== "all" ||
        priorityFilter !== "all" ||
        groupFilter !== "all") && (
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
          {statusFilter !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {statusFilter}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => setStatusFilter("all")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </Button>
            </Badge>
          )}
          {priorityFilter !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Priority: {priorityFilter}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => setPriorityFilter("all")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </Button>
            </Badge>
          )}
          {groupFilter !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Group: {groupFilter}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => setGroupFilter("all")}
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

      {/* Task Count and Progress */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Total Tasks</div>
            <div className="text-2xl font-bold">{filteredTasks.length}</div>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {filteredTasks.length} of {tasks.length} tasks match your filters
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Not Started</div>
            <div className="text-2xl font-bold">
              {filteredTasks.filter((t) => t.status === "Not Started").length}
            </div>
          </CardHeader>
          <CardContent>
            <Progress
              value={
                (filteredTasks.filter((t) => t.status === "Not Started")
                  .length /
                  filteredTasks.length) *
                100
              }
              className="h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">In Progress</div>
            <div className="text-2xl font-bold">
              {filteredTasks.filter((t) => t.status === "In Progress").length}
            </div>
          </CardHeader>
          <CardContent>
            <Progress
              value={
                (filteredTasks.filter((t) => t.status === "In Progress")
                  .length /
                  filteredTasks.length) *
                100
              }
              className="h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Completed</div>
            <div className="text-2xl font-bold">
              {filteredTasks.filter((t) => t.status === "Completed").length}
            </div>
          </CardHeader>
          <CardContent>
            <Progress
              value={
                (filteredTasks.filter((t) => t.status === "Completed").length /
                  filteredTasks.length) *
                100
              }
              className="h-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <Card
                key={task.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <Checkbox id={task.id} />
                      <div>
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {task.description}
                        </p>
                      </div>
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
                        <DropdownMenuItem onClick={() => handleTaskClick(task)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Task</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
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
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={cn(getPriorityColor(task.priority))}>
                      {task.priority} Priority
                    </Badge>
                    <Badge className={cn(getStatusColor(task.status))}>
                      {task.status}
                    </Badge>
                    <Badge variant="outline">{task.group}</Badge>
                    {task.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-3 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>Due {format(task.dueDate, "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">Assigned to:</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar className="h-5 w-5 mr-1">
                            <AvatarImage
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                            />
                            <AvatarFallback>
                              {task.assignee.initials}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{task.assignee.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span>{task.assignee.name}</span>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <CheckCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No tasks found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No tasks match your current filters. Try adjusting your search
                or filters.
              </p>
              <Button className="mt-4" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Board View */}
      {viewMode === "board" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Object.entries(filteredTasksByStatus).map(
            ([status, statusTasks]) => (
              <div key={status} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center">
                    <Badge className={cn(getStatusColor(status), "mr-2")}>
                      {status}
                    </Badge>
                    <span>{statusTasks.length}</span>
                  </h3>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="space-y-3">
                  {statusTasks.length > 0 ? (
                    statusTasks.map((task) => (
                      <Card
                        key={task.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleTaskClick(task)}
                      >
                        <CardHeader className="p-3 pb-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">
                              {task.title}
                            </h4>
                            <Badge
                              className={cn(
                                getPriorityColor(task.priority),
                                "text-xs"
                              )}
                            >
                              {task.priority}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 pt-2">
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {task.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {task.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="p-3 pt-0 flex justify-between items-center text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {format(task.dueDate, "MMM d")}
                          </div>
                          <Avatar className="h-5 w-5">
                            <AvatarImage
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                            />
                            <AvatarFallback>
                              {task.assignee.initials}
                            </AvatarFallback>
                          </Avatar>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <div className="rounded-full bg-muted p-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <h4 className="mt-2 text-sm font-semibold">No tasks</h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        No {status.toLowerCase()} tasks match your filters
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Task Dialog */}
      {selectedTask && (
        <TaskDialog
          open={isTaskDialogOpen}
          onOpenChange={setIsTaskDialogOpen}
          task={selectedTask}
          mode="edit"
        />
      )}
    </div>
  );
}
