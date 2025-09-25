import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSidebar, FiX } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/layout/Navigation';
import ChatMessage, { Message } from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import ChatSidebar from '@/components/chat/ChatSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample messages for demonstration
const SAMPLE_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your Smart Education AI assistant. I can help you with various subjects including Mathematics, Physics, Chemistry, History, and more. How can I assist you today?',
    role: 'assistant',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
  },
  {
    id: '2',
    content: 'Hi! I need help with algebra. Can you explain how to solve quadratic equations?',
    role: 'user',
    timestamp: new Date(Date.now() - 240000), // 4 minutes ago
  },
  {
    id: '3',
    content: 'I\'d be happy to help you with quadratic equations! A quadratic equation is in the form ax² + bx + c = 0, where a ≠ 0.\n\nThere are several methods to solve them:\n\n1. **Factoring**: If the equation can be factored\n2. **Quadratic Formula**: x = (-b ± √(b² - 4ac)) / 2a\n3. **Completing the Square**: Rewriting in (x + p)² = q form\n\nWhich method would you like me to explain in detail?',
    role: 'assistant',
    timestamp: new Date(Date.now() - 180000), // 3 minutes ago
  },
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string, file?: File) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(content),
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // 1-3 seconds delay
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('math') || lowerMessage.includes('equation') || lowerMessage.includes('solve')) {
      return 'I can help you with mathematics! Whether it\'s algebra, calculus, geometry, or statistics, I\'m here to guide you through step-by-step solutions. What specific math problem are you working on?';
    }
    
    if (lowerMessage.includes('physics')) {
      return 'Physics is fascinating! I can assist with mechanics, thermodynamics, electromagnetism, optics, and modern physics. What physics concept would you like to explore?';
    }
    
    if (lowerMessage.includes('chemistry')) {
      return 'Chemistry involves understanding matter and its interactions. I can help with organic chemistry, inorganic chemistry, physical chemistry, and biochemistry. What chemistry topic interests you?';
    }
    
    if (lowerMessage.includes('history')) {
      return 'History helps us understand our past and present. I can discuss world history, specific time periods, historical figures, and events. What historical topic would you like to learn about?';
    }

    if (lowerMessage.includes('upload') || lowerMessage.includes('file')) {
      return 'Great! I can analyze uploaded documents including PDFs, Word documents, and text files. Once you upload a file, I can help you understand its content, answer questions about it, or create summaries. Please use the upload button to share your document.';
    }
    
    return 'Thank you for your question! I\'m here to help you learn and understand various subjects. Could you please provide more details about what you\'d like to learn or which subject you\'re interested in? I can assist with Mathematics, Physics, Chemistry, History, and many other topics.';
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
            <h1 className="text-lg font-semibold">Chat</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <FiX className="h-5 w-5" /> : <FiSidebar className="h-5 w-5" />}
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1">
            <div className="max-w-4xl mx-auto px-4">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center h-full min-h-[60vh]"
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">SE</span>
                    </div>
                    <h2 className="text-2xl font-bold">Welcome to Smart Education</h2>
                    <p className="text-muted-foreground max-w-md">
                      Start a conversation with your AI learning assistant. 
                      Ask questions about any subject and get detailed explanations.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="py-4 space-y-4">
                  {messages.map((message, index) => (
                    <ChatMessage key={message.id} message={message} index={index} />
                  ))}
                  
                  {/* Loading indicator */}
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
                          <div className="flex space-x-1">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                              className="w-2 h-2 bg-current rounded-full opacity-60"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                              className="w-2 h-2 bg-current rounded-full opacity-60"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                              className="w-2 h-2 bg-current rounded-full opacity-60"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
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