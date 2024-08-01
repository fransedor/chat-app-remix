import Sidebar from "@/components/component/sidebar";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ChatService from "~/service/chat.service";
import { getUserIdFromSession } from "~/utils/getUserIdFromSession";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserIdFromSession(request);
  if (userId === 0) {
    throw redirect("/login");
  }
  try {
    const chatList = await ChatService.getChatList(userId);
    return json({ chats: chatList, currentUserId: userId, error: null });
  } catch (err) {
    return json(
      { error: (err as Error).message, chats: null, currentUserId: userId },
      { status: 500 }
    );
  }
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="grid h-screen w-full grid-cols-[400px_1fr] bg-background">
      <Sidebar chats={data.chats} currentUserId={data.currentUserId} />
      <div className="flex items-center justify-center">
        <p className="text-primary">Select someone to chat with from the list on the left</p>
      </div>
    </div>
  );
}
