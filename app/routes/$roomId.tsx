import Sidebar from "@/components/component/sidebar";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ChatSection from "~/components/ChatSection";
import ChatService from "~/service/chat.service";
import MessageService from "~/service/message.service";
import RoomService from "~/service/room.service";
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
    const roomWithUsersData = await RoomService.getUsernamesByRoomId(roomId!);
    const messages = await MessageService.getMessageOfRoom(roomId!);
    return json({
      chats: chatList,
      messages,
      roomWithUsersData,
      currentUserId: userId,
      error: null,
    });
  } catch (err) {
    return json(
      {
        error: (err as Error).message,
        messages: null,
        roomWithUsersData: null,
        chats: null,
        currentUserId: userId,
      },
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
  if (data.error !== null) {
    return <div>Something went wrong</div>;
  }

  const chattedUser = data.roomWithUsersData.users.find((user) => user.id !== data.currentUserId);
  const currentUser = data.roomWithUsersData.users.find((user) => user.id === data.currentUserId);

  return (
    <div className="grid h-screen w-full grid-cols-[400px_1fr] bg-background">
      <Sidebar chats={data.chats} currentUserId={data.currentUserId} />
      <ChatSection
        currentUserId={data.currentUserId}
        messages={data.messages}
        chattedUsername={
          // Check if user chat with himself
          chattedUser ? chattedUser.username : data.roomWithUsersData.users[0].username
        }
        currentUsername={currentUser?.username || ""}
      />
    </div>
  );
}
