"use client";

import ChatContainer from "@/components/chat-container";
import ChatInput from "@/components/chat-input";
import ChatSidebar from "@/components/chat-sidebar";
import LandingPage from "@/components/landing-page";
import ThemeToggle from "@/components/theme-toggle";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null!);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className="flex h-screen bg-white dark:bg-black">
      <ChatSidebar onNewChat={handleNewChat} />
      <div className="flex-1 flex flex-col overflow-hidden center-grey relative">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4 transition-all duration-500 ease-in-out">
            <div className="max-w-2xl w-full space-y-8">
              <div className="text-center">
                <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
                  Hey, Areeb, how may i help you?
                </h1>
              </div>

              <div className="w-full">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col transition-all duration-500 ease-in-out">
            <ChatContainer
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
            />
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
