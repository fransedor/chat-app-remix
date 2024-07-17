import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import PhoneIcon from "../icons/Phone";
import VideoIcon from "../icons/Video";
import MoveHorizontalIcon from "../icons/MoveHorizontal";

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between border-b bg-muted/40 px-6 py-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">John Doe</div>
          <div className="text-sm text-muted-foreground">Online</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <PhoneIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <VideoIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoveHorizontalIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
