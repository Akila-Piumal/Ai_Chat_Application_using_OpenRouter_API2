import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatHeaderProps {
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  title?: string;
}

const ChatHeader = ({
  isDarkMode = false,
  onThemeToggle = () => {},
  title = "Chat with Gemini",
}: ChatHeaderProps) => {
  return (
    <header className="w-full h-16 border-b bg-background flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-10">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="h-9 w-9"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle theme</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  );
};

export default ChatHeader;
