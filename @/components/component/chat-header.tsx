import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import PhoneIcon from "../icons/Phone";
import VideoIcon from "../icons/Video";
import MoveHorizontalIcon from "../icons/MoveHorizontal";
import ArrowLeftIcon from "../icons/ArrowLeft";

interface ChatHeaderProps {
  chattedUsername: string;
}
const ChatHeader = ({ chattedUsername }: ChatHeaderProps) => {
  return (
    <div className="flex sticky top-0 z-50 items-center justify-between border-b bg-muted px-6 py-4">
      <div className="flex items-center gap-3">
          <a href="/" className="flex">
            <ArrowLeftIcon className="text-muted-foreground" />
          </a>
        <Avatar className="h-10 w-10 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{chattedUsername}</div>
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
