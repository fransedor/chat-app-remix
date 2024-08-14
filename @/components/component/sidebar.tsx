import Searchbar from "./searchbar";
import { NewChatDialog } from "./new-chat-dialog";
import ChatContainer from "./chat-container";
import { Chat } from "~/repository/models/chat";
import ProfileWrapper from "./profile-wrapper";

interface SidebarProps {
  chats: Chat[] | null;
  currentUserId: number;
}
const Sidebar = ({ chats, currentUserId }: SidebarProps) => {
  return (
    <div className="flex justify-between flex-col border-r bg-background sticky top-0 left-0 max-h-screen w-[400px]">
      <div>
        <div className="flex items-center justify-between border-b pr-2">
          <Searchbar />
          <NewChatDialog />
        </div>
        {chats && <ChatContainer chats={chats} currentUserId={currentUserId} />}
      </div>
      <ProfileWrapper username="test"/>
    </div>
  );
};

export default Sidebar;
