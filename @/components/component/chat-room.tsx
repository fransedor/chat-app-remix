import { Chat } from "~/repository/models/chat";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import dayjs from "dayjs";

interface ChatRoomProps extends Chat {
  roomId: string;
	currentUserId: number;
}
const ChatRoom = ({
  roomId,
  currentUserId,
  user_id_1,
  user_id_2,
  username_1,
  username_2,
  last_message,
  last_message_timestamp,
}: ChatRoomProps) => {
  const getChatUsername = () => {
    // Self chat
    if (currentUserId === user_id_1 && currentUserId === user_id_2) {
      return username_1;
    } else if (currentUserId === user_id_1) {
      return username_2;
    } else {
      return username_1;
    }
  };
  
  const getLastMessageTimestamp = () => {
    const timestampAsDayJs = dayjs(last_message_timestamp);
    // Is Today
    if (timestampAsDayJs.isSame(dayjs())) {
      return timestampAsDayJs.format("HH:mm")
      // Is yesterday
    } else if (timestampAsDayJs.isSame(dayjs().subtract(1, 'day'))) {
      return "Yesterday"
    } else {
      return timestampAsDayJs.format("DD/MM/YYYY");
    }
  }
  return (
    <a
      href={`/${roomId}`}
      className="flex items-start gap-3 rounded-lg bg-muted/50 px-4 py-4 min-w-0 transition-colors hover:bg-muted"
    >
      <Avatar className="h-10 w-10 border">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="flex-1 overflow-hidden">
        <div className="font-medium truncate">{getChatUsername()}</div>
        <div className="text-sm text-muted-foreground truncate">{last_message}</div>
      </div>
      <div className="text-xs text-muted-foreground">{getLastMessageTimestamp()}</div>
    </a>
  );
};

export default ChatRoom;
