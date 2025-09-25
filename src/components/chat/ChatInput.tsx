import { useState, useRef, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiPaperclip, FiMic, FiMicOff } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSendMessage: (message: string, file?: File) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSendMessage, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSendMessage(`Uploaded file: ${file.name}`, file);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording functionality
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky bottom-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border p-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3 bg-card rounded-2xl border border-border p-3 shadow-lg">
          {/* File Upload */}
          <div className="flex-shrink-0">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-9 w-9 p-0 hover:bg-primary/10"
              disabled={isLoading}
            >
              <FiPaperclip className="h-4 w-4" />
            </Button>
          </div>

          {/* Text Input */}
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
              className="min-h-[40px] max-h-[120px] resize-none border-none bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isLoading}
            />
          </div>

          {/* Voice Recording */}
          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleRecording}
              className={`h-9 w-9 p-0 ${
                isRecording 
                  ? 'bg-destructive/10 text-destructive hover:bg-destructive/20' 
                  : 'hover:bg-primary/10'
              }`}
              disabled={isLoading}
            >
              {isRecording ? 
                <FiMicOff className="h-4 w-4" /> : 
                <FiMic className="h-4 w-4" />
              }
            </Button>
          </div>

          {/* Send Button */}
          <div className="flex-shrink-0">
            <Button
              onClick={handleSend}
              disabled={!message.trim() || isLoading}
              size="sm"
              className="h-9 w-9 p-0 bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                />
              ) : (
                <FiSend className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-2 text-center">
          <p className="text-xs text-muted-foreground">
            Press <kbd className="px-1 py-0.5 text-xs bg-muted rounded">Enter</kbd> to send, 
            <kbd className="px-1 py-0.5 text-xs bg-muted rounded ml-1">Shift + Enter</kbd> for new line
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatInput;