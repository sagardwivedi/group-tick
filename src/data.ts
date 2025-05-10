import { User, Conversation, Message } from "@/types";

// Sample current user data
export const currentUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  avatar: "/placeholder.svg?height=32&width=32",
  initials: "AJ",
  status: "online",
};

// Sample conversations data
export const conversations: Conversation[] = [
  {
    id: "conv-1",
    type: "direct",
    participants: [
      {
        id: "user-2",
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
        status: "online",
      },
    ],
    lastMessage: {
      id: "msg-1",
      sender: "user-2",
      content: "Can you review the website mockups?",
      timestamp: new Date(2023, 5, 15, 14, 30),
      status: "delivered",
    },
    pinned: true,
    unreadCount: 2,
  },
  {
    id: "conv-2",
    type: "group",
    name: "Marketing Team",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MT",
    participants: [
      {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
        status: "online",
      },
      {
        id: "user-2",
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
        status: "online",
      },
      {
        id: "user-3",
        name: "David Lee",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DL",
        status: "away",
      },
    ],
    lastMessage: {
      id: "msg-2",
      sender: "user-3",
      content: "I've updated the campaign timeline",
      timestamp: new Date(2023, 5, 15, 11, 45),
      status: "read",
    },
    pinned: false,
    unreadCount: 0,
  },
  {
    id: "conv-3",
    type: "direct",
    participants: [
      {
        id: "user-4",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
        status: "offline",
      },
    ],
    lastMessage: {
      id: "msg-3",
      sender: "user-1",
      content: "When will the API documentation be ready?",
      timestamp: new Date(2023, 5, 14, 16, 20),
      status: "read",
    },
    pinned: false,
    unreadCount: 0,
  },
  {
    id: "conv-4",
    type: "group",
    name: "Website Redesign",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "WR",
    participants: [
      {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
        status: "online",
      },
      {
        id: "user-2",
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
        status: "online",
      },
      {
        id: "user-5",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "EW",
        status: "online",
      },
      {
        id: "user-4",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
        status: "offline",
      },
    ],
    lastMessage: {
      id: "msg-4",
      sender: "user-5",
      content: "I've uploaded the new design assets to the shared folder",
      timestamp: new Date(2023, 5, 14, 10, 15),
      status: "read",
    },
    pinned: true,
    unreadCount: 0,
  },
  {
    id: "conv-5",
    type: "direct",
    participants: [
      {
        id: "user-5",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "EW",
        status: "online",
      },
    ],
    lastMessage: {
      id: "msg-5",
      sender: "user-5",
      content: "Do you have time for a quick call about the logo design?",
      timestamp: new Date(2023, 5, 13, 15, 30),
      status: "read",
    },
    pinned: false,
    unreadCount: 0,
  },
  {
    id: "conv-6",
    type: "group",
    name: "Project Managers",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "PM",
    participants: [
      {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
        status: "online",
      },
      {
        id: "user-6",
        name: "James Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JR",
        status: "away",
      },
      {
        id: "user-8",
        name: "Robert Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "RS",
        status: "offline",
      },
    ],
    lastMessage: {
      id: "msg-6",
      sender: "user-8",
      content: "Let's schedule the quarterly planning meeting",
      timestamp: new Date(2023, 5, 13, 9, 45),
      status: "read",
    },
    pinned: false,
    unreadCount: 0,
  },
];

// Sample messages for a conversation
export const sampleMessages: Message[] = [
  {
    id: "msg-101",
    sender: "user-2",
    content: "Hi Alex, how's the website redesign project going?",
    timestamp: new Date(2023, 5, 15, 14, 15),
    status: "read",
  },
  {
    id: "msg-102",
    sender: "user-1",
    content:
      "Hey Sarah! It's going well. We've completed the wireframes and are now working on the visual design.",
    timestamp: new Date(2023, 5, 15, 14, 18),
    status: "read",
  },
  {
    id: "msg-103",
    sender: "user-2",
    content:
      "That's great to hear! When do you think we can review the mockups?",
    timestamp: new Date(2023, 5, 15, 14, 22),
    status: "read",
  },
  {
    id: "msg-104",
    sender: "user-1",
    content:
      "I'm planning to have them ready by tomorrow afternoon. I'll share them in our project folder.",
    timestamp: new Date(2023, 5, 15, 14, 25),
    status: "read",
  },
  {
    id: "msg-105",
    sender: "user-2",
    content:
      "Perfect! I'll make sure to review them as soon as they're available.",
    timestamp: new Date(2023, 5, 15, 14, 27),
    status: "read",
  },
  {
    id: "msg-106",
    sender: "user-2",
    content:
      "Also, do you have the updated content for the homepage? The marketing team has been asking about it.",
    timestamp: new Date(2023, 5, 15, 14, 28),
    status: "read",
  },
  {
    id: "msg-107",
    sender: "user-2",
    content: "Can you review the website mockups?",
    timestamp: new Date(2023, 5, 15, 14, 30),
    status: "delivered",
  },
];

// Sample group messages
export const sampleGroupMessages: Message[] = [
  {
    id: "msg-201",
    sender: "user-1",
    content:
      "Hey team, I've created a new project board for the website redesign.",
    timestamp: new Date(2023, 5, 14, 9, 30),
    status: "read",
  },
  {
    id: "msg-202",
    sender: "user-2",
    content:
      "Thanks Alex! I've already added some tasks for the content review.",
    timestamp: new Date(2023, 5, 14, 9, 45),
    status: "read",
  },
  {
    id: "msg-203",
    sender: "user-5",
    content:
      "I'll be working on the design assets this week. Should have the first drafts ready by Wednesday.",
    timestamp: new Date(2023, 5, 14, 10, 0),
    status: "read",
  },
  {
    id: "msg-204",
    sender: "user-4",
    content:
      "I'll handle the backend integration once the designs are approved.",
    timestamp: new Date(2023, 5, 14, 10, 5),
    status: "read",
  },
  {
    id: "msg-205",
    sender: "user-1",
    content:
      "Sounds like a plan! Let's have a quick sync tomorrow morning to make sure we're all on the same page.",
    timestamp: new Date(2023, 5, 14, 10, 10),
    status: "read",
  },
  {
    id: "msg-206",
    sender: "user-5",
    content: "I've uploaded the new design assets to the shared folder",
    timestamp: new Date(2023, 5, 14, 10, 15),
    status: "read",
  },
];

// Sample tasks data
export const tasks = [
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
