import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ChatMessageProps {
  isUser: boolean;
}
const ChatMessage = ({ isUser }: ChatMessageProps) => {
  return (
    <div className={`flex items-start  gap-4 ${isUser && "justify-end flex-row-reverse"}`}>
      <Avatar className="h-10 w-10 border">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div
        className={`grid gap-1 rounded-lg p-4 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted/50"
        }`}
      >
        <div className="font-medium">John Doe</div>
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. At tempore esse culpa! Dolorum
          corporis, dolores, molestiae est praesentium nesciunt illo culpa sint odit sit repellat
          eius, quos soluta a ex!
        </div>
        <div className={`text-xs ${isUser ? "text-primary-foreground" : "text-muted-foreground"}`}>
          2:39 PM
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
