"use client";

import type React from "react";
import ChatMessage from "./chat-message";
import TypingIndicator from "./typing-indicator";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function ChatContainer({
  messages,
  isLoading,
  messagesEndRef,
}: ChatContainerProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-white center-grey transition-all duration-300 ease-out">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className="message-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ChatMessage message={message} />
          </div>
        ))}
        {isLoading && (
          <div className="message-fade-in">
            <TypingIndicator />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
