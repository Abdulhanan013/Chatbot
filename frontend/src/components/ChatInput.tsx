interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => Promise<void>;
  isLoading: boolean;
}

export const ChatInput = ({
  input,
  setInput,
  onSend,
  isLoading,
}: ChatInputProps) => (
  <div className="p-4 border-t">
    <div className="flex space-x-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && !isLoading && onSend()}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
        aria-label="Message input"
      />
      <button
        onClick={onSend}
        disabled={isLoading}
        className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        aria-label={isLoading ? "Sending message..." : "Send message"}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </div>
  </div>
);
