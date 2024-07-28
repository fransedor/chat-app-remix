import ChatContainer from "@/components/component/chat-container";
import { NewChatDialog } from "@/components/component/new-chat-dialog";
import Searchbar from "@/components/component/searchbar";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import LogOutButton from "~/components/LogOutButton";
import ChatService from "~/service/chat.service";
import { getUserIdFromSession } from "~/utils/getUserIdFromSession";
//import { useEffect, useState } from "react";
//import { io } from "socket.io-client";
//import LogOutButton from "~/components/LogOutButton";

//const socket = io("http://localhost:3000");

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserIdFromSession(request);
  if (userId === 0) {
    throw redirect("/login");
  }
  try {
    const chatList = await ChatService.getChatList(userId);
    return json({ chats: chatList });
  } catch (err) {
    return json({ error: (err as Error).message }, { status: 500 });
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
      <div className="flex flex-col border-r bg-background sticky top-0 left-0 max-h-screen">
        <div className="flex items-center justify-between border-b pr-2">
          <Searchbar />
          <NewChatDialog />
        </div>
        <ChatContainer chats={[]} />
				<LogOutButton />
      </div>
      <div className="flex items-center justify-center">
        <p className="text-primary">Select someone to chat with from the list on the left</p>
      </div>
      {/*<div className="flex flex-col max-h-screen">
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
      </div>*/}
    </div>
  );
}
