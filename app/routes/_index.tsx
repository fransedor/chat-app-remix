import { ChatLayout } from "@/components/component/chat-layout";
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
    <ChatLayout />
  );
}
