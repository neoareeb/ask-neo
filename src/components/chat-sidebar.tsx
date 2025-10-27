"use client";

import {
  Brain,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Plus,
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
      router.push("/");
    }
  };

  const handleChatsClick = () => {
    router.push("/chats");
  };

  const handleMemoriesClick = () => {
    router.push("/memories");
  };

  useEffect(() => {
    if (isCollapsed && isProfileOpen) {
      setIsProfileOpen(false);
    }
  }, [isCollapsed, isProfileOpen]);
  return (
    <aside
      className={`${isCollapsed ? "w-16" : "w-64"} h-screen bg-gray-50 dark:bg-black sidebar-black border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 flex-shrink-0 overflow-hidden`}
    >
      <div className={`${isCollapsed ? "p-2" : "p-4"} flex-shrink-0`}>
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M510.438 211C557.226 211 600.339 221.353 639.643 242.129C679.781 262.2 712.218 291.554 736.877 330.06C761.761 368.914 774 416.033 774 471.033V778.546C774 797.574 758.574 813 739.546 813C720.518 813 705.093 797.574 705.093 778.546V474.4C705.093 430.593 695.602 394.281 677.06 365.06L677.003 364.97L676.948 364.879C658.934 334.633 634.902 312.086 604.794 297.041L604.697 296.992L604.602 296.941C574.981 281.058 543.628 273.14 510.438 273.14C477.188 273.14 445.79 280.713 416.148 295.886C386.755 310.931 362.662 333.516 343.86 363.868L343.839 363.902L343.817 363.938C325.287 393.141 315.784 429.818 315.784 474.4V779.107C315.784 797.826 300.611 813 281.893 813C263.174 813 248 797.826 248 779.107V471.033C248 416.033 260.24 368.914 285.123 330.06L286.285 328.261C310.791 290.65 342.828 261.904 382.322 242.146C422.331 221.386 465.07 211 510.438 211Z"
                fill="#00d084"
                stroke="#00d084"
                strokeWidth="15"
              />
            </svg>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Ask Neo
              </h1>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded transition-colors cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors" />
            </button>
          )}
        </div>
        {isCollapsed && (
          <div className="flex justify-center mt-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded transition-colors cursor-pointer group"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors" />
            </button>
          </div>
        )}
      </div>

      <div className={`${isCollapsed ? "px-2" : "px-3"} mb-4`}>
        <button
          onClick={handleNewChat}
          className={`btn btn-primary w-full flex items-center ${isCollapsed ? "justify-center" : "justify-center gap-2"} py-3 px-4 rounded-full font-medium text-sm cursor-pointer`}
        >
          <Plus className="w-4 h-4" />
          {!isCollapsed && <span>New chat</span>}
        </button>
      </div>

      <div className={`${isCollapsed ? "px-2" : "px-3"} mb-4 space-y-1`}>
        <button
          onClick={handleChatsClick}
          className={`w-full flex items-center ${isCollapsed ? "justify-center" : "gap-3"} px-3 py-2 rounded-lg transition-colors text-gray-700 dark:text-gray-300 text-sm cursor-pointer group`}
        >
          <MessageSquare className="w-4 h-4 group-hover:text-primary transition-colors" />
          {!isCollapsed && (
            <span className="group-hover:text-primary transition-colors">
              Chats
            </span>
          )}
        </button>
        <button
          onClick={handleMemoriesClick}
          className={`w-full flex items-center ${isCollapsed ? "justify-center" : "gap-3"} px-3 py-2 rounded-lg transition-colors text-gray-700 dark:text-gray-300 text-sm cursor-pointer group`}
        >
          <Brain className="w-4 h-4 group-hover:text-primary transition-colors" />
          {!isCollapsed && (
            <span className="group-hover:text-primary transition-colors">
              Memories
            </span>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {!isCollapsed && (
          <div className="px-3 space-y-1 min-w-0">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-2 uppercase tracking-wide">
              Recent
            </p>

            <div className="px-3 py-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No recent chats
              </p>
            </div>
          </div>
        )}
      </div>

      <div className={`${isCollapsed ? "p-2" : "p-3"} flex-shrink-0 relative`}>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <button
            onClick={handleProfileClick}
            className={`w-full flex items-center ${isCollapsed ? "justify-center" : "gap-3"} px-3 py-2 rounded-lg transition-colors cursor-pointer`}
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Areeb Ahmed
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Free</p>
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
