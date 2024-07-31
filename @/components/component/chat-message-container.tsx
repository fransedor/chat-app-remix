import { Message } from "~/repository/models/message";
import ChatMessage from "./chat-message";

interface ChatMessageContainerProps {
  messages: Message[] | null;
  currentUserId: string;
}
const ChatMessageContainer = ({ messages, currentUserId }: ChatMessageContainerProps) => {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="grid gap-4">
        {messages && messages.map((message) => (
          <ChatMessage key={message.id} {...message} isUser={currentUserId === message.user_id.toString()} />
        ))}
      </div>
    </div>
  );
};

export default ChatMessageContainer;
