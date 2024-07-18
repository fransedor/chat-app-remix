import ChatHeader from "@/components/component/chat-header";
import ChatMessage from "@/components/component/chat-message";
import ChatRoom from "@/components/component/chat-room";
import NewMessage from "@/components/component/new-message";
import Searchbar from "@/components/component/searchbar";
//import { useEffect, useState } from "react";
//import { io } from "socket.io-client";
//import LogOutButton from "~/components/LogOutButton";

//const socket = io("http://localhost:3000");

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
        <Searchbar />
        <div className="flex-1 overflow-auto self-start">
          <div className="grid gap-2 p-4">
            <ChatRoom roomId="2" />
          </div>
        </div>
      </div>
      <div className="flex flex-col max-h-screen">
        <ChatHeader />
        <div className="flex-1 overflow-auto p-6">
          <div className="grid gap-4">
            <ChatMessage isUser={false} />
            <ChatMessage isUser/>
            <ChatMessage isUser/>
            <ChatMessage isUser/>
            <ChatMessage isUser/>
            <ChatMessage isUser/>
            <ChatMessage isUser/>
            <ChatMessage isUser/>
          </div>
        </div>
        <NewMessage />
      </div>
    </div>
  );
}
