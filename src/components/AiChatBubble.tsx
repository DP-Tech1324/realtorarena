import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const AiChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => setIsOpen((open) => !open);

  const handleSend = async () => {
    if (loading) return; // Prevent double send
    if (!input.trim()) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Please enter a message first!' },
      ]);
      return;
    }

    const userMessage = input.trim();
    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userMessage },
    ];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/groq-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, I didn’t understand that.';
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: reply },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'There was an error. Please try again later.' },
      ]);
      console.error('Groq error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key to send
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      !loading &&
      input.trim().length > 0
    ) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000] block visible">
      <button
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open AI chat'}
        className="w-16 h-16 bg-realtor-gold text-realtor-navy rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center cursor-pointer"
      >
        <span className="text-sm font-medium">{isOpen ? '✕' : '💬'}</span>
      </button>

      {isOpen && (
        <div className="mt-4 w-80 bg-white shadow-xl rounded-lg p-4 border border-realtor-navy">
          <div className="h-64 overflow-y-auto mb-2 space-y-2 text-sm text-gray-800">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'text-blue-600' : 'text-yellow-700'}>
                <strong>{msg.role === 'user' ? '👤 You' : '🤖 AI'}:</strong> {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="flex items-center gap-2"
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              ref={inputRef}
              className="flex-grow border border-gray-300 rounded px-2 py-1"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about listings..."
              onKeyDown={handleKeyDown}
              disabled={loading}
              aria-label="Type your message"
            />
            <button
              type="submit"
              disabled={loading || input.trim().length === 0}
              className="bg-realtor-navy text-white px-2 py-1 rounded hover:bg-realtor-navy/90 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>

          {loading && <p className="text-xs text-gray-500 mt-2">Thinking...</p>}
        </div>
      )}
    </div>
  );
};

export default AiChatBubble;
