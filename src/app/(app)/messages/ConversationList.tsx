"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser } from "@/data";
import { cn } from "@/lib/utils";
import { Conversation } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Pin } from "lucide-react";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversation: Conversation) => void;
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="divide-y">
        {conversations.length > 0 ? (
          conversations.map((conversation) => {
            const details = getConversationDetails(conversation);
            return (
              <div
                key={conversation.id}
                className={cn(
                  "flex items-start p-3 gap-3 hover:bg-muted/50 cursor-pointer transition-colors",
                  selectedConversationId === conversation.id && "bg-muted"
                )}
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={details.avatar} alt={details.name} />
                    <AvatarFallback>{details.initials}</AvatarFallback>
                  </Avatar>
                  {details.status && (
                    <span
                      className={cn(
                        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                        details.status === "online"
                          ? "bg-green-500"
                          : details.status === "away"
                          ? "bg-amber-500"
                          : "bg-muted"
                      )}
                    />
                  )}
                  {conversation.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm truncate">
                      {details.name}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(conversation.lastMessage.timestamp, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground truncate">
                      {conversation.lastMessage.sender === currentUser.id ? (
                        <span className="flex items-center">
                          <span>You: </span>
                          <span className="truncate">
                            {conversation.lastMessage.content}
                          </span>
                        </span>
                      ) : (
                        conversation.lastMessage.content
                      )}
                    </p>
                    {conversation.pinned && (
                      <Pin className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center px-4">
            <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium">No conversations found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

// Helper function to get conversation details
export const getConversationDetails = (conversation: Conversation) => {
  if (conversation.type === "direct") {
    const participant = conversation.participants[0];
    return {
      name: participant.name,
      avatar: participant.avatar,
      initials: participant.initials,
      status: participant.status,
    };
  } else {
    return {
      name: conversation.name,
      avatar: conversation.avatar,
      initials: conversation.initials,
      status: null,
    };
  }
};
