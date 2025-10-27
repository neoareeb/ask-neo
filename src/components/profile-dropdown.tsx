"use client";

import {
  ChevronRight,
  HelpCircle,
  LogOut,
  Settings,
  Star,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDropdown({
  isOpen,
  onClose,
}: ProfileDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      onClose();
      router.push("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  if (!isOpen) return null;

  const baseItemClasses =
    "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-xl transition-colors cursor-pointer group";
  const iconClasses = "w-4 h-4 text-gray-500 dark:text-gray-400";

  return (
    <div
      ref={dropdownRef}
      className="absolute bottom-16 left-3 right-3 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-sm shadow-xl py-4 z-50"
    >
      <div className="px-3 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm flex-shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              areebahmed0709@gmail.com
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-800 mx-3 mb-3" />

      <div className="flex flex-col gap-1">
        <button className={`${baseItemClasses} text-gray-900 dark:text-white`}>
          <Star
            className={`${iconClasses} group-hover:text-primary transition-colors`}
          />
          <span className="flex-1 group-hover:text-primary transition-colors">
            Upgrade plan
          </span>
        </button>

        <button className={`${baseItemClasses} text-gray-900 dark:text-white`}>
          <Settings
            className={`${iconClasses} group-hover:text-primary transition-colors`}
          />
          <span className="flex-1 group-hover:text-primary transition-colors">
            Settings
          </span>
        </button>

        <div className="h-px bg-gray-200 dark:bg-gray-800 mx-3 my-1" />

        <button className={`${baseItemClasses} text-gray-900 dark:text-white`}>
          <HelpCircle
            className={`${iconClasses} group-hover:text-primary transition-colors`}
          />
          <span className="flex-1 group-hover:text-primary transition-colors">
            Help
          </span>
          <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-primary transition-colors" />
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-xl transition-colors cursor-pointer text-red-600 hover:text-red-700"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          <span className="flex-1">Log out</span>
        </button>
      </div>
    </div>
  );
}
