"use client";

import {
  Archive,
  Brain,
  ChevronLeft,
  ChevronRight,
  Edit3,
  MessageSquare,
  MoreVertical,
  Plus,
  Share,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileDropdown from "./profile-dropdown";

interface ChatSidebarProps {
  onNewChat?: () => void;
}

export default function ChatSidebar({ onNewChat }: ChatSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const router = useRouter();

  const handleProfileClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setIsProfileOpen(true);
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    } else {
      setIsNavigating(true);
      router.push("/");
    }
  };

  const handleChatsClick = () => {
    setIsNavigating(true);
    router.push("/chats");
  };

  const handleMemoriesClick = () => {
    setIsNavigating(true);
    router.push("/memories");
  };

  useEffect(() => {
    if (isCollapsed && isProfileOpen) {
      setIsProfileOpen(false);
    }
  }, [isCollapsed, isProfileOpen]);

  // Reset navigation state after a short delay
  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isNavigating]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);
  return (
    <aside
      className={`${isCollapsed ? "w-16" : "w-64"} h-screen bg-gray-50 dark:bg-black sidebar-black border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ease-out flex-shrink-0 overflow-hidden`}
    >
      <div
        className={`${isCollapsed ? "p-2" : "p-4"} flex-shrink-0 transition-all duration-300 ease-out`}
      >
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} transition-all duration-300 ease-out`}
        >
          <button
            onClick={() => router.push("/")}
            className="w-8 h-8 flex items-center justify-center transition-all duration-300 ease-out cursor-pointer hover:opacity-80"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all duration-300 ease-out"
            >
              <path
                d="M510.438 211C557.226 211 600.339 221.353 639.643 242.129C679.781 262.2 712.218 291.554 736.877 330.06C761.761 368.914 774 416.033 774 471.033V778.546C774 797.574 758.574 813 739.546 813C720.518 813 705.093 797.574 705.093 778.546V474.4C705.093 430.593 695.602 394.281 677.06 365.06L677.003 364.97L676.948 364.879C658.934 334.633 634.902 312.086 604.794 297.041L604.697 296.992L604.602 296.941C574.981 281.058 543.628 273.14 510.438 273.14C477.188 273.14 445.79 280.713 416.148 295.886C386.755 310.931 362.662 333.516 343.86 363.868L343.839 363.902L343.817 363.938C325.287 393.141 315.784 429.818 315.784 474.4V779.107C315.784 797.826 300.611 813 281.893 813C263.174 813 248 797.826 248 779.107V471.033C248 416.033 260.24 368.914 285.123 330.06L286.285 328.261C310.791 290.65 342.828 261.904 382.322 242.146C422.331 221.386 465.07 211 510.438 211Z"
                fill="#00d084"
                stroke="#00d084"
                strokeWidth="15"
              />
            </svg>
          </button>
          {!isCollapsed && (
            <div className="flex-1 transition-all duration-300 ease-out">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                Ask Neo
              </h1>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded transition-all duration-200 ease-out cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary transition-all duration-200 ease-out" />
            </button>
          )}
        </div>
        {isCollapsed && (
          <div className="flex justify-center mt-2 transition-all duration-300 ease-out">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded transition-all duration-200 ease-out cursor-pointer group"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary transition-all duration-200 ease-out" />
            </button>
          </div>
        )}
      </div>

      <div
        className={`${isCollapsed ? "px-2" : "px-3"} mb-4 transition-all duration-300 ease-out`}
      >
        <button
          onClick={handleNewChat}
          disabled={isNavigating}
          className={`btn btn-primary w-full flex items-center ${isCollapsed ? "justify-center" : "justify-center gap-2"} py-3 px-4 rounded-full font-medium text-sm cursor-pointer sidebar-button disabled:opacity-50 disabled:cursor-not-allowed ${isNavigating ? "loading-shimmer" : ""}`}
        >
          <Plus className="w-4 h-4 transition-all duration-200 ease-out" />
          {!isCollapsed && (
            <span className="transition-all duration-200 ease-out">
              New chat
            </span>
          )}
        </button>
      </div>

      <div
        className={`${isCollapsed ? "px-2" : "px-3"} mb-4 space-y-1 transition-all duration-300 ease-out`}
      >
        <button
          onClick={handleChatsClick}
          disabled={isNavigating}
          className={`w-full flex items-center ${isCollapsed ? "justify-center" : "gap-3"} px-3 py-2 rounded-lg sidebar-button text-gray-700 dark:text-gray-300 text-sm cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <MessageSquare className="w-4 h-4 group-hover:text-primary transition-all duration-200 ease-out" />
          {!isCollapsed && (
            <span className="group-hover:text-primary transition-all duration-200 ease-out">
              Chats
            </span>
          )}
        </button>
        <button
          onClick={handleMemoriesClick}
          disabled={isNavigating}
          className={`w-full flex items-center ${isCollapsed ? "justify-center" : "gap-3"} px-3 py-2 rounded-lg sidebar-button text-gray-700 dark:text-gray-300 text-sm cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Brain className="w-4 h-4 group-hover:text-primary transition-all duration-200 ease-out" />
          {!isCollapsed && (
            <span className="group-hover:text-primary transition-all duration-200 ease-out">
              Memories
            </span>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto transition-all duration-300 ease-out">
        {!isCollapsed && (
          <div className="px-3 space-y-1 min-w-0 transition-all duration-300 ease-out">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-2 uppercase tracking-wide transition-colors duration-300">
              Recent
            </p>

            <div className="space-y-1 transition-all duration-300 ease-out">
              <div className="relative group">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      How to implement authentication?
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdownId(
                        openDropdownId === "chat-1" ? null : "chat-1",
                      );
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity duration-200"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </button>

                {openDropdownId === "chat-1" && (
                  <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-20 min-w-[140px]">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Share className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Edit3 className="w-4 h-4" />
                      <span>Rename</span>
                    </button>
                    <div className="h-px bg-gray-200 dark:bg-gray-600 mx-2 my-1" />
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Archive className="w-4 h-4" />
                      <span>Archive</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="relative group">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      React best practices
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdownId(
                        openDropdownId === "chat-2" ? null : "chat-2",
                      );
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity duration-200"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </button>

                {openDropdownId === "chat-2" && (
                  <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-20 min-w-[140px]">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Share className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Edit3 className="w-4 h-4" />
                      <span>Rename</span>
                    </button>
                    <div className="h-px bg-gray-200 dark:bg-gray-600 mx-2 my-1" />
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Archive className="w-4 h-4" />
                      <span>Archive</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="relative group">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      Database optimization tips
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdownId(
                        openDropdownId === "chat-3" ? null : "chat-3",
                      );
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity duration-200"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </button>

                {openDropdownId === "chat-3" && (
                  <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-20 min-w-[140px]">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Share className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Edit3 className="w-4 h-4" />
                      <span>Rename</span>
                    </button>
                    <div className="h-px bg-gray-200 dark:bg-gray-600 mx-2 my-1" />
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Archive className="w-4 h-4" />
                      <span>Archive</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="relative group">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      API design patterns
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdownId(
                        openDropdownId === "chat-4" ? null : "chat-4",
                      );
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity duration-200"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </button>

                {openDropdownId === "chat-4" && (
                  <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-20 min-w-[140px]">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Share className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Edit3 className="w-4 h-4" />
                      <span>Rename</span>
                    </button>
                    <div className="h-px bg-gray-200 dark:bg-gray-600 mx-2 my-1" />
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Archive className="w-4 h-4" />
                      <span>Archive</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={`${isCollapsed ? "p-2" : "p-3"} flex-shrink-0 relative transition-all duration-300 ease-out`}
      >
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 transition-all duration-300 ease-out">
          <button
            onClick={handleProfileClick}
            className={`w-full flex items-center ${isCollapsed ? "justify-center" : "gap-3"} px-3 py-2 rounded-lg transition-all duration-200 ease-out cursor-pointer`}
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 transition-all duration-200 ease-out">
              <span className="text-white font-bold text-sm transition-all duration-200 ease-out">
                A
              </span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 text-left transition-all duration-300 ease-out">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate transition-colors duration-300">
                  Areeb Ahmed
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  Free
                </p>
              </div>
            )}
          </button>
        </div>

        <ProfileDropdown
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      </div>
    </aside>
  );
}
