"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    try {
      setIsLoggedIn(true);
      localStorage.setItem("isAuthenticated", "true");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Login failed. Please try again.");
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Logging you in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              width="32"
              height="32"
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Ask Neo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your AI-powered assistant for smarter conversations
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-primary text-white py-3 px-4 rounded-xl font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Sign In
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <span className="text-primary cursor-pointer hover:underline">
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
