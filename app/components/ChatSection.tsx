import ChatHeader from "@/components/component/chat-header";
import ChatMessageContainer from "@/components/component/chat-message-container";
import NewMessage from "@/components/component/new-message";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Message } from "~/repository/models/message";

interface ChatSectionProps {
  chattedUsername: string;
  messages: Message[];
  currentUserId: string;
  currentUsername: string;
  roomId: string;
}
const socket = io("http://localhost:3000");

const ChatSection = ({
  chattedUsername,
  currentUserId,
  messages,
  currentUsername,
  roomId,
}: ChatSectionProps) => {
  const [messagesState, setMessagesState] = useState(messages);

  const handleSendNewMessage = async (message: string) => {
    const messageObj = {
      created_at: new Date().toISOString(),
      id: Math.ceil(Math.random() * Math.pow(2, 31)),
      media_url: "",
      room_id: roomId,
      text: message,
      user_id: currentUserId,
      username: currentUsername,
    };
    await fetch("/api/message", {
      body: JSON.stringify(messageObj),
      method: "POST",
    });
    socket.emit("message-client", {
      roomId,
      message: messageObj,
    });
    setMessagesState((prev) => [...prev, messageObj]);
  };

  useEffect(() => {
    socket.emit("joinRoom", roomId);
    socket.on("message-server", ({ message }) => {
      console.log("Received message: ", message);
      if (message.user_id !== currentUserId) {
        setMessagesState((prev) => [...prev, message]);
      }
    });
    return () => {
      socket.emit("leaveRoom", roomId);
      // Needed to prevent socket on message server run twice
      socket.off("message-server");
    };
  }, [roomId, currentUserId]);

  return (
    //<Form method="POST" action="/api/message" navigate={false}>
    <div className="flex flex-col h-screen">
      <ChatHeader chattedUsername={chattedUsername} />
      <ChatMessageContainer messages={messagesState} currentUserId={currentUserId} />
      <NewMessage onSend={handleSendNewMessage} />
    </div>
    //</Form>
  );
};

export default ChatSection;
