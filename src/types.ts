export interface User {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  status: "online" | "away" | "offline";
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

export interface Conversation {
  id: string;
  type: "direct" | "group";
  participants: User[];
  lastMessage: Message;
  pinned: boolean;
  unreadCount: number;
  name?: string; // Only for group conversations
  avatar?: string; // Only for group conversations
  initials?: string; // Only for group conversations
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: "High" | "Medium" | "Low";
  status: "Not Started" | "In Progress" | "Completed";
  group: string;
  tags: string[];
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  };
}

export type ViewMode = "list" | "board";
export type SortBy = "dueDate" | "priority" | "title";
