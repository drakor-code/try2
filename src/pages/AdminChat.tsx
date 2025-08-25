import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Search, 
  Users, 
  MessageCircle,
  Clock,
  CheckCheck
} from 'lucide-react';

// Mock messages data
const mockMessages = [
  {
    id: 1,
    sender: 'أحمد محمد',
    message: 'مرحباً، هل يمكننا مراجعة تقرير الديون اليوم؟',
    timestamp: '10:30 ص',
    isCurrentUser: false,
    isRead: true,
  },
  {
    id: 2,
    sender: 'أنت',
    message: 'بالطبع، سأرسل لك التقرير خلال ساعة',
    timestamp: '10:32 ص',
    isCurrentUser: true,
    isRead: true,
  },
  {
    id: 3,
    sender: 'سارة أحمد',
    message: 'تم إضافة عميل جديد إلى النظام',
    timestamp: '11:15 ص',
    isCurrentUser: false,
    isRead: false,
  },
];

// Mock online users
const onlineUsers = [
  { id: 1, name: 'أحمد محمد', role: 'مدير', status: 'online' },
  { id: 2, name: 'سارة أحمد', role: 'موظف', status: 'online' },
  { id: 3, name: 'محمد علي', role: 'موظف', status: 'away' },
];

const AdminChat = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const filteredMessages = messages.filter(message =>
    message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto scroll to bottom when new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'أنت',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('ar-SA', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        isCurrentUser: true,
        isRead: false,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <MainLayout>
      <div className="p-6 h-[calc(100vh-120px)] page-transition">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Online Users Sidebar */}
          <Card className="shadow-card animate-slide-in-left card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t('adminChat.onlineUsers')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {onlineUsers.map((user, index) => (
                  <div 
                    key={user.id} 
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/20 cursor-pointer btn-hover-lift animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="shadow-card flex-1 flex flex-col animate-slide-in-right card-hover" style={{ animationDelay: '0.1s' }}>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    {t('adminChat.generalChat')}
                  </CardTitle>
                  <Badge variant="secondary" className="gap-1 animate-pulse-subtle">
                    <Users className="h-3 w-3" />
                    {onlineUsers.filter(u => u.status === 'online').length} {t('adminChat.online')}
                  </Badge>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t('adminChat.searchMessages')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-4 max-h-[400px]">
                <div className="space-y-4">
                  {filteredMessages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isCurrentUser ? 'justify-start' : 'justify-end'} animate-fade-in-up`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                          message.isCurrentUser
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-accent text-accent-foreground'
                        }`}
                      >
                        {!message.isCurrentUser && (
                          <p className="text-xs font-medium mb-1">{message.sender}</p>
                        )}
                        <p className="text-sm">{message.message}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                          {message.isCurrentUser && (
                            <CheckCheck className={`h-3 w-3 ${message.isRead ? 'text-blue-300' : 'text-gray-300'}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder={t('adminChat.typeMessage')}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="btn-hover-lift">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminChat;