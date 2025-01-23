import { useState, useCallback, useRef, useEffect } from "react";
import { Message, ChatResponse } from "../types/chat";

interface UseChatRequestReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
}

export const useChatRequest = (): UseChatRequestReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup function to abort any ongoing request when component unmounts
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const sendMessage = useCallback(
    async (message: string) => {
      const trimmedMessage = message.trim();
      if (!trimmedMessage || isLoading) return;

      // Abort any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();
      setIsLoading(true);
      setError(null);

      // Add user message immediately
      const userMessage: Message = {
        id: Date.now().toString(),
        text: trimmedMessage,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL ||
            "http://localhost:8000/api/chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: trimmedMessage,
            }),
            signal: abortControllerRef.current.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = (await response.json()) as ChatResponse;

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.Response,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (err) {
        // Don't set error if request was aborted
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while sending the message"
        );
        console.error("Chat error:", err);
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [isLoading]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
};
