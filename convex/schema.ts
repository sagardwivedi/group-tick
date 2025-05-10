import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User Profiles
  users: defineTable({
    clerk_id: v.string(),
    display_name: v.string(),
    avatar_url: v.optional(v.string()),
    initials: v.optional(v.string()),
    bio: v.optional(v.string()),
    status: v.union(
      v.literal("online"),
      v.literal("away"),
      v.literal("offline"),
      v.literal("do_not_disturb")
    ),
    last_active: v.optional(v.number()),
    created_at: v.number(),
    updated_at: v.number(),
  })
    .index("by_clerk_id", ["clerk_id"])
    .index("by_status", ["status"]),

  // Teams
  teams: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    avatar_url: v.optional(v.string()),
    initials: v.optional(v.string()),
    creator_id: v.id("users"),
    created_at: v.number(),
    updated_at: v.number(),
  })
    .index("by_name", ["name"])
    .index("by_creator", ["creator_id"]),

  // Team Members
  team_members: defineTable({
    team_id: v.id("teams"),
    user_id: v.id("users"),
    role: v.union(v.literal("admin"), v.literal("member")),
    joined_at: v.number(),
  })
    .index("by_team", ["team_id"])
    .index("by_user", ["user_id"])
    .index("by_team_user", ["team_id", "user_id"]),

  // Projects
  projects: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    start_date: v.number(),
    due_date: v.number(),
    status: v.union(
      v.literal("not_started"),
      v.literal("in_progress"),
      v.literal("on_hold"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    progress: v.number(),
    starred: v.boolean(),
    team_id: v.optional(v.id("teams")),
    owner_id: v.id("users"),
    created_at: v.number(),
    updated_at: v.number(),
  })
    .index("by_team", ["team_id"])
    .index("by_owner", ["owner_id"])
    .index("by_status", ["status"])
    .index("by_due_date", ["due_date"]),

  // Tasks
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("not_started"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("on_hold"),
      v.literal("cancelled")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    due_date: v.optional(v.number()),
    start_date: v.optional(v.number()),
    completed_at: v.optional(v.number()),
    project_id: v.optional(v.id("projects")),
    team_id: v.optional(v.id("teams")),
    creator_id: v.id("users"),
    assignee_id: v.optional(v.id("users")),
    parent_task_id: v.optional(v.id("tasks")),
    created_at: v.number(),
    updated_at: v.number(),
  })
    .index("by_project", ["project_id"])
    .index("by_team", ["team_id"])
    .index("by_creator", ["creator_id"])
    .index("by_assignee", ["assignee_id"])
    .index("by_status", ["status"])
    .index("by_due_date", ["due_date"])
    .index("by_parent_task", ["parent_task_id"]),

  // Conversations
  conversations: defineTable({
    type: v.union(v.literal("direct"), v.literal("group")),
    name: v.optional(v.string()),
    avatar_url: v.optional(v.string()),
    initials: v.optional(v.string()),
    created_at: v.number(),
    updated_at: v.number(),
  }).index("by_type", ["type"]),

  // Conversation Participants
  conversation_participants: defineTable({
    conversation_id: v.id("conversations"),
    user_id: v.id("users"),
    role: v.union(v.literal("admin"), v.literal("member")),
    joined_at: v.number(),
  })
    .index("by_conversation", ["conversation_id"])
    .index("by_user", ["user_id"])
    .index("by_conversation_user", ["conversation_id", "user_id"]),

  // Messages
  messages: defineTable({
    conversation_id: v.id("conversations"),
    sender_id: v.id("users"),
    content: v.string(),
    status: v.union(
      v.literal("sent"),
      v.literal("delivered"),
      v.literal("read")
    ),
    created_at: v.number(),
    updated_at: v.number(),
  })
    .index("by_conversation", ["conversation_id"])
    .index("by_sender", ["sender_id"])
    .index("by_created_at", ["created_at"]),

  // Message Reads
  message_reads: defineTable({
    message_id: v.id("messages"),
    user_id: v.id("users"),
    read_at: v.number(),
  })
    .index("by_message", ["message_id"])
    .index("by_user", ["user_id"])
    .index("by_message_user", ["message_id", "user_id"]),

  // Message Attachments
  message_attachments: defineTable({
    message_id: v.id("messages"),
    file_name: v.string(),
    file_size: v.number(),
    file_type: v.string(),
    file_url: v.string(),
    created_at: v.number(),
  }).index("by_message", ["message_id"]),
});
