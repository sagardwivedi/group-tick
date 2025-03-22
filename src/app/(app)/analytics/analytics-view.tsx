"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { format, subDays } from "date-fns";
import {
  Activity,
  AlertTriangle,
  BarChart2,
  CalendarIcon,
  CheckCircle,
  ChevronDown,
  Clock,
  FileText,
  Filter,
  Layers,
  TrendingDown,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";

// Sample data for charts and metrics
const taskCompletionData = [
  { name: "Mon", completed: 5, total: 8 },
  { name: "Tue", completed: 7, total: 10 },
  { name: "Wed", completed: 4, total: 6 },
  { name: "Thu", completed: 8, total: 12 },
  { name: "Fri", completed: 9, total: 11 },
  { name: "Sat", completed: 3, total: 5 },
  { name: "Sun", completed: 2, total: 3 },
];

const tasksByStatusData = [
  { name: "Completed", value: 45, color: "#10b981" },
  { name: "In Progress", value: 30, color: "#3b82f6" },
  { name: "Not Started", value: 15, color: "#6b7280" },
  { name: "Overdue", value: 10, color: "#ef4444" },
];

const tasksByPriorityData = [
  { name: "High", value: 25, color: "#ef4444" },
  { name: "Medium", value: 45, color: "#f59e0b" },
  { name: "Low", value: 30, color: "#10b981" },
];

const monthlyTasksData = [
  { name: "Jan", completed: 42, created: 50 },
  { name: "Feb", completed: 38, created: 45 },
  { name: "Mar", completed: 55, created: 60 },
  { name: "Apr", completed: 47, created: 52 },
  { name: "May", completed: 60, created: 65 },
  { name: "Jun", completed: 55, created: 58 },
  { name: "Jul", completed: 70, created: 75 },
  { name: "Aug", completed: 65, created: 68 },
  { name: "Sep", completed: 75, created: 80 },
  { name: "Oct", completed: 80, created: 85 },
  { name: "Nov", completed: 90, created: 92 },
  { name: "Dec", completed: 85, created: 88 },
];

const projectProgressData = [
  { name: "Website Redesign", progress: 45, dueDate: "2023-08-15" },
  { name: "Mobile App Development", progress: 30, dueDate: "2023-09-30" },
  { name: "Q3 Marketing Campaign", progress: 0, dueDate: "2023-09-30" },
  { name: "Product Feature Enhancement", progress: 60, dueDate: "2023-07-30" },
  { name: "Annual Report Preparation", progress: 0, dueDate: "2023-12-31" },
];

const teamPerformanceData = [
  {
    name: "Marketing Team",
    tasksCompleted: 45,
    tasksAssigned: 52,
    efficiency: 86,
  },
  {
    name: "Development Team",
    tasksCompleted: 65,
    tasksAssigned: 72,
    efficiency: 90,
  },
  {
    name: "Design Team",
    tasksCompleted: 28,
    tasksAssigned: 35,
    efficiency: 80,
  },
  {
    name: "Executive Team",
    tasksCompleted: 18,
    tasksAssigned: 24,
    efficiency: 75,
  },
  {
    name: "Operations Team",
    tasksCompleted: 32,
    tasksAssigned: 38,
    efficiency: 84,
  },
];

const topPerformersData = [
  {
    id: "user-1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AJ",
    tasksCompleted: 24,
    onTime: 22,
    efficiency: 92,
  },
  {
    id: "user-4",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MC",
    tasksCompleted: 20,
    onTime: 19,
    efficiency: 95,
  },
  {
    id: "user-2",
    name: "Sarah Miller",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SM",
    tasksCompleted: 18,
    onTime: 16,
    efficiency: 89,
  },
  {
    id: "user-5",
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "EW",
    tasksCompleted: 16,
    onTime: 15,
    efficiency: 94,
  },
  {
    id: "user-6",
    name: "James Rodriguez",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JR",
    tasksCompleted: 15,
    onTime: 13,
    efficiency: 87,
  },
];

const timeDistributionData = [
  { name: "Development", value: 35, color: "#3b82f6" },
  { name: "Meetings", value: 20, color: "#8b5cf6" },
  { name: "Planning", value: 15, color: "#f59e0b" },
  { name: "Research", value: 15, color: "#10b981" },
  { name: "Documentation", value: 10, color: "#6b7280" },
  { name: "Other", value: 5, color: "#9ca3af" },
];

const productivityByDayData = [
  { name: "Mon", productivity: 75 },
  { name: "Tue", productivity: 85 },
  { name: "Wed", productivity: 90 },
  { name: "Thu", productivity: 80 },
  { name: "Fri", productivity: 70 },
  { name: "Sat", productivity: 50 },
  { name: "Sun", productivity: 40 },
];

const recentActivityData = [
  {
    id: "activity-1",
    user: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SM",
    },
    action: "completed task",
    target: "Update website content",
    time: "2 hours ago",
  },
  {
    id: "activity-2",
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    action: "created project",
    target: "Mobile App Phase 2",
    time: "4 hours ago",
  },
  {
    id: "activity-3",
    user: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EW",
    },
    action: "completed milestone",
    target: "Design Phase",
    time: "1 day ago",
  },
  {
    id: "activity-4",
    user: {
      name: "James Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JR",
    },
    action: "assigned task",
    target: "API Integration",
    time: "1 day ago",
  },
  {
    id: "activity-5",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    action: "updated project",
    target: "Website Redesign",
    time: "2 days ago",
  },
];

// Custom tooltip for charts
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md shadow-sm p-2 text-xs">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function AnalyticsView() {
  const [dateRange, setDateRange] = React.useState<
    "7d" | "30d" | "90d" | "ytd" | "custom"
  >("30d");
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    subDays(new Date(), 30)
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = React.useState("overview");

  // Handle date range change
  const handleDateRangeChange = (
    range: "7d" | "30d" | "90d" | "ytd" | "custom"
  ) => {
    setDateRange(range);

    const today = new Date();

    switch (range) {
      case "7d":
        setStartDate(subDays(today, 7));
        setEndDate(today);
        break;
      case "30d":
        setStartDate(subDays(today, 30));
        setEndDate(today);
        break;
      case "90d":
        setStartDate(subDays(today, 90));
        setEndDate(today);
        break;
      case "ytd":
        setStartDate(new Date(today.getFullYear(), 0, 1));
        setEndDate(today);
        break;
      case "custom":
        // Keep current custom dates
        break;
    }
  };

  // Format date range for display
  const formatDateRange = () => {
    if (!startDate || !endDate) return "";

    return `${format(startDate, "MMM d, yyyy")} - ${format(
      endDate,
      "MMM d, yyyy"
    )}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full sm:w-auto">
            <TabsTrigger value="overview">
              <BarChart2 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tasks">
              <CheckCircle className="h-4 w-4 mr-2" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="projects">
              <Layers className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="time">
              <Clock className="h-4 w-4 mr-2" />
              Time
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Task Completion Rate
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +5.2% from last period
                    </span>
                  </div>
                  <Progress className="mt-3" value={78} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Projects
                  </CardTitle>
                  <Layers className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +2 from last period
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    5 on track, 5 at risk, 2 delayed
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Overdue Tasks
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <div className="flex items-center pt-1">
                    <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      -3 from last period
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    4 high priority, 3 medium, 1 low
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Team Efficiency
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +3.7% from last period
                    </span>
                  </div>
                  <Progress className="mt-3" value={85} />
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Task Completion Trend</CardTitle>
                  <CardDescription>
                    Daily task completion over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={taskCompletionData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar
                        dataKey="completed"
                        name="Completed"
                        fill="#3b82f6"
                      />
                      <Bar dataKey="total" name="Total" fill="#e5e7eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Tasks by Status</CardTitle>
                  <CardDescription>
                    Distribution of tasks by current status
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tasksByStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {tasksByStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Monthly Task Completion</CardTitle>
                  <CardDescription>
                    Tasks created vs completed by month
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyTasksData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="created"
                        name="Created"
                        stroke="#8b5cf6"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        name="Completed"
                        stroke="#10b981"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Time Distribution</CardTitle>
                  <CardDescription>
                    How time is spent across different activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={timeDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {timeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest actions across your workspace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentActivityData.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <Avatar className="h-9 w-9 mr-3">
                        <AvatarImage
                          src={activity.user.avatar}
                          alt={activity.user.name}
                        />
                        <AvatarFallback>
                          {activity.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          <span className="font-semibold">
                            {activity.user.name}
                          </span>{" "}
                          <span className="text-muted-foreground">
                            {activity.action}
                          </span>{" "}
                          <span className="font-medium">
                            "{activity.target}"
                          </span>
                        </p>
                        <div className="flex items-center pt-1">
                          <span className="text-xs text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            {/* Task Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Tasks
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">145</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +12 from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Tasks
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">113</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +15 from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Completion Time
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4 days</div>
                  <div className="flex items-center pt-1">
                    <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      -0.3 days from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    On-Time Completion Rate
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +3% from last period
                    </span>
                  </div>
                  <Progress className="mt-3" value={92} />
                </CardContent>
              </Card>
            </div>

            {/* Task Charts */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Tasks by Priority</CardTitle>
                  <CardDescription>
                    Distribution of tasks by priority level
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tasksByPriorityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {tasksByPriorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Productivity by Day</CardTitle>
                  <CardDescription>
                    Task completion efficiency by day of week
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={productivityByDayData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="productivity"
                        name="Productivity"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Task Table */}
            <Card>
              <CardHeader>
                <CardTitle>Task Performance by Category</CardTitle>
                <CardDescription>
                  Detailed breakdown of task metrics by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Total Tasks</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead>Avg. Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Development</TableCell>
                      <TableCell>42</TableCell>
                      <TableCell>35</TableCell>
                      <TableCell>83%</TableCell>
                      <TableCell>2.8 days</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Design</TableCell>
                      <TableCell>28</TableCell>
                      <TableCell>25</TableCell>
                      <TableCell>89%</TableCell>
                      <TableCell>1.9 days</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Marketing</TableCell>
                      <TableCell>35</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>86%</TableCell>
                      <TableCell>2.2 days</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Planning</TableCell>
                      <TableCell>18</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>83%</TableCell>
                      <TableCell>1.5 days</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Research</TableCell>
                      <TableCell>22</TableCell>
                      <TableCell>18</TableCell>
                      <TableCell>82%</TableCell>
                      <TableCell>3.1 days</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            {/* Project Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Projects
                  </CardTitle>
                  <Layers className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +2 from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Projects
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +3 from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Project Duration
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45 days</div>
                  <div className="flex items-center pt-1">
                    <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      -5 days from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    On-Budget Projects
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +5% from last period
                    </span>
                  </div>
                  <Progress className="mt-3" value={85} />
                </CardContent>
              </Card>
            </div>

            {/* Project Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>
                  Current status of active projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {projectProgressData.map((project) => (
                    <div key={project.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Due: {project.dueDate}
                          </p>
                        </div>
                        <Badge
                          variant={
                            project.progress === 0 ? "outline" : "default"
                          }
                        >
                          {project.progress === 0
                            ? "Not Started"
                            : `${project.progress}% Complete`}
                        </Badge>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Charts */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Project Status Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of projects by current status
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "On Track", value: 5, color: "#10b981" },
                          { name: "At Risk", value: 5, color: "#f59e0b" },
                          { name: "Delayed", value: 2, color: "#ef4444" },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {[
                          { name: "On Track", value: 5, color: "#10b981" },
                          { name: "At Risk", value: 5, color: "#f59e0b" },
                          { name: "Delayed", value: 2, color: "#ef4444" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Project Completion Trend</CardTitle>
                  <CardDescription>
                    Projects completed over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", completed: 1 },
                        { month: "Feb", completed: 0 },
                        { month: "Mar", completed: 2 },
                        { month: "Apr", completed: 1 },
                        { month: "May", completed: 0 },
                        { month: "Jun", completed: 1 },
                        { month: "Jul", completed: 2 },
                        { month: "Aug", completed: 1 },
                        { month: "Sep", completed: 0 },
                        { month: "Oct", completed: 0 },
                        { month: "Nov", completed: 0 },
                        { month: "Dec", completed: 0 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        name="Completed Projects"
                        stroke="#3b82f6"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            {/* Team Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Team Members
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +2 from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tasks Per Member
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">9.7</div>
                  <div className="flex items-center pt-1">
                    <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      -0.5 from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Response Time
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2 hrs</div>
                  <div className="flex items-center pt-1">
                    <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      -0.8 hrs from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Team Collaboration
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">High</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +12% interaction rate
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Efficiency metrics by team</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team</TableHead>
                      <TableHead>Tasks Completed</TableHead>
                      <TableHead>Tasks Assigned</TableHead>
                      <TableHead>Efficiency</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamPerformanceData.map((team) => (
                      <TableRow key={team.name}>
                        <TableCell className="font-medium">
                          {team.name}
                        </TableCell>
                        <TableCell>{team.tasksCompleted}</TableCell>
                        <TableCell>{team.tasksAssigned}</TableCell>
                        <TableCell>{team.efficiency}%</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              team.efficiency >= 90
                                ? "default"
                                : team.efficiency >= 80
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {team.efficiency >= 90
                              ? "Excellent"
                              : team.efficiency >= 80
                              ? "Good"
                              : "Needs Improvement"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Team members with highest productivity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {topPerformersData.map((performer) => (
                    <div key={performer.id} className="flex items-start">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage
                          src={performer.avatar}
                          alt={performer.name}
                        />
                        <AvatarFallback>{performer.initials}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            {performer.name}
                          </h4>
                          <Badge>{performer.efficiency}% Efficiency</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {performer.tasksCompleted} tasks completed (
                          {performer.onTime} on time)
                        </div>
                        <Progress
                          value={performer.efficiency}
                          className="h-1 mt-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Time Tab */}
          <TabsContent value="time" className="space-y-6">
            {/* Time Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Hours Tracked
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">487</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +42 from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Hours Per Day
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6.5</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +0.3 from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Most Productive Day
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Wednesday</div>
                  <div className="flex items-center pt-1">
                    <span className="text-xs text-muted-foreground">
                      90% productivity rate
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Time Utilization
                  </CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">
                      +3% from last period
                    </span>
                  </div>
                  <Progress className="mt-3" value={78} />
                </CardContent>
              </Card>
            </div>

            {/* Time Charts */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Time Distribution</CardTitle>
                  <CardDescription>
                    How time is spent across different activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={timeDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {timeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Productivity by Day</CardTitle>
                  <CardDescription>
                    Productivity levels throughout the week
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={productivityByDayData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="productivity"
                        name="Productivity %"
                        fill="#3b82f6"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Time Tracking Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Productivity Insights</CardTitle>
                <CardDescription>
                  Recommendations to improve time management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900">
                      <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        Schedule focused work blocks
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your data shows higher productivity during morning
                        hours. Consider scheduling complex tasks during this
                        time.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-amber-100 dark:bg-amber-900">
                      <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        Reduce meeting time
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        20% of tracked time is spent in meetings. Consider
                        implementing a no-meeting day each week.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-green-100 dark:bg-green-900">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        Batch similar tasks
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Context switching reduces productivity. Try grouping
                        similar tasks together for better focus.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange === "7d"
                  ? "Last 7 days"
                  : dateRange === "30d"
                  ? "Last 30 days"
                  : dateRange === "90d"
                  ? "Last 90 days"
                  : dateRange === "ytd"
                  ? "Year to date"
                  : formatDateRange()}
                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem onClick={() => handleDateRangeChange("7d")}>
                Last 7 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDateRangeChange("30d")}>
                Last 30 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDateRangeChange("90d")}>
                Last 90 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDateRangeChange("ytd")}>
                Year to date
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDateRangeChange("custom")}>
                Custom range
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {dateRange === "custom" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Select dates
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={startDate}
                  selected={{
                    from: startDate,
                    to: endDate,
                  }}
                  onSelect={(range) => {
                    setStartDate(range?.from);
                    setEndDate(range?.to);
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Analytics</DropdownMenuLabel>
              <DropdownMenuItem>By Team</DropdownMenuItem>
              <DropdownMenuItem>By Project</DropdownMenuItem>
              <DropdownMenuItem>By User</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Reset Filters</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
