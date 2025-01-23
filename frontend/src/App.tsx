import { useState } from "react";
import { useChatRequest } from "./hooks/useChatRequest";
import { MessageBubble } from "./components/MessageBubble";
import { ChatInput } from "./components/ChatInput";

function App() {
  const [input, setInput] = useState("");
  const { messages, isLoading, error, sendMessage } = useChatRequest();

  const handleSend = async () => {
    if (input.trim()) {
      await sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto">
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        role="list"
        aria-label="Chat messages"
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {error && (
          <div className="text-red-500 text-center p-2 bg-red-100 rounded">
            {error}
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-pulse text-gray-500">Processing...</div>
          </div>
        )}
      </div>
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
