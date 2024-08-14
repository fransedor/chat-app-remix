import Sidebar from "@/components/component/sidebar";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import ChatSection from "~/components/ChatSection";
import ChatService from "~/service/chat.service";
import MessageService from "~/service/message.service";
import RoomService from "~/service/room.service";
import { getUserFromSession } from "~/utils/getUserFromSession";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { roomId } = params;
  const { userId, username } = await getUserFromSession(request);
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
      currentUsername: username,
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
        currentUsername: username,
      },
      { status: 500 }
    );
  }
};

export default function Index() {
  const { roomId } = useParams();

  const data = useLoaderData<typeof loader>();
  if (data.error !== null) {
    return <div>Something went wrong</div>;
  }

  const chattedUser = data.roomWithUsersData.users.find((user) => user.id !== data.currentUserId);

  return (
    <div className="grid h-screen w-full grid-cols-[400px_1fr] bg-background">
      <Sidebar chats={data.chats} currentUserId={data.currentUserId} currentUsername={data.currentUsername} />
      <ChatSection
        currentUserId={data.currentUserId}
        messages={data.messages}
        roomId={roomId!}
        chattedUsername={
          // Check if user chat with himself
          chattedUser ? chattedUser.username : data.currentUsername
        }
        currentUsername={data.currentUsername || ""}
      />
    </div>
  );
}
