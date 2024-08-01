import ChatHeader from "@/components/component/chat-header";
import ChatMessageContainer from "@/components/component/chat-message-container";
import NewMessage from "@/components/component/new-message";
import { useState } from "react";
import { Message } from "~/repository/models/message";

interface ChatSectionProps {
  chattedUsername: string;
  messages: Message[];
  currentUserId: string;
  currentUsername: string;
}
const ChatSection = ({ chattedUsername, currentUserId, messages, currentUsername }: ChatSectionProps) => {
  const [messagesState, setMessagesState] = useState(messages);

  const handleSendNewMessage = (message: string) => {
    setMessagesState(prev => [...prev, {
      created_at: new Date().toISOString(),
      id: Math.random() * Math.pow(2, 31),
      media_url: "",
      room_id: 123,
      text: message,
      user_id: BigInt(currentUserId),
      username: currentUsername
    }])
  }

  return (
    <div className="flex flex-col max-h-screen">
      <ChatHeader chattedUsername={chattedUsername} />
      <ChatMessageContainer messages={messagesState} currentUserId={currentUserId} />
      <NewMessage onSend={handleSendNewMessage} />
    </div>
  );
};

export default ChatSection;
