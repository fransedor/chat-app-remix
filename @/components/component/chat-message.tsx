import { Message } from "~/repository/models/message";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import dayjs from "dayjs";

interface ChatMessageProps extends Message {
  isUser: boolean;
}
const ChatMessage = ({ isUser, text, created_at, username }: ChatMessageProps) => {
  return (
    <div className={`flex items-start ${isUser && "justify-end"}`}>
      <div className={`${isUser ? "flex-row-reverse" : "flex-row"} flex gap-4`}>
        <Avatar className="h-10 w-10 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div
          className={`grid gap-1 rounded-lg p-4 ${
            isUser ? "bg-primary text-primary-foreground" : "bg-muted/50"
          }`}
        >
          <div className="font-medium">{username}</div>
          <div>{text}</div>
          <div
            className={`text-xs ${isUser ? "text-primary-foreground" : "text-muted-foreground"}`}
          >
            {dayjs(created_at).format("HH:mm")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
