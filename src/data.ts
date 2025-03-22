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
