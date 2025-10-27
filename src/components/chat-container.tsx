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
    <div className="flex-1 overflow-y-auto bg-white center-grey">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
