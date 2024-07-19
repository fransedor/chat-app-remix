import ChatRoom from "./chat-room";

interface ChatContainerProps {
  chats: Record<string, string>[];
}
const ChatContainer = ({ chats }: ChatContainerProps) => {
  return (
    <div className="flex-1 overflow-auto self-start w-full">
      {chats.length > 0 ? (
        <div className="grid gap-2 p-4">
          {chats.map((chat, index) => (
            <ChatRoom roomId={index.toString()} key={index} />
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
