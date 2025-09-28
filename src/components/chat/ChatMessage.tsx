import { motion } from "framer-motion";
import { FiUser, FiCpu, FiCopy } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  index: number;
}

const ChatMessage = ({ message, index }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex gap-4 p-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? "bg-primary text-white" : "bg-secondary text-white"
          }`}
        >
          {isUser ? <FiUser /> : <FiCpu />}
        </div>
      </div>

      {/* Message Bubble */}
      <div className={`flex-1 max-w-[70%] ${isUser ? "text-right" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-chat-bubble-user text-chat-bubble-user-foreground rounded-br-sm"
              : "bg-chat-bubble-bot text-chat-bubble-bot-foreground rounded-bl-sm"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Copy Button for assistant */}
        {!isUser && (
          <div className="flex justify-end mt-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={handleCopy}
            >
              <FiCopy className="w-3 h-3 mr-1" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
