import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";

interface InputBarProps {
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const InputBar = ({
  onSendMessage = () => {},
  isLoading = false,
  placeholder = "Type your message here...",
}: InputBarProps) => {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t bg-background p-4 flex gap-4 items-end fixed bottom-0 left-0 right-0"
    >
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-h-[60px] max-h-[180px] resize-none"
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!message.trim() || isLoading}
        className="h-[60px] w-[60px]"
      >
        <SendHorizontal className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default InputBar;
