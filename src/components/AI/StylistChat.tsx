'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, ChevronLeft } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'stylist';
    timestamp: Date;
}

export default function StylistChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm your AI Personal Stylist. Based on your recent views, I've curated some looks. How can I help you elevate your style today?",
            sender: 'stylist',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Simulate AI response for now
        setTimeout(() => {
            const stylistMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "That's a great choice! I recommend pairing the Wool Trousers with a neutral grey jacket to balance the look. Would you like to see some options?",
                sender: 'stylist',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, stylistMessage]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-lg mx-auto bg-white dark:bg-zinc-950 shadow-2xl rounded-[2.5rem] border overflow-hidden">
            <header className="p-4 border-b flex items-center justify-between bg-linen/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-white">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold font-serif">AI Personal Stylist</h2>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                            <span className="text-[10px] text-muted text-uppercase tracking-widset">Online</span>
                        </div>
                    </div>
                </div>
                <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                    <X size={20} className="text-muted" />
                </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-3xl text-sm ${m.sender === 'user'
                                ? 'bg-dark text-white rounded-tr-none'
                                : 'bg-linen dark:bg-zinc-900 rounded-tl-none font-medium'
                            }`}>
                            {m.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-linen dark:bg-zinc-900 p-4 rounded-3xl rounded-tl-none flex gap-1">
                            <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <footer className="p-4 border-t bg-white dark:bg-zinc-950">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask your stylist..."
                        className="w-full pl-4 pr-12 py-3 bg-zinc-100 dark:bg-zinc-900 border-0 rounded-full text-sm focus:ring-1 focus:ring-dark"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-dark text-white rounded-full flex items-center justify-center transition-transform active:scale-95 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        <Send size={14} />
                    </button>
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    <button className="whitespace-nowrap px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border rounded-full text-[11px] font-bold hover:bg-linen transition-colors">Any other colors?</button>
                    <button className="whitespace-nowrap px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border rounded-full text-[11px] font-bold hover:bg-linen transition-colors">Show sizing guide</button>
                </div>
            </footer>
        </div>
    );
}
