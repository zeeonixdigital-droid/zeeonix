'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, User, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

const WELCOME: Message = {
  id: 'welcome',
  role: 'model',
  content: 'Hi! I am Zara, AI Assistant at Zeeonix Digital.\n\nI can help you with:\n- Website Development\n- Digital Marketing\n- AI Services\n- Graphic Design\n- And much more!\n\nFeel free to write in any language!',
  timestamp: new Date(),
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    const currentInput = input.trim();
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setIsTyping(true);

    const history = messages
      .filter(m => m.id !== 'welcome')
      .map(m => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          userMessage: currentInput,
        }),
      });

      const data = await res.json();
      setIsTyping(false);

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: data.response || 'Sorry, please try again.',
        timestamp: new Date(),
      }]);
    } catch {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: 'Sorry, I am having trouble. Please email zeeonixdigital@gmail.com',
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div
          className="w-80 sm:w-96 bg-brand-dark border border-brand-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: '520px' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Zara</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-white/80 text-xs">AI Assistant - Online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white/70 hover:text-white p-1"
                aria-label="Minimize"
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white p-1"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-navy">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                  msg.role === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-600 to-violet-600'
                }`}>
                  {msg.role === 'user'
                    ? <User size={14} className="text-white" />
                    : <Bot size={14} className="text-white" />
                  }
                </div>
                <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-gray-800 border border-gray-700 text-gray-100 rounded-tl-sm'
                }`}>
                  {msg.content}
                  <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-gray-500'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-700 bg-brand-dark">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type in any language..."
                className="flex-1 bg-brand-navy border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                disabled={loading}
                maxLength={1000}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white disabled:opacity-50 hover:opacity-90 transition-opacity shrink-0"
                aria-label="Send"
              >
                {loading
                  ? <Loader2 size={16} className="animate-spin" />
                  : <Send size={16} />
                }
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Zara - AI Assistant by Zeeonix Digital
            </p>
          </div>
        </div>
      )}

      {/* Minimized */}
      {isOpen && isMinimized && (
        <div
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-full px-4 py-2.5 flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <Bot size={16} className="text-white" />
          <span className="text-white text-sm font-medium">Zara - Click to open</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen
          ? <X size={22} className="text-white" />
          : <MessageSquare size={22} className="text-white" />
        }
      </button>
    </div>
  );
}