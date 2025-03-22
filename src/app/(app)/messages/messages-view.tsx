"use client";

import { ConversationList } from "@/app/(app)/messages/ConversationList";
import {
  MessageHeader,
  MessageThread,
} from "@/app/(app)/messages/MessageThread";
import { NewMessageDialog } from "@/app/(app)/messages/NewMessageDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { conversations, currentUser, sampleMessages } from "@/data";
import { Conversation } from "@/types";
import { Check, Filter, MessageSquare, PenSquare, Search } from "lucide-react";
import { useMemo, useState } from "react";

export function MessagesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(conversations[0]);
  const [newMessageText, setNewMessageText] = useState("");
  const [isNewMessageDialogOpen, setIsNewMessageDialogOpen] = useState(false);
  const [showPinned, setShowPinned] = useState(false);
  const [showUnread, setShowUnread] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [messages, setMessages] = useState(sampleMessages);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessageText.trim() === "" || !selectedConversation) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: currentUser.id,
      content: newMessageText,
      timestamp: new Date(),
      status: "sent" as const,
    };

    setMessages([...messages, newMessage]);
    setNewMessageText("");
  };

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      // Search filter
      const participantNames =
        conversation.type === "direct"
          ? conversation.participants.map((p) => p.name.toLowerCase())
          : [
              conversation.name?.toLowerCase(),
              ...conversation.participants.map((p) => p.name.toLowerCase()),
            ];
  
      const matchesSearch =
        searchQuery === "" ||
        participantNames.some((name) =>
          name?.includes(searchQuery.toLowerCase())
        ) ||
        conversation.lastMessage?.content
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
  
      // Pinned filter
      const matchesPinned = !showPinned || conversation.pinned;
  
      // Unread filter
      const matchesUnread = !showUnread || conversation.unreadCount > 0;
  
      // Tab filter
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "direct" && conversation.type === "direct") ||
        (activeTab === "group" && conversation.type === "group");
  
      return matchesSearch && matchesPinned && matchesUnread && matchesTab;
    });
  }, [conversations, searchQuery, showPinned, showUnread, activeTab]);

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)] border rounded-md overflow-hidden">
      <div className="flex h-full">
        {/* Conversations Sidebar */}
        <div className="w-full sm:w-96 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="direct">Direct</TabsTrigger>
                  <TabsTrigger value="group">Groups</TabsTrigger>
                </TabsList>
              </Tabs>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter Messages</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setShowPinned(!showPinned)}>
                    <div className="flex items-center">
                      <div
                        className={`mr-2 h-4 w-4 rounded-sm border ${
                          showPinned
                            ? "bg-primary border-primary"
                            : "border-input"
                        } flex items-center justify-center`}
                      >
                        {showPinned && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <span>Pinned only</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowUnread(!showUnread)}>
                    <div className="flex items-center">
                      <div
                        className={`mr-2 h-4 w-4 rounded-sm border ${
                          showUnread
                            ? "bg-primary border-primary"
                            : "border-input"
                        } flex items-center justify-center`}
                      >
                        {showUnread && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <span>Unread only</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNewMessageDialogOpen(true)}
              >
                <PenSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ConversationList
            conversations={filteredConversations}
            selectedConversationId={selectedConversation?.id || null}
            onSelectConversation={setSelectedConversation}
          />
        </div>

        {/* Message Thread */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            <MessageHeader selectedConversation={selectedConversation} />
            <MessageThread
              messages={messages}
              currentUser={currentUser}
              newMessageText={newMessageText}
              onNewMessageTextChange={setNewMessageText}
              onSendMessage={handleSendMessage}
              participants={selectedConversation.participants || []}
            />
          </div>
        ) : (
          <div className="hidden sm:flex flex-1 flex-col items-center justify-center p-4 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No conversation selected</h3>
            <p className="text-muted-foreground mt-1 max-w-md">
              Select a conversation from the list or start a new one to begin
              messaging
            </p>
            <Button
              className="mt-4"
              onClick={() => setIsNewMessageDialogOpen(true)}
            >
              <PenSquare className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
        )}
      </div>

      <NewMessageDialog
        isOpen={isNewMessageDialogOpen}
        onOpenChange={setIsNewMessageDialogOpen}
      />
    </div>
  );
}
