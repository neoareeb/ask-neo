"use client";

import ChatSidebar from "@/components/chat-sidebar";
import ThemeToggle from "@/components/theme-toggle";
import { Edit3, MoreVertical, Search, Star, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!openMenuId) return;

      const activeMenu = menuRefs.current[openMenuId];
      if (!activeMenu) return;

      if (!activeMenu.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const registerMenuRef = useCallback((chatId: string, element: HTMLDivElement | null) => {
    if (element) {
      menuRefs.current[chatId] = element;
    } else {
      delete menuRefs.current[chatId];
    }
  }, []);
  const [chatHistory] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "Unified Energy Interface",
      lastMessage: "Last message 1 month ago",
      timestamp: new Date("2024-01-15T10:30:00"),
    },
    {
      id: "2",
      title: "SolShare Peer-to-Peer Energy Network",
      lastMessage: "Last message 2 months ago",
      timestamp: new Date("2024-01-14T15:45:00"),
    },
  ]);

  const filteredChats = chatHistory.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-white dark:bg-black">
      <ChatSidebar />
      <div className="flex-1 flex flex-col overflow-hidden center-grey relative">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        <div className="flex-1 flex items-center justify-center p-8 overflow-visible">
          <div className="max-w-2xl w-full text-center animate-fade-in-up">
            <div className="mb-8 animate-fade-in-up-delayed">
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Chat History
              </p>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Search your conversations.
              </h1>
            </div>

            <div className="relative mb-6 animate-fade-in-up-delayed-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search your chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-20 py-3 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-out"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="bg-gray-100 dark:bg-white/20 px-2 py-1 rounded-full text-xs text-gray-600 dark:text-white border border-gray-200 dark:border-white/30 font-medium">
                  {filteredChats.length} / {chatHistory.length}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {filteredChats.map((chat, index) => (
                <div
                  key={chat.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 cursor-pointer relative hover:border-primary transition-all duration-300 ease-out animate-fade-in-up overflow-visible"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {chat.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {chat.lastMessage}
                      </p>
                    </div>

                    <div
                      className="relative"
                      ref={(element) => registerMenuRef(chat.id, element)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === chat.id ? null : chat.id,
                          );
                        }}
                        className="p-2 rounded-lg transition-colors opacity-100 cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </button>

                      {openMenuId === chat.id && (
                        <div className="dropdown-menu absolute right-0 top-full mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 py-2 z-20 min-w-[160px] animate-fade-in-up">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-900 dark:text-white transition-colors hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <Edit3 className="w-4 h-4 transition-colors" />
                            <span className="transition-colors">Edit</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-900 dark:text-white transition-colors hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <Star className="w-4 h-4 transition-colors" />
                            <span className="transition-colors">Star</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:text-red-700 transition-colors group hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4 text-red-500 group-hover:text-red-600 transition-colors" />
                            <span className="text-red-600 group-hover:text-red-700 transition-colors">
                              Delete
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
