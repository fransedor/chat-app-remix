import PaperclipIcon from "../icons/PaperClip";
import SendIcon from "../icons/Send";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface NewMessageProps {
  onSend: (message: string) => void;
}
const NewMessage = ({ onSend }: NewMessageProps) => {
  const [inputtedMessage, setInputtedMessage] = useState("");

  const handleSendNewMessage = () => {
    if (inputtedMessage) {
      onSend(inputtedMessage);
      setInputtedMessage("");
    }
  };

  return (
    <div className="sticky bottom-0 flex items-center gap-2 border-t bg-background px-6 py-4">
      <Textarea
        placeholder="Type your message..."
        className="flex-1 rounded-lg bg-muted px-4 py-2 text-sm"
        value={inputtedMessage}
        onChange={(e) => setInputtedMessage(e.target.value)}
        name="text"
      />
      <Button className="shrink-0" onClick={handleSendNewMessage}>
        <SendIcon className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <PaperclipIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NewMessage;
