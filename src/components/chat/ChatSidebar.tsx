import { motion } from 'framer-motion';
import { 
  FiUpload, 
  FiSettings, 
  FiHelpCircle, 
  FiTrash2, 
  FiDownload,
  FiBookOpen,
  FiMessageSquare,
  FiClock
} from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const ChatSidebar = ({ isOpen, onClose }: ChatSidebarProps) => {
  const quickActions = [
    {
      icon: FiUpload,
      label: 'Upload Document',
      description: 'PDF, DOC, TXT files',
      onClick: () => console.log('Upload document'),
    },
    // {
    //   icon: FiBookOpen,
    //   label: 'Study Materials',
    //   description: 'Access your resources',
    //   onClick: () => console.log('Study materials'),
    // },
    {
      icon: FiHelpCircle,
      label: 'FAQ & Help',
      description: 'Common questions',
      onClick: () => console.log('FAQ'),
    },
    {
      icon: FiSettings,
      label: 'Settings',
      description: 'Preferences & config',
      onClick: () => console.log('Settings'),
    },
  ];

  const recentChats = [
    // { id: '1', title: 'Mathematics - Algebra Help', time: '2 hours ago', messages: 15 },
    // { id: '2', title: 'Physics - Newton\'s Laws', time: '1 day ago', messages: 8 },
    // { id: '3', title: 'Chemistry - Organic Compounds', time: '2 days ago', messages: 12 },
    // { id: '4', title: 'History - World War II', time: '3 days ago', messages: 6 },
  ];

  const faqItems = [
    'How to upload documents?',
    'Supported file formats',
    'How to change language?',
    'Export chat history',
    'Reset conversation',
  ];

  return (
    <motion.aside
      initial={{ x: 300 }}
      animate={{ x: isOpen ? 0 : 300 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-sidebar border-l border-sidebar-border shadow-xl z-40 lg:relative lg:top-0 lg:h-full"
    >
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
              <FiMessageSquare className="w-4 h-4 mr-2" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    onClick={action.onClick}
                    className="w-full justify-start h-auto p-3 hover:bg-accent/50"
                  >
                    <action.icon className="w-4 h-4 mr-3 flex-shrink-0 text-primary" />
                    <div className="text-left">
                      <div className="text-sm font-medium">{action.label}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Recent Chats */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
              <FiClock className="w-4 h-4 mr-2" />
              Recent Chats
            </h3>
            <div className="space-y-2">
              {recentChats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-3 hover:bg-accent/30 cursor-pointer transition-colors">
                    <div className="space-y-1">
                      <div className="text-sm font-medium truncate">{chat.title}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                        <Badge variant="secondary" className="text-xs">
                          {chat.messages} msgs
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <Separator />

          {/* FAQ Quick Access */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
              <FiHelpCircle className="w-4 h-4 mr-2" />
              Quick Help
            </h3>
            <div className="space-y-1">
              {faqItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs py-2 h-auto text-muted-foreground hover:text-foreground"
                  >
                    {item}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Chat Actions */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Chat Actions</h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <FiDownload className="w-4 h-4 mr-2" />
                Export Chat
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <FiTrash2 className="w-4 h-4 mr-2" />
                Clear History
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </motion.aside>
  );
};

export default ChatSidebar;