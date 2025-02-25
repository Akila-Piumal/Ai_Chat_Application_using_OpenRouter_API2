import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Markdown from "marked-react";

interface MessageBubbleProps {
  message: string;
  isAI?: boolean;
  timestamp?: string;
  isLoading?: boolean;
  avatarUrl?: string;
  image?: string;
}

const MessageBubble = ({
  message = "Hello, how can I help you today?",
  isAI = false,
  timestamp = new Date().toLocaleTimeString(),
  isLoading = false,
  avatarUrl = isAI
    ? "https://api.dicebear.com/7.x/bottts/svg?seed=gemini"
    : "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
  image,
}: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex gap-4 p-4 w-full bg-background",
        isAI ? "bg-muted/50" : "",
      )}
    >
      <Avatar className="h-8 w-8">
        <img src={avatarUrl} alt={isAI ? "AI Avatar" : "User Avatar"} />
      </Avatar>

      <div className="flex-1 space-y-2">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ) : (
          <div className="space-y-1">
            <p
              className={cn(
                "text-sm font-medium",
                isAI ? "text-primary" : "text-secondary-foreground",
              )}
            >
              {isAI ? "Gemini" : "You"}
            </p>
            <div className="space-y-2">
              {image && (
                <img
                  src={image}
                  alt="Uploaded content"
                  className="max-w-md rounded-lg shadow-sm"
                />
              )}
              <div className="text-sm text-foreground/90 prose dark:prose-invert max-w-none">
                <Markdown>{message.replace(/\n/g, "  \n")}</Markdown>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{timestamp}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
