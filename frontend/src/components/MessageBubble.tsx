interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => (
  <div
    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
    role="listitem"
  >
    <div
      className={`max-w-xs p-3 rounded-lg ${
        message.isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      {message.text}
      <div className="text-xs mt-1 opacity-70">
        {message.timestamp.toLocaleTimeString()}
      </div>
    </div>
  </div>
);
