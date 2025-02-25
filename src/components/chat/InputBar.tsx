import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, ImagePlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InputBarProps {
  onSendMessage?: (message: string, image?: File) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const InputBar = ({
  onSendMessage = () => {},
  isLoading = false,
  placeholder = "Type your message here...",
}: InputBarProps) => {
  const [message, setMessage] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || image) && !isLoading) {
      onSendMessage(message, image || undefined);
      setImage(null);
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
      <div className="relative">
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <Button
          type="button"
          variant={image ? "default" : "outline"}
          size="icon"
          className="h-[60px] w-[60px]"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImagePlus className="h-5 w-5" />
        </Button>
        {image && (
          <div className="absolute -top-12 left-0 bg-background border rounded-md p-2 flex items-center gap-2">
            <span className="text-sm truncate max-w-[100px]">{image.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
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
        disabled={(!message.trim() && !image) || isLoading}
        className="h-[60px] w-[60px]"
      >
        <SendHorizontal className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default InputBar;
