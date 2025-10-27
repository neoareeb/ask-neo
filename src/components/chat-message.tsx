"use client";

import { Copy, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = message.role === "user";

  return (
    <div
      className={`message-fade-in ${isUser ? "flex justify-end" : "flex justify-start"}`}
    >
      <div
        className={`flex flex-col gap-2 max-w-xs transition-all duration-300 ease-out ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-3 py-2 rounded-2xl transition-all duration-300 ease-out ${
            isUser
              ? "bg-primary text-white"
              : "bg-gray-50 center-grey text-gray-900 dark:text-white"
          }`}
        >
          <p
            className={`text-sm leading-relaxed transition-colors duration-200 ${
              isUser ? "text-white" : "text-gray-900 dark:text-white"
            }`}
          >
            {message.content}
          </p>
        </div>

        {!isUser && (
          <div className="flex items-center gap-1 px-2 opacity-0 hover:opacity-100 transition-all duration-300 ease-out group">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded transition-all duration-200 ease-out cursor-pointer"
              title="Copy message"
            >
              <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-200" />
            </button>
            <button
              className="p-1.5 rounded transition-all duration-200 ease-out cursor-pointer"
              title="Regenerate response"
            >
              <RotateCcw className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-200" />
            </button>
            <button
              className="p-1.5 rounded transition-all duration-200 ease-out cursor-pointer"
              title="Delete message"
            >
              <Trash2 className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-200" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
