import { Task } from "@/types";
import { create } from "zustand";

type ViewMode = "list" | "board";

type TaskStore = {
  tasks: Task[];
  viewMode: ViewMode;
  searchQuery: string;
  selectedTask: Task | null;
  isTaskDialogOpen: boolean;
  sortBy: "dueDate" | "priority" | "title";
  statusFilter: string;
  priorityFilter: string;
  groupFilter: string;

  // Actions
  setTasks: (tasks: Task[]) => void;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTask: (task: Task | null) => void;
  setIsTaskDialogOpen: (isOpen: boolean) => void;
  setSortBy: (sort: "dueDate" | "priority" | "title") => void;
  setStatusFilter: (status: string) => void;
  setPriorityFilter: (priority: string) => void;
  setGroupFilter: (group: string) => void;
  clearFilters: () => void;

  // Derived State
  filteredTasks: Task[];
  sortedTasks: Task[];
  filteredTasksByStatus: Record<
    "Not Started" | "In Progress" | "Completed",
    Task[]
  >;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  viewMode: "list",
  searchQuery: "",
  selectedTask: null,
  isTaskDialogOpen: false,
  sortBy: "dueDate",
  statusFilter: "all",
  priorityFilter: "all",
  groupFilter: "all",

  // Actions
  setTasks: (tasks) => set({ tasks }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  setIsTaskDialogOpen: (isOpen) => set({ isTaskDialogOpen: isOpen }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setPriorityFilter: (priority) => set({ priorityFilter: priority }),
  setGroupFilter: (group) => set({ groupFilter: group }),
  clearFilters: () =>
    set({
      searchQuery: "",
      statusFilter: "all",
      priorityFilter: "all",
      groupFilter: "all",
    }),

  // Derived State (Memoized)
  get filteredTasks() {
    const { tasks, searchQuery, statusFilter, priorityFilter, groupFilter } =
      get();
    return tasks.filter((task) => {
      const matchesSearch =
        searchQuery === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;
      const matchesGroup = groupFilter === "all" || task.group === groupFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesGroup;
    });
  },

  get sortedTasks() {
    const { filteredTasks, sortBy } = get();
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
  },

  get filteredTasksByStatus() {
    const { filteredTasks } = get();
    return {
      "Not Started": filteredTasks.filter(
        (task) => task.status === "Not Started"
      ),
      "In Progress": filteredTasks.filter(
        (task) => task.status === "In Progress"
      ),
      Completed: filteredTasks.filter((task) => task.status === "Completed"),
    };
  },
}));
