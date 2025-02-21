// Define the Group type
export interface Group {
	id: string;
	name: string;
	taskCount: number;
	lastActivity: string;
}

// Mock data for groups
export const mockGroups: Group[] = [
	{
		id: "1",
		name: "Project Alpha",
		taskCount: 5,
		lastActivity: "2 hours ago",
	},
	{
		id: "2",
		name: "Marketing Team",
		taskCount: 3,
		lastActivity: "1 day ago",
	},
	{
		id: "3",
		name: "Personal Todos",
		taskCount: 0,
		lastActivity: "Just now",
	},
];