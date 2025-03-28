import {
  internalMutation,
  mutation,
  query,
  QueryCtx,
} from "./_generated/server";
import { v, Validator } from "convex/values";
import { UserJSON } from "@clerk/backend";

const status: "online" | "away" | "offline" | "do_not_disturb" = "offline";

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> },
  async handler(ctx, { data }) {
    const userProfile = {
      clerk_id: data.id,
      display_name: `${data.first_name} ${data.last_name}`.trim(),
      avatar_url: data.image_url,
      initials:
        (data.first_name ? data.first_name[0] : "") +
        (data.last_name ? data.last_name[0] : ""),
      status: status,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };

    const existingUser = await getUserByClerkId(ctx, data.id);
    if (existingUser === null) {
      await ctx.db.insert("users", userProfile);
    } else {
      await ctx.db.patch(existingUser._id, userProfile);
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await getUserByClerkId(ctx, clerkUserId);
    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(`Can't delete user, Clerk ID not found: ${clerkUserId}`);
    }
  },
});

export const updateUserStatus = mutation({
  args: {
    status: v.union(
      v.literal("online"),
      v.literal("away"),
      v.literal("offline"),
      v.literal("do_not_disturb")
    ),
  },
  async handler(ctx, { status }) {
    const user = await getCurrentUserOrThrow(ctx);
    await ctx.db.patch(user._id, {
      status,
      last_active: Date.now(),
      updated_at: Date.now(),
    });
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("User not authenticated");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  return await getUserByClerkId(ctx, identity.subject);
}

async function getUserByClerkId(ctx: QueryCtx, clerkId: string) {
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerk_id", clerkId))
    .unique();
}
