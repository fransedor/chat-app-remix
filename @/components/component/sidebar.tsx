import React from "react";
import Searchbar from "./searchbar";
import { NewChatDialog } from "./new-chat-dialog";
import ChatContainer from "./chat-container";
import LogOutButton from "~/components/LogOutButton";

interface SidebarProps {
  chats: Chat[] | null;
  currentUserId: number;
}
const Sidebar = ({ chats, currentUserId }: SidebarProps) => {
  return (
    <div className="flex flex-col border-r bg-background sticky top-0 left-0 max-h-screen">
      <div className="flex items-center justify-between border-b pr-2">
        <Searchbar />
        <NewChatDialog />
      </div>
      {chats && <ChatContainer chats={chats} currentUserId={currentUserId} />}
      <LogOutButton />
    </div>
  );
};

export default Sidebar;
