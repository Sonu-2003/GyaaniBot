import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/layout/Navigation";
import ChatMessage, { Message } from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToBackend = async (content: string, file?: File) => {
    setIsLoading(true);

    try {
      let responseText = "";

      if (file) {
        // If sending a file, you may want to implement file upload handling here.
        // For now, just send the file name as a placeholder.
        content = `Uploaded file: ${file.name}`;
      }

      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });

      const data = await res.json();
      responseText = data.content || "Sorry, I couldn't generate a response.";
      return responseText;
    } catch (err) {
      console.error(err);
      return "Error: Unable to get response from the server.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content: string, file?: File) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: file ? `Uploaded file: ${file.name}` : content,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Get bot response
    const botResponseText = await sendMessageToBackend(content, file);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: botResponseText,
      role: "assistant",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex flex-col">
      <Navigation />

      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1">
            <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 space-y-4">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center h-full min-h-[60vh]"
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">GB</span>
                    </div>
                    <h2 className="text-2xl font-bold">Welcome to Gyaani Bot</h2>
                    <p className="text-muted-foreground max-w-md">
                      Start a conversation with your AI learning assistant. 
                      Ask questions about any subject and get detailed explanations.
                    </p>
                  </div>
                </motion.div>
              )}

              {messages.map((message, index) => (
                <ChatMessage key={message.id} message={message} index={index} />
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 p-4"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-chat-bubble-bot rounded-2xl rounded-bl-sm px-4 py-3 max-w-[70%]">
                      Bot is typing...
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <ChatSidebar isOpen={true} />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="lg:hidden">
              <ChatSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
