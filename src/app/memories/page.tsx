"use client";

import ChatSidebar from "@/components/chat-sidebar";
import ThemeToggle from "@/components/theme-toggle";
import { Brain, Edit3, MoreVertical, Search, Star, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Memory {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  type: "note" | "conversation" | "insight";
}

export default function MemoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [memories] = useState<Memory[]>([
    {
      id: "1",
      title: "Project Ideas Discussion",
      content:
        "Discussed potential AI projects including a chatbot, recommendation system, and data analysis tool.",
      createdAt: new Date("2024-01-15"),
      type: "conversation",
    },
    {
      id: "2",
      title: "React Best Practices",
      content:
        "Key points about React hooks, component structure, and performance optimization techniques.",
      createdAt: new Date("2024-01-14"),
      type: "note",
    },
    {
      id: "3",
      title: "User Experience Insights",
      content:
        "Users prefer clean interfaces with minimal distractions and clear call-to-action buttons.",
      createdAt: new Date("2024-01-13"),
      type: "insight",
    },
  ]);

  const filteredMemories = memories.filter(
    (memory) =>
      memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-white dark:bg-black">
      <ChatSidebar />
      <div className="flex-1 flex flex-col overflow-hidden center-grey relative">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Indexed Memories
              </p>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Search what you've heard.
              </h1>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search your memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-20 py-3 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="bg-gray-100 dark:bg-white/20 px-2 py-1 rounded-full text-xs text-gray-600 dark:text-white border border-gray-200 dark:border-white/30 font-medium">
                  {filteredMemories.length} / {memories.length}
                </div>
              </div>
            </div>
            {filteredMemories.length === 0 ? (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No memories found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "Start saving your conversations and insights"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMemories.map((memory) => (
                  <div
                    key={memory.id}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 cursor-pointer relative hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 text-left">
                        <div className="mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {memory.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {memory.createdAt.toLocaleDateString()}
                          </p>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                          {memory.content}
                        </p>
                      </div>

                      <div className="relative" ref={menuRef}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(
                              openMenuId === memory.id ? null : memory.id,
                            );
                          }}
                          className="p-2 rounded-lg transition-colors opacity-100 cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>

                        {openMenuId === memory.id && (
                          <div className="dropdown-menu absolute right-0 top-10 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 py-1 z-10 min-w-[120px]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white transition-colors hover:text-primary"
                            >
                              <Edit3 className="w-4 h-4 transition-colors" />
                              <span className="transition-colors">Edit</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white transition-colors hover:text-primary"
                            >
                              <Star className="w-4 h-4 transition-colors" />
                              <span className="transition-colors">Star</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:text-red-700 transition-colors group"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
