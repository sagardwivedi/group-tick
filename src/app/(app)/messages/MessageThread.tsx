"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Message, User, Conversation } from "@/types";
import { format } from "date-fns";
import {
  Archive,
  Bell,
  Bookmark,
  CheckCheckIcon,
  CheckIcon,
  Image,
  Info,
  MoreHorizontal,
  Paperclip,
  Phone,
  Pin,
  Send,
  Smile,
  Trash,
  Video,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MessageThreadProps {
  messages: Message[];
  currentUser: User;
  newMessageText: string;
  participants: User[];
  onNewMessageTextChange: (text: string) => void;
  onSendMessage: () => void;
}

export function MessageThread({
  messages,
  currentUser,
  newMessageText,
  participants,
  onNewMessageTextChange,
  onSendMessage,
}: MessageThreadProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <>
      <ScrollArea className="flex-1 h-80 p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isCurrentUser = message.sender === currentUser.id;
            const sender = getSenderDetails(message.sender, participants);
            const showAvatar =
              messages.indexOf(message) === 0 ||
              messages[messages.indexOf(message) - 1].sender !== message.sender;

            return (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-3",
                  isCurrentUser ? "flex-row-reverse" : ""
                )}
              >
                {!isCurrentUser && showAvatar ? (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={sender?.avatar} alt={sender?.name} />
                    <AvatarFallback>{sender?.initials}</AvatarFallback>
                  </Avatar>
                ) : !isCurrentUser ? (
                  <div className="w-8" />
                ) : null}

                <div
                  className={cn(
                    "flex flex-col",
                    isCurrentUser ? "items-end" : "items-start"
                  )}
                >
                  {showAvatar && (
                    <span className="text-xs text-muted-foreground mb-1">
                      {isCurrentUser ? "You" : sender?.name}
                    </span>
                  )}
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 max-w-[70%]",
                      isCurrentUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <span>{format(message.timestamp, "h:mm a")}</span>
                    {isCurrentUser && (
                      <span className="ml-1">
                        {getMessageStatusIcon(message.status)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <Textarea
              placeholder="Type a message..."
              className="min-h-[80px] resize-none pr-10"
              value={newMessageText}
              onChange={(e) => onNewMessageTextChange(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Image className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button
            onClick={onSendMessage}
            disabled={newMessageText.trim() === ""}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

// Helper function to get sender details
const getSenderDetails = (senderId: string, participants: User[]) => {
  return participants.find((p) => p.id === senderId);
};

// Helper function to get message status icon
const getMessageStatusIcon = (status: string) => {
  switch (status) {
    case "sent":
      return <CheckIcon className="h-3 w-3 text-muted-foreground" />;
    case "delivered":
      return <CheckIcon className="h-3 w-3 text-muted-foreground" />;
    case "read":
      return <CheckCheckIcon className="h-3 w-3 text-primary" />;
    default:
      return null;
  }
};

// MessageHeader component
interface MessageHeaderProps {
  selectedConversation: Conversation;
}

export function MessageHeader({ selectedConversation }: MessageHeaderProps) {
  const details = getConversationDetails(selectedConversation);

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <Avatar className="h-9 w-9 mr-3">
          <AvatarImage src={details.avatar} alt={details.name} />
          <AvatarFallback>{details.initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium flex items-center">
            {details.name}
            {details.status && (
              <span
                className={cn(
                  "ml-2 text-xs",
                  details.status === "online"
                    ? "text-green-500"
                    : details.status === "away"
                    ? "text-amber-500"
                    : "text-muted-foreground"
                )}
              >
                • {details.status}
              </span>
            )}
          </h3>
          {selectedConversation.type === "group" && (
            <p className="text-xs text-muted-foreground">
              {selectedConversation.participants.length} members
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Video Call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Info</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Conversation Options</DropdownMenuLabel>
            <DropdownMenuItem>
              <Pin className="mr-2 h-4 w-4" />
              {selectedConversation.pinned
                ? "Unpin Conversation"
                : "Pin Conversation"}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Mute Notifications
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bookmark className="mr-2 h-4 w-4" />
              Save Messages
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Archive Conversation
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// Helper function to get conversation details
const getConversationDetails = (conversation: Conversation) => {
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
