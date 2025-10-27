"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Trigger transition when pathname changes
    setIsLoading(true);
    setIsVisible(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ease-out">
          <div className="flex flex-col items-center gap-4 animate-fade-in-up">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Loading...
            </p>
          </div>
        </div>
      )}

      {/* Page content */}
      <div
        className={`transition-all duration-300 ease-out ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-4"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
