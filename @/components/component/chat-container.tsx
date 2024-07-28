import { Chat } from "~/repository/models/chat";
import ChatRoom from "./chat-room";

interface ChatContainerProps {
  chats: Chat[];
  currentUserId: number;
}
const ChatContainer = ({ chats, currentUserId }: ChatContainerProps) => {
  return (
    <div className="flex-1 overflow-auto self-start w-full">
      {chats.length > 0 ? (
        <div className="grid gap-2 p-4">
          {chats.map((chat) => (
            <ChatRoom
              currentUserId={currentUserId}
              roomId={chat.room_id.toString()}
              {...chat}
              key={chat.room_id}
            />
          ))}
        </div>
      ) : (
        <div className="p-4 text-center w-full">
          <p className="text-foreground">Add new chat using the plus button above</p>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
