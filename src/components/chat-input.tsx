"use client";

import { Mic, Paperclip, Send, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
    | null;
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({
  onSendMessage,
  isLoading,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((input.trim() || attachedFile) && !isLoading) {
      const message = attachedFile
        ? `${input.trim()}\n\n📎 Attached: ${attachedFile.name}`
        : input;
      onSendMessage(message);
      setInput("");
      setAttachedFile(null);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 128) + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const SpeechRecognitionCtor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    setIsVoiceSupported(Boolean(SpeechRecognitionCtor));
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const startVoiceRecording = async () => {
    if (!isVoiceSupported) return;

    try {
      const recognitionCtor =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!recognitionCtor) {
        return;
      }

      const recognition = new recognitionCtor();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + (prev ? " " : "") + transcript);
      };

      recognition.onerror = (event: any) => {
        setIsRecording(false);
        toast.error("Voice recording failed. Please try again.");
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (error) {
      setIsRecording(false);
      toast.error("Failed to start voice recording. Please try again.");
    }
  };

  const handleVoiceClick = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      startVoiceRecording();
    }
  };

  return (
    <div className="bg-white center-grey sticky bottom-0 p-4">
      <div className="max-w-2xl mx-auto">
        {attachedFile && (
          <div className="mb-3 p-3 center-grey rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {attachedFile.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {(attachedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              type="button"
              onClick={removeAttachedFile}
              className="p-1 rounded transition-colors group"
            >
              <X className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 px-4 py-3 rounded-full center-grey border border-gray-200 dark:border-gray-700 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200 shadow-sm">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 rounded-lg transition-colors flex-shrink-0 cursor-pointer group"
              title="Attach file"
            >
              <Paperclip className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept="*/*"
            />

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything"
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none text-sm py-1 resize-none min-h-[20px] max-h-32 overflow-y-auto"
              disabled={isLoading}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
            />

            <button
              type="button"
              onClick={handleVoiceClick}
              disabled={!isVoiceSupported}
              className={`p-1.5 rounded-lg transition-colors flex-shrink-0 cursor-pointer group ${
                !isVoiceSupported ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title={
                isVoiceSupported
                  ? isRecording
                    ? "Recording... Click to stop"
                    : "Start voice recording"
                  : "Voice recording not supported"
              }
            >
              <Mic
                className={`w-4 h-4 transition-colors ${
                  isRecording
                    ? "text-red-500"
                    : "text-gray-500 dark:text-gray-400 group-hover:text-primary"
                }`}
              />
            </button>

            <button
              type="submit"
              disabled={(!input.trim() && !attachedFile) || isLoading}
              className={`btn btn-primary p-2 rounded-full flex-shrink-0 cursor-pointer ${isLoading ? "loading" : ""} disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Send message"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
