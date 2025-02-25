import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: string;
  image?: string;
}

interface MessageThreadProps {
  messages?: Message[];
  isLoading?: boolean;
}

const MessageThread = ({
  messages = [
    {
      id: "1",
      content: "Hello! How can I help you today?",
      isAI: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ],
  isLoading = false,
}: MessageThreadProps) => {
  return (
    <div className="h-full w-full bg-background border-y">
      <ScrollArea className="h-full w-full px-4">
        <div className="max-w-3xl mx-auto py-4 space-y-2">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MessageBubble
                  message={message.content}
                  isAI={message.isAI}
                  timestamp={message.timestamp}
                  image={message.image}
                />
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MessageBubble isAI={true} isLoading={true} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageThread;
