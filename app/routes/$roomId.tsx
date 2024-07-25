import ChatContainer from "@/components/component/chat-container";
import ChatHeader from "@/components/component/chat-header";
import ChatMessage from "@/components/component/chat-message";
import { NewChatDialog } from "@/components/component/new-chat-dialog";
import NewMessage from "@/components/component/new-message";
import Searchbar from "@/components/component/searchbar";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getUserIdFromSession } from "~/utils/getUserIdFromSession";
//import { useEffect, useState } from "react";
//import { io } from "socket.io-client";
//import LogOutButton from "~/components/LogOutButton";

//const socket = io("http://localhost:3000");
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const sessionId = await getUserIdFromSession(request);
  if (sessionId === 0) {
    throw redirect("/login");
  }
  return null;
};

export default function Index() {
  //const [messages, setMessages] = useState<string[]>([]);
  //const [message, setMessage] = useState("");

  //useEffect(() => {
  //  socket.on("message", (message) => {
  //    setMessages((prevMessages) => [...prevMessages, message]);
  //  });

  //  return () => {
  //    socket.off("message");
  //  };
  //}, []);

  //const sendMessage = () => {
  //  console.log("sending message");
  //  socket.emit("sendMessage", message);
  //  setMessage("");
  //};

  return (
    <div className="grid h-screen w-full grid-cols-[300px_1fr] bg-background">
      <div className="flex flex-col border-r bg-background sticky top-0 left-0 max-h-screen">
        <div className="flex items-center justify-between border-b pr-2">
          <Searchbar />
          <NewChatDialog />
        </div>
        <ChatContainer chats={[]} />
      </div>
      <div className="flex flex-col max-h-screen">
        <ChatHeader />
        <div className="flex-1 overflow-auto p-6">
          <div className="grid gap-4">
            <ChatMessage isUser={false} />
            <ChatMessage isUser />
            <ChatMessage isUser />
            <ChatMessage isUser />
            <ChatMessage isUser />
            <ChatMessage isUser />
            <ChatMessage isUser />
            <ChatMessage isUser />
          </div>
        </div>
        <NewMessage />
      </div>
    </div>
  );
}
