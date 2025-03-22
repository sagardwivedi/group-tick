"use client";

import * as React from "react";
import {
  Calendar,
  CheckCircle,
  Edit,
  Filter,
  Grid,
  List,
  MoreHorizontal,
  Plus,
  Search,
  SortAsc,
  Star,
  Trash,
  Users,
  X,
  FileText,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { format, addDays, differenceInDays } from "date-fns";
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
import { Separator } from "@/components/ui/separator";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// Sample project data
const projects = [
  {
    id: "project-1",
    name: "Website Redesign",
    description:
      "Complete overhaul of the company website with new branding and improved UX",
    startDate: new Date(2023, 5, 1),
    dueDate: new Date(2023, 7, 15),
    status: "In Progress",
    priority: "High",
    progress: 45,
    starred: true,
    group: "Marketing Team",
    owner: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    members: [
      {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
        role: "Owner",
      },
      {
        id: "user-2",
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
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
    taskCount: 24,
    completedTasks: 11,
    milestones: [
      {
        id: "ms-1",
        name: "Design Phase",
        dueDate: new Date(2023, 5, 30),
        completed: true,
      },
      {
        id: "ms-2",
        name: "Development",
        dueDate: new Date(2023, 6, 30),
        completed: false,
      },
      {
        id: "ms-3",
        name: "Testing & Launch",
        dueDate: new Date(2023, 7, 15),
        completed: false,
      },
    ],
    recentActivity: [
      {
        id: "activity-1",
        user: "Sarah Miller",
        action: "completed task",
        target: "Homepage Wireframes",
        time: "2 hours ago",
      },
      {
        id: "activity-2",
        user: "Alex Johnson",
        action: "added milestone",
        target: "User Testing",
        time: "1 day ago",
      },
    ],
  },
  {
    id: "project-2",
    name: "Mobile App Development",
    description: "Create a new mobile app for iOS and Android platforms",
    startDate: new Date(2023, 4, 15),
    dueDate: new Date(2023, 8, 30),
    status: "In Progress",
    priority: "High",
    progress: 30,
    starred: false,
    group: "Development Team",
    owner: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    members: [
      {
        id: "user-4",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
        role: "Owner",
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
    taskCount: 36,
    completedTasks: 10,
    milestones: [
      {
        id: "ms-4",
        name: "Requirements Gathering",
        dueDate: new Date(2023, 5, 1),
        completed: true,
      },
      {
        id: "ms-5",
        name: "UI/UX Design",
        dueDate: new Date(2023, 6, 15),
        completed: false,
      },
      {
        id: "ms-6",
        name: "Development Phase 1",
        dueDate: new Date(2023, 7, 30),
        completed: false,
      },
      {
        id: "ms-7",
        name: "Testing & Launch",
        dueDate: new Date(2023, 8, 30),
        completed: false,
      },
    ],
    recentActivity: [
      {
        id: "activity-3",
        user: "Michael Chen",
        action: "updated milestone",
        target: "UI/UX Design",
        time: "3 hours ago",
      },
      {
        id: "activity-4",
        user: "James Rodriguez",
        action: "completed task",
        target: "API Integration",
        time: "1 day ago",
      },
    ],
  },
  {
    id: "project-3",
    name: "Q3 Marketing Campaign",
    description: "Plan and execute marketing campaign for Q3 product launch",
    startDate: new Date(2023, 6, 1),
    dueDate: new Date(2023, 8, 30),
    status: "Not Started",
    priority: "Medium",
    progress: 0,
    starred: true,
    group: "Marketing Team",
    owner: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SM",
    },
    members: [
      {
        id: "user-2",
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
        role: "Owner",
      },
      {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
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
    taskCount: 18,
    completedTasks: 0,
    milestones: [
      {
        id: "ms-8",
        name: "Campaign Strategy",
        dueDate: new Date(2023, 6, 15),
        completed: false,
      },
      {
        id: "ms-9",
        name: "Content Creation",
        dueDate: new Date(2023, 7, 15),
        completed: false,
      },
      {
        id: "ms-10",
        name: "Campaign Launch",
        dueDate: new Date(2023, 8, 1),
        completed: false,
      },
      {
        id: "ms-11",
        name: "Performance Analysis",
        dueDate: new Date(2023, 8, 30),
        completed: false,
      },
    ],
    recentActivity: [
      {
        id: "activity-5",
        user: "Sarah Miller",
        action: "created project",
        target: "Q3 Marketing Campaign",
        time: "2 days ago",
      },
      {
        id: "activity-6",
        user: "David Lee",
        action: "added task",
        target: "Competitor Analysis",
        time: "1 day ago",
      },
    ],
  },
  {
    id: "project-4",
    name: "Product Feature Enhancement",
    description: "Implement new features based on customer feedback",
    startDate: new Date(2023, 5, 15),
    dueDate: new Date(2023, 7, 30),
    status: "In Progress",
    priority: "Medium",
    progress: 60,
    starred: false,
    group: "Development Team",
    owner: {
      name: "James Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JR",
    },
    members: [
      {
        id: "user-6",
        name: "James Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JR",
        role: "Owner",
      },
      {
        id: "user-4",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
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
    taskCount: 15,
    completedTasks: 9,
    milestones: [
      {
        id: "ms-12",
        name: "Feature Specification",
        dueDate: new Date(2023, 5, 30),
        completed: true,
      },
      {
        id: "ms-13",
        name: "Development",
        dueDate: new Date(2023, 7, 15),
        completed: false,
      },
      {
        id: "ms-14",
        name: "Testing & Deployment",
        dueDate: new Date(2023, 7, 30),
        completed: false,
      },
    ],
    recentActivity: [
      {
        id: "activity-7",
        user: "James Rodriguez",
        action: "updated task",
        target: "User Authentication",
        time: "5 hours ago",
      },
      {
        id: "activity-8",
        user: "Lisa Wang",
        action: "completed task",
        target: "Database Optimization",
        time: "1 day ago",
      },
    ],
  },
  {
    id: "project-5",
    name: "Annual Report Preparation",
    description: "Compile and design the annual company report",
    startDate: new Date(2023, 10, 1),
    dueDate: new Date(2023, 11, 31),
    status: "Not Started",
    priority: "Low",
    progress: 0,
    starred: false,
    group: "Executive Team",
    owner: {
      name: "Jennifer Taylor",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JT",
    },
    members: [
      {
        id: "user-9",
        name: "Jennifer Taylor",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JT",
        role: "Owner",
      },
      {
        id: "user-8",
        name: "Robert Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "RS",
        role: "Member",
      },
      {
        id: "user-2",
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
        role: "Member",
      },
    ],
    taskCount: 12,
    completedTasks: 0,
    milestones: [
      {
        id: "ms-15",
        name: "Data Collection",
        dueDate: new Date(2023, 10, 30),
        completed: false,
      },
      {
        id: "ms-16",
        name: "Draft Preparation",
        dueDate: new Date(2023, 11, 15),
        completed: false,
      },
      {
        id: "ms-17",
        name: "Review & Finalization",
        dueDate: new Date(2023, 11, 31),
        completed: false,
      },
    ],
    recentActivity: [
      {
        id: "activity-9",
        user: "Jennifer Taylor",
        action: "created project",
        target: "Annual Report Preparation",
        time: "3 days ago",
      },
      {
        id: "activity-10",
        user: "Robert Smith",
        action: "added task",
        target: "Financial Data Analysis",
        time: "2 days ago",
      },
    ],
  },
  {
    id: "project-6",
    name: "Office Relocation",
    description: "Plan and execute the office move to the new location",
    startDate: new Date(2023, 7, 1),
    dueDate: new Date(2023, 9, 30),
    status: "Not Started",
    priority: "High",
    progress: 0,
    starred: false,
    group: "Operations Team",
    owner: {
      name: "Robert Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RS",
    },
    members: [
      {
        id: "user-8",
        name: "Robert Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "RS",
        role: "Owner",
      },
      {
        id: "user-9",
        name: "Jennifer Taylor",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JT",
        role: "Member",
      },
      {
        id: "user-3",
        name: "David Lee",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DL",
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
    taskCount: 30,
    completedTasks: 0,
    milestones: [
      {
        id: "ms-18",
        name: "Planning Phase",
        dueDate: new Date(2023, 7, 31),
        completed: false,
      },
      {
        id: "ms-19",
        name: "Preparation",
        dueDate: new Date(2023, 8, 30),
        completed: false,
      },
      {
        id: "ms-20",
        name: "Moving Day",
        dueDate: new Date(2023, 9, 15),
        completed: false,
      },
      {
        id: "ms-21",
        name: "Setup & Finalization",
        dueDate: new Date(2023, 9, 30),
        completed: false,
      },
    ],
    recentActivity: [
      {
        id: "activity-11",
        user: "Robert Smith",
        action: "created project",
        target: "Office Relocation",
        time: "1 week ago",
      },
      {
        id: "activity-12",
        user: "David Lee",
        action: "added task",
        target: "Inventory Assessment",
        time: "5 days ago",
      },
    ],
  },
];

export function ProjectsView() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedProject, setSelectedProject] = React.useState<
    (typeof projects)[0] | null
  >(null);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = React.useState(false);
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] =
    React.useState(false);
  const [sortBy, setSortBy] = React.useState<string>("dueDate");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("all");
  const [groupFilter, setGroupFilter] = React.useState<string>("all");
  const [starredFilter, setStarredFilter] = React.useState<boolean>(false);

  // New project form state
  const [newProject, setNewProject] = React.useState({
    name: "",
    description: "",
    startDate: new Date(),
    dueDate: addDays(new Date(), 30),
    status: "Not Started",
    priority: "Medium",
    group: "",
  });

  // Filter projects based on search query and filters
  const filteredProjects = React.useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.group.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;

      // Priority filter
      const matchesPriority =
        priorityFilter === "all" || project.priority === priorityFilter;

      // Group filter
      const matchesGroup =
        groupFilter === "all" || project.group === groupFilter;

      // Starred filter
      const matchesStarred = !starredFilter || project.starred;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesGroup &&
        matchesStarred
      );
    });
  }, [searchQuery, statusFilter, priorityFilter, groupFilter, starredFilter]);

  // Sort filtered projects
  const sortedProjects = React.useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "dueDate":
          return a.dueDate.getTime() - b.dueDate.getTime();
        case "startDate":
          return a.startDate.getTime() - b.startDate.getTime();
        case "priority":
          const priorityOrder = { High: 0, Medium: 1, Low: 2 };
          return (
            priorityOrder[a.priority as keyof typeof priorityOrder] -
            priorityOrder[b.priority as keyof typeof priorityOrder]
          );
        case "progress":
          return b.progress - a.progress;
        default:
          return 0;
      }
    });
  }, [filteredProjects, sortBy]);

  const handleProjectClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setIsProjectDialogOpen(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setGroupFilter("all");
    setStarredFilter(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "bg-muted text-muted-foreground";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "On Hold":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
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

  const getDaysRemaining = (dueDate: Date) => {
    const today = new Date();
    const days = differenceInDays(dueDate, today);
    return days;
  };

  const getDaysRemainingText = (dueDate: Date) => {
    const days = getDaysRemaining(dueDate);
    if (days < 0) {
      return `${Math.abs(days)} days overdue`;
    } else if (days === 0) {
      return "Due today";
    } else if (days === 1) {
      return "Due tomorrow";
    } else {
      return `${days} days remaining`;
    }
  };

  const getDaysRemainingColor = (dueDate: Date) => {
    const days = getDaysRemaining(dueDate);
    if (days < 0) {
      return "text-destructive";
    } else if (days <= 3) {
      return "text-amber-600 dark:text-amber-400";
    } else {
      return "text-muted-foreground";
    }
  };

  const handleCreateProject = () => {
    // In a real app, this would send data to the server
    console.log("Creating new project:", newProject);
    setIsNewProjectDialogOpen(false);
    // Reset form
    setNewProject({
      name: "",
      description: "",
      startDate: new Date(),
      dueDate: addDays(new Date(), 30),
      status: "Not Started",
      priority: "Medium",
      group: "",
    });
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
              placeholder="Search projects..."
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
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                  <SelectItem value="Executive Team">Executive Team</SelectItem>
                  <SelectItem value="Operations Team">
                    Operations Team
                  </SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setStarredFilter(!starredFilter)}
              >
                <div className="flex items-center">
                  <div
                    className={`mr-2 h-4 w-4 rounded-sm border ${
                      starredFilter
                        ? "bg-primary border-primary"
                        : "border-input"
                    } flex items-center justify-center`}
                  >
                    {starredFilter && (
                      <CheckCircle className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>
                  <span>Starred projects only</span>
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
              <DropdownMenuItem onClick={() => setSortBy("dueDate")}>
                Due Date {sortBy === "dueDate" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("startDate")}>
                Start Date {sortBy === "startDate" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("priority")}>
                Priority {sortBy === "priority" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("progress")}>
                Progress {sortBy === "progress" && "✓"}
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
          <Button onClick={() => setIsNewProjectDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {(searchQuery ||
        statusFilter !== "all" ||
        priorityFilter !== "all" ||
        groupFilter !== "all" ||
        starredFilter) && (
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
          {starredFilter && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Starred only
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => setStarredFilter(false)}
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

      {/* Project Count */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "Project" : "Projects"}
        </h2>
        {filteredProjects.length !== projects.length && (
          <p className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        )}
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProjects.length > 0 ? (
            sortedProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <div>
                        <CardTitle className="flex items-center">
                          {project.name}
                          {project.starred && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Star className="ml-2 h-4 w-4 fill-amber-400 text-amber-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Starred Project</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {project.description}
                        </CardDescription>
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
                        <DropdownMenuItem
                          onClick={() => handleProjectClick(project)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Tasks</DropdownMenuItem>
                        <DropdownMenuItem>
                          {project.starred ? (
                            <>
                              <Star className="mr-2 h-4 w-4" />
                              Remove Star
                            </>
                          ) : (
                            <>
                              <Star className="mr-2 h-4 w-4" />
                              Star Project
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pb-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={cn(getStatusColor(project.status))}>
                      {project.status}
                    </Badge>
                    <Badge className={cn(getPriorityColor(project.priority))}>
                      {project.priority} Priority
                    </Badge>
                    <Badge variant="outline">{project.group}</Badge>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Progress</div>
                      <div className="text-sm text-muted-foreground">
                        {project.progress}%
                      </div>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {format(project.startDate, "MMM d")} -{" "}
                        {format(project.dueDate, "MMM d, yyyy")}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "flex items-center",
                        getDaysRemainingColor(project.dueDate)
                      )}
                    >
                      {getDaysRemaining(project.dueDate) < 0 ? (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      )}
                      <span>{getDaysRemainingText(project.dueDate)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage
                        src={project.owner.avatar}
                        alt={project.owner.name}
                      />
                      <AvatarFallback>{project.owner.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {project.owner.name}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleProjectClick(project)}
                  >
                    View Project
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No projects match your current filters. Try adjusting your
                search or filters.
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
          {sortedProjects.length > 0 ? (
            sortedProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center">
                          {project.name}
                          {project.starred && (
                            <Star className="ml-2 h-4 w-4 fill-amber-400 text-amber-400" />
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {project.description}
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
                            onClick={() => handleProjectClick(project)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Tasks</DropdownMenuItem>
                          <DropdownMenuItem>
                            {project.starred ? (
                              <>
                                <Star className="mr-2 h-4 w-4" />
                                Remove Star
                              </>
                            ) : (
                              <>
                                <Star className="mr-2 h-4 w-4" />
                                Star Project
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge className={cn(getStatusColor(project.status))}>
                        {project.status}
                      </Badge>
                      <Badge className={cn(getPriorityColor(project.priority))}>
                        {project.priority} Priority
                      </Badge>
                      <Badge variant="outline">{project.group}</Badge>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">
                          Progress ({project.progress}%)
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {project.completedTasks}/{project.taskCount} tasks
                          completed
                        </div>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {format(project.startDate, "MMM d")} -{" "}
                          {format(project.dueDate, "MMM d, yyyy")}
                        </span>
                      </div>
                      <div
                        className={cn(
                          "flex items-center",
                          getDaysRemainingColor(project.dueDate)
                        )}
                      >
                        {getDaysRemaining(project.dueDate) < 0 ? (
                          <ArrowDownRight className="mr-1 h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="mr-1 h-4 w-4" />
                        )}
                        <span>{getDaysRemainingText(project.dueDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {project.members.length} members
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t md:border-t-0 md:border-l p-6 md:w-64 flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-sm mb-2">
                        Key Milestones
                      </h4>
                      <div className="space-y-2">
                        {project.milestones.slice(0, 3).map((milestone) => (
                          <div key={milestone.id} className="flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full mr-2 ${
                                milestone.completed
                                  ? "bg-green-500"
                                  : "bg-muted"
                              }`}
                            />
                            <span className="text-sm truncate">
                              {milestone.name}
                            </span>
                          </div>
                        ))}
                        {project.milestones.length > 3 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs mt-1"
                          >
                            View all {project.milestones.length} milestones
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex items-center mb-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage
                            src={project.owner.avatar}
                            alt={project.owner.name}
                          />
                          <AvatarFallback>
                            {project.owner.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          Owner: {project.owner.name}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProjectClick(project)}
                      >
                        View Project
                      </Button>
                      <Button variant="outline" size="sm">
                        <Layers className="mr-2 h-4 w-4" />
                        View Tasks
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No projects match your current filters. Try adjusting your
                search or filters.
              </p>
              <Button className="mt-4" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Project Detail Dialog */}
      {selectedProject && (
        <Dialog
          open={isProjectDialogOpen}
          onOpenChange={setIsProjectDialogOpen}
        >
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {selectedProject.name}
                {selectedProject.starred && (
                  <Star className="ml-2 h-4 w-4 fill-amber-400 text-amber-400" />
                )}
              </DialogTitle>
              <DialogDescription>
                {selectedProject.description}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Status</h3>
                    <Badge
                      className={cn(
                        getStatusColor(selectedProject.status),
                        "w-fit"
                      )}
                    >
                      {selectedProject.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Priority</h3>
                    <Badge
                      className={cn(
                        getPriorityColor(selectedProject.priority),
                        "w-fit"
                      )}
                    >
                      {selectedProject.priority} Priority
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Start Date</h3>
                    <p className="text-sm">
                      {format(selectedProject.startDate, "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Due Date</h3>
                    <p className="text-sm flex items-center">
                      {format(selectedProject.dueDate, "MMMM d, yyyy")}
                      <span
                        className={cn(
                          "ml-2 text-xs",
                          getDaysRemainingColor(selectedProject.dueDate)
                        )}
                      >
                        ({getDaysRemainingText(selectedProject.dueDate)})
                      </span>
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Progress</h3>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-muted-foreground">
                      {selectedProject.completedTasks}/
                      {selectedProject.taskCount} tasks completed
                    </div>
                    <div className="text-sm font-medium">
                      {selectedProject.progress}%
                    </div>
                  </div>
                  <Progress value={selectedProject.progress} className="h-2" />
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Team Members</h3>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Member
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {selectedProject.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
                            <AvatarFallback>{member.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.role}
                            </p>
                          </div>
                        </div>
                        {member.role !== "Owner" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Recent Activity</h3>
                  <div className="space-y-3">
                    {selectedProject.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start">
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
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Project Tasks ({selectedProject.taskCount})
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
                      {selectedProject.completedTasks}/
                      {selectedProject.taskCount} completed
                    </div>
                  </div>
                  <Progress
                    value={
                      (selectedProject.completedTasks /
                        selectedProject.taskCount) *
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

              <TabsContent value="timeline" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Project Timeline</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Project Duration</div>
                    <div className="text-sm text-muted-foreground">
                      {format(selectedProject.startDate, "MMM d, yyyy")} -{" "}
                      {format(selectedProject.dueDate, "MMM d, yyyy")}
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-muted rounded-full">
                      <div
                        className="absolute top-0 left-0 h-1 bg-primary rounded-full"
                        style={{
                          width: `${selectedProject.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 mt-6">
                    <h4 className="text-sm font-medium">Milestones</h4>
                    <div className="space-y-4">
                      {selectedProject.milestones.map((milestone, index) => (
                        <div key={milestone.id} className="relative pl-6 pb-4">
                          <div
                            className={`absolute top-0 left-0 h-full w-px ${
                              index === selectedProject.milestones.length - 1
                                ? "h-6"
                                : ""
                            } ${
                              milestone.completed ? "bg-primary" : "bg-muted"
                            }`}
                          />
                          <div
                            className={`absolute top-0 left-0 w-5 h-5 rounded-full border-2 ${
                              milestone.completed
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted bg-background"
                            } flex items-center justify-center -translate-x-1/2`}
                          >
                            {milestone.completed && (
                              <CheckCircle className="h-3 w-3" />
                            )}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h5 className="text-sm font-medium">
                                {milestone.name}
                              </h5>
                              <p className="text-xs text-muted-foreground">
                                Due: {format(milestone.dueDate, "MMM d, yyyy")}
                              </p>
                            </div>
                            <Badge
                              variant={
                                milestone.completed ? "default" : "outline"
                              }
                              className="mt-1 sm:mt-0"
                            >
                              {milestone.completed ? "Completed" : "Pending"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Created by {selectedProject.owner.name}
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Project
                </Button>
                <Button variant="destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Project
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* New Project Dialog */}
      <Dialog
        open={isNewProjectDialogOpen}
        onOpenChange={setIsNewProjectDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Add a new project to your workspace. Fill in the details below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="Enter project name"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter project description"
                className="min-h-[100px]"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(newProject.startDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={newProject.startDate}
                      onSelect={(date) =>
                        date &&
                        setNewProject({ ...newProject, startDate: date })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(newProject.dueDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={newProject.dueDate}
                      onSelect={(date) =>
                        date && setNewProject({ ...newProject, dueDate: date })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newProject.status}
                  onValueChange={(value) =>
                    setNewProject({ ...newProject, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newProject.priority}
                  onValueChange={(value) =>
                    setNewProject({ ...newProject, priority: value })
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="group">Group/Team</Label>
              <Select
                value={newProject.group}
                onValueChange={(value) =>
                  setNewProject({ ...newProject, group: value })
                }
              >
                <SelectTrigger id="group">
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Marketing Team">Marketing Team</SelectItem>
                  <SelectItem value="Development Team">
                    Development Team
                  </SelectItem>
                  <SelectItem value="Design Team">Design Team</SelectItem>
                  <SelectItem value="Executive Team">Executive Team</SelectItem>
                  <SelectItem value="Operations Team">
                    Operations Team
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewProjectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={handleCreateProject}>
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
