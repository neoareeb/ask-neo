"use client";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start message-fade-in">
      <div className="flex items-center gap-2 px-3 py-2 rounded-2xl center-grey text-gray-900 dark:text-white transition-all duration-300 ease-out">
        <div className="flex gap-1">
          <div
            className="w-2 h-2 rounded-full bg-primary typing-pulse transition-all duration-200 ease-out"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-primary typing-pulse transition-all duration-200 ease-out"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-primary typing-pulse transition-all duration-200 ease-out"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
