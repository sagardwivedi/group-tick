"use client";

import * as React from "react";
import {
  addMonths,
  format,
  getDay,
  getDaysInMonth,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TaskDialog } from "../task-dialog";

// Get the current year and month
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth(); // 0 for January, 1 for February, etc.

const tasks = [
  {
    id: "task-1",
    title: "Update website content",
    description: "Update the landing page with new testimonials and features",
    date: new Date(currentYear, currentMonth, 15), // Current month, 15th day
    priority: "High",
    status: "In Progress",
    group: "Marketing Team",
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
    date: new Date(currentYear, currentMonth, 20), // Current month, 20th day
    priority: "Medium",
    status: "Not Started",
    group: "Executive Team",
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
    date: new Date(currentYear, currentMonth, 10), // Current month, 10th day
    priority: "High",
    status: "In Progress",
    group: "Development Team",
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
    date: new Date(currentYear, currentMonth, 18), // Current month, 18th day
    priority: "Medium",
    status: "In Progress",
    group: "Design Team",
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
    date: new Date(currentYear, currentMonth, 25), // Current month, 25th day
    priority: "Low",
    status: "Not Started",
    group: "Documentation Team",
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
    date: new Date(currentYear, currentMonth, 12), // Current month, 12th day
    priority: "Medium",
    status: "Not Started",
    group: "All Teams",
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
    date: new Date(currentYear, currentMonth, 22), // Current month, 22nd day
    priority: "High",
    status: "Not Started",
    group: "Marketing Team",
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
    date: new Date(currentYear, currentMonth, 8), // Current month, 8th day
    priority: "Medium",
    status: "Completed",
    group: "Development Team",
    assignee: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
  },
];

export function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTask, setSelectedTask] = React.useState<
    (typeof tasks)[0] | null
  >(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const monthStart = startOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = getDay(monthStart);

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => isSameDay(task.date, date));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTaskClick = (task: (typeof tasks)[0]) => {
    setSelectedTask(task);
    setIsTaskDialogOpen(true);
  };

  const renderCalendarDays = () => {
    const days = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Render days of week header
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={`header-${i}`}
          className="h-10 border-b text-center text-sm font-medium"
        >
          {daysOfWeek[i]}
        </div>
      );
    }

    // Fill in empty cells for days before the first of the month
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-28 border border-muted p-1 bg-muted/20"
        />
      );
    }

    // Fill in the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dayTasks = getTasksForDate(date);
      const isSelected = isSameDay(date, selectedDate);
      const isCurrent = isToday(date);

      days.push(
        <div
          key={`day-${day}`}
          className={cn(
            "h-28 border p-1 transition-colors hover:bg-muted/50 cursor-pointer",
            isSelected && "bg-muted",
            !isSameMonth(date, currentDate) && "text-muted-foreground"
          )}
          onClick={() => handleDateClick(date)}
        >
          <div className="flex justify-between">
            <span
              className={cn(
                "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm",
                isCurrent && "bg-primary text-primary-foreground font-medium"
              )}
            >
              {day}
            </span>
            {dayTasks.length > 0 && (
              <Badge variant="outline">{dayTasks.length}</Badge>
            )}
          </div>
          <ScrollArea className="h-20 w-full">
            <div className="space-y-1 pt-1">
              {dayTasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "text-xs rounded px-1 py-0.5 truncate cursor-pointer",
                    task.priority === "High"
                      ? "bg-destructive/10 text-destructive"
                      : task.priority === "Medium"
                      ? "bg-amber-500/10 text-amber-700"
                      : "bg-primary/10 text-primary"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTaskClick(task);
                  }}
                >
                  {task.title}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      );
    }

    // Fill in any remaining cells to complete the grid
    const totalCells = Math.ceil((daysInMonth + startDay) / 7) * 7;
    for (let i = daysInMonth + startDay; i < totalCells; i++) {
      days.push(
        <div
          key={`empty-end-${i}`}
          className="h-28 border border-muted p-1 bg-muted/20"
        />
      );
    }

    return days;
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="month" className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <h2 className="text-xl font-bold">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
          </div>
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="month" className="mt-4">
          <div className="grid grid-cols-7 gap-px">{renderCalendarDays()}</div>
        </TabsContent>

        <TabsContent value="week" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Week View</CardTitle>
              <CardDescription>
                Coming soon. This view will show a detailed week view of your
                tasks.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="day" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Day View</CardTitle>
              <CardDescription>
                Coming soon. This view will show a detailed day view of your
                tasks.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>
            Tasks for {format(selectedDate, "MMMM d, yyyy")}
          </CardTitle>
          <CardDescription>
            {isToday(selectedDate)
              ? "Today's tasks"
              : `Tasks scheduled for ${format(selectedDate, "EEEE")}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {getTasksForDate(selectedDate).length > 0 ? (
            <div className="space-y-4">
              {getTasksForDate(selectedDate).map((task) => (
                <div
                  key={task.id}
                  className="flex items-start space-x-4 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{task.title}</h4>
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
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                    <div className="flex items-center pt-2">
                      <Badge variant="outline" className="mr-2">
                        {task.group}
                      </Badge>
                      <Badge variant="outline">{task.status}</Badge>
                      <div className="ml-auto flex items-center">
                        <span className="text-xs text-muted-foreground mr-2">
                          Assigned to:
                        </span>
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                          />
                          <AvatarFallback>
                            {task.assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground mb-4">
                No tasks scheduled for this day
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Task
                <TaskDialog open={open} onOpenChange={setOpen} mode="create" />
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Task for{" "}
            {format(selectedDate, "MMM d")}
          </Button>
        </CardFooter>
      </Card>

      {selectedTask && (
        <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedTask.title}</DialogTitle>
              <DialogDescription>Task details and management</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedTask.description}
                </p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Due Date</h4>
                  <p className="text-sm">
                    {format(selectedTask.date, "MMMM d, yyyy")}
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Priority</h4>
                  <Badge
                    variant={
                      selectedTask.priority === "High"
                        ? "destructive"
                        : selectedTask.priority === "Medium"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedTask.priority}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Status</h4>
                  <Badge variant="outline">{selectedTask.status}</Badge>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Group</h4>
                  <Badge variant="outline">{selectedTask.group}</Badge>
                </div>
              </div>
              <Separator />
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Assigned To</h4>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={selectedTask.assignee.avatar}
                      alt={selectedTask.assignee.name}
                    />
                    <AvatarFallback>
                      {selectedTask.assignee.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{selectedTask.assignee.name}</span>
                </div>
              </div>
            </div>
            <DialogFooter className="flex space-x-2">
              <Button variant="outline" onClick={() => setOpen(true)}>
                Edit Task
              </Button>
              <TaskDialog
                open={open}
                onOpenChange={setOpen}
                mode="edit"
                task={selectedTask}
              />
              <Button
                variant={
                  selectedTask.status === "Completed" ? "outline" : "default"
                }
              >
                {selectedTask.status === "Completed"
                  ? "Mark Incomplete"
                  : "Mark Complete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
