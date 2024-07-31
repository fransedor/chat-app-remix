import ChatHeader from "@/components/component/chat-header";
import ChatMessageContainer from "@/components/component/chat-message-container";
import NewMessage from "@/components/component/new-message";
import Sidebar from "@/components/component/sidebar";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ChatService from "~/service/chat.service";
import MessageService from "~/service/message.service";
import { getUserIdFromSession } from "~/utils/getUserIdFromSession";
//import { useEffect, useState } from "react";
//import { io } from "socket.io-client";
//import LogOutButton from "~/components/LogOutButton";

//const socket = io("http://localhost:3000");
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { roomId } = params;
  const userId = await getUserIdFromSession(request);
  if (userId === 0) {
    throw redirect("/login");
  }
  try {
    const chatList = await ChatService.getChatList(userId);
    const messages = await MessageService.getMessageOfRoom(roomId!);
    return json({ chats: chatList, messages, currentUserId: userId, error: null });
  } catch (err) {
    return json(
      { error: (err as Error).message, messages: null, chats: null, currentUserId: userId },
      { status: 500 }
    );
  }
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

  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <div className="grid h-screen w-full grid-cols-[400px_1fr] bg-background">
      <Sidebar chats={data.chats} currentUserId={data.currentUserId} />
      <div className="flex flex-col max-h-screen">
        <ChatHeader />
        <ChatMessageContainer messages={data.messages} currentUserId={data.currentUserId} />
        <NewMessage />
      </div>
    </div>
  );
}
