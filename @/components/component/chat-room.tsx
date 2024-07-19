import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ChatRoomProps {
  roomId: string;
}
const ChatRoom = ({ roomId }: ChatRoomProps) => {
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
        <div className="font-medium truncate">John Doe</div>
        <div className="text-sm text-muted-foreground truncate">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores quam numquam, reiciendis
          enim voluptates necessitatibus eius totam libero repudiandae delectus accusantium illum
          porro, nostrum a corporis doloremque, inventore unde repellat?
        </div>
      </div>
      <div className="text-xs text-muted-foreground">2:39 PM</div>
    </a>
  );
};

export default ChatRoom;
