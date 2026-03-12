import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Plus, Hash, Users, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  sessionId: string;
}

interface Session {
  id: string;
  name: string;
  lastMessage: string;
  unread: number;
}

const mockSessions: Session[] = [
  { id: 's1', name: 'Mathématiques L1', lastMessage: 'Quelqu\'un peut m\'aider ?', unread: 3 },
  { id: 's2', name: 'Informatique L1', lastMessage: 'Le TP est pour quand ?', unread: 0 },
  { id: 's3', name: 'Discussion générale', lastMessage: 'Bonjour à tous !', unread: 1 },
  { id: 's4', name: 'Aide examens', lastMessage: 'Les résultats sont sortis', unread: 5 },
];

const mockMessages: Record<string, Message[]> = {
  s1: [
    { id: 'm1', userId: 'u1', userName: 'Rabe Jean', userAvatar: '👨‍🎓', content: 'Bonjour ! Est-ce que quelqu\'un a compris le chapitre 3 sur les intégrales ?', timestamp: '10:30', sessionId: 's1' },
    { id: 'm2', userId: 'u2', userName: 'Noro Fanja', userAvatar: '👩‍🎓', content: 'Oui, je peux t\'expliquer ! En gros, l\'intégrale c\'est l\'opération inverse de la dérivée. Tu cherches la fonction dont la dérivée donne la fonction que tu intègres.', timestamp: '10:32', sessionId: 's1' },
    { id: 'm3', userId: 'u3', userName: 'Hery Tiana', userAvatar: '🧑‍💻', content: 'J\'ai aussi eu du mal au début. Les exercices du chapitre m\'ont beaucoup aidé !', timestamp: '10:35', sessionId: 's1' },
  ],
  s2: [
    { id: 'm4', userId: 'u2', userName: 'Noro Fanja', userAvatar: '👩‍🎓', content: 'Le TP d\'algorithmique est prévu pour vendredi prochain.', timestamp: '09:15', sessionId: 's2' },
    { id: 'm5', userId: 'u4', userName: 'Solo Andry', userAvatar: '👨‍💻', content: 'Merci ! Il faut préparer quelque chose ?', timestamp: '09:20', sessionId: 's2' },
  ],
  s3: [
    { id: 'm6', userId: 'u1', userName: 'Rabe Jean', userAvatar: '👨‍🎓', content: 'Bonjour à tous ! Comment ça va ?', timestamp: '08:00', sessionId: 's3' },
  ],
  s4: [
    { id: 'm7', userId: 'u3', userName: 'Hery Tiana', userAvatar: '🧑‍💻', content: 'Les résultats du semestre sont sortis ! Allez vérifier sur le site.', timestamp: '14:00', sessionId: 's4' },
  ],
};

export default function Community() {
  const [activeSession, setActiveSession] = useState<string | null>('s1');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showSessions, setShowSessions] = useState(true);

  const currentMessages = activeSession ? messages[activeSession] || [] : [];
  const currentSession = mockSessions.find((s) => s.id === activeSession);

  const handleSend = () => {
    if (!newMessage.trim() || !activeSession) return;
    const msg: Message = {
      id: `m${Date.now()}`,
      userId: 'me',
      userName: 'Moi',
      userAvatar: '🙂',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      sessionId: activeSession,
    };
    setMessages((prev) => ({
      ...prev,
      [activeSession]: [...(prev[activeSession] || []), msg],
    }));
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex rounded-2xl glass overflow-hidden">
      {/* Sessions Panel */}
      <AnimatePresence>
        {showSessions && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-r border-border/50 flex flex-col overflow-hidden shrink-0"
          >
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Sessions
              </h2>
              <button className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                <Plus className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {mockSessions.map((session) => (
                <motion.button
                  key={session.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveSession(session.id);
                    if (window.innerWidth < 768) setShowSessions(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    activeSession === session.id
                      ? 'bg-primary/15 border border-primary/20'
                      : 'hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Hash className="w-3.5 h-3.5 text-primary" />
                      {session.name}
                    </span>
                    {session.unread > 0 && (
                      <span className="w-5 h-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center font-bold">
                        {session.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{session.lastMessage}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="p-4 border-b border-border/50 flex items-center gap-3">
          <button
            onClick={() => setShowSessions(!showSessions)}
            className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors md:hidden"
          >
            {showSessions ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
          </button>
          {currentSession && (
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Hash className="w-4 h-4 text-primary" />
                {currentSession.name}
              </h3>
              <p className="text-xs text-muted-foreground">{currentMessages.length} messages</p>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex gap-3 ${msg.userId === 'me' ? 'flex-row-reverse' : ''}`}
            >
              <Link to={`/user/${msg.userId}`} className="shrink-0">
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-lg hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer">
                  {msg.userAvatar}
                </div>
              </Link>
              <div className={`max-w-[70%] ${msg.userId === 'me' ? 'items-end' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Link to={`/user/${msg.userId}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    {msg.userName}
                  </Link>
                  <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                </div>
                <div className={`rounded-2xl px-4 py-2.5 text-sm ${
                  msg.userId === 'me'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'glass rounded-bl-md'
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Écrire un message..."
              className="flex-1 px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
