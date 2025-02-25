import React, { useState } from "react";
import ChatHeader from "./chat/ChatHeader";
import MessageThread from "./chat/MessageThread";
import InputBar from "./chat/InputBar";
import { sendMessageToGemini } from "@/lib/chat";

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: string;
}

const OPENROUTER_API_KEY =
  "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";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Gemini. How can I assist you today?",
      isAI: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      const newUserMessage: Message = {
        id: Date.now().toString(),
        content: message,
        isAI: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, newUserMessage]);

      const response = await sendMessageToGemini(
        message,
        OPENROUTER_API_KEY,
        messages,
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isAI: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };
  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      <main className="flex-1 pt-16 pb-[92px] overflow-hidden">
        <MessageThread messages={messages} isLoading={isLoading} />
      </main>
      <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default Home;
