"use client";

import { Input } from "@/components/ui/input";
import { ViewMode } from "@/types";
import {
  FilterIcon,
  GridIcon,
  ListIcon,
  Search,
  SortAscIcon,
} from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface FiltersToolbarProps {
  viewMode: ViewMode;
  searchQuery: string;
  onViewModeChange: () => void;
  onSearchChange: (value: string) => void;
}

export function FiltersToolbar({
  viewMode,
  searchQuery,
  onViewModeChange,
  onSearchChange,
}: FiltersToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <FilterIcon className="mr-2 h-4 w-4" />
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
              <SortAscIcon className="mr-2 h-4 w-4" />
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
        <Tabs value={viewMode} onValueChange={onViewModeChange}>
          <TabsList className="grid w-[160px] grid-cols-2">
            <TabsTrigger value="list">
              <ListIcon className="mr-2 h-4 w-4" />
              List
            </TabsTrigger>
            <TabsTrigger value="board">
              <GridIcon className="mr-2 h-4 w-4" />
              Board
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
