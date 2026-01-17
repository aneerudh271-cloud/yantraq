
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, X, Maximize2, Minimize2, MessageSquare } from 'lucide-react';

interface Message {
    role: 'user' | 'model';
    text: string;
}

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: 'Hello! I\'m your AI assistant for YANTRAQ. I can help you with information about our products, services, and company. How can I assist you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Show welcome message after a short delay
        const timer = setTimeout(() => {
            setShowWelcome(true);
            // Auto-hide after 5 seconds
            setTimeout(() => setShowWelcome(false), 5000);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isOpen && !isFullScreen) {
            const handleScroll = () => {
                setIsOpen(false);
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [isOpen, isFullScreen]);

    const renderMessage = (text: string) => {
        // Simple bold rendering for **text**
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userText = input.trim();
        setInput('');
        setIsLoading(true);

        // Add User Message
        const userMsg: Message = { role: 'user', text: userText };
        setMessages(prev => [...prev, userMsg]);

        try {
            // Filter out the initial welcome message from history
            const chatHistory = messages.filter((_, index) => index > 0);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userText,
                    history: chatHistory,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();

            // Add Model Response
            setMessages(prev => [...prev, { role: 'model', text: data.response }]);

        } catch (error: any) {
            console.error("Chat Error:", error);
            let errorMsg = "Sorry, something went wrong. Please try again.";
            setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Welcome Popup */}
            {showWelcome && (
                <div className="fixed bottom-32 right-6 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg z-40 max-w-xs animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-start gap-3">
                        <Bot className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium">YANTRAQ Assistant</p>
                            <p className="text-xs opacity-90 mt-1">Hi! I'm here to help you with our products and services. Click the chat button to get started!</p>
                        </div>
                        <button
                            onClick={() => setShowWelcome(false)}
                            className="text-white/70 hover:text-white ml-2"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-24 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
                    aria-label="Open AI chat"
                >
                    <Bot className="w-6 h-6" />
                </button>
            )}

            {/* Chat Widget */}
            {isOpen && (
                <div className={`fixed bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col font-sans text-sm ${isFullScreen
                    ? 'inset-0 w-full h-full'
                    : 'bottom-24 right-6 w-80 h-96'
                    }`}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white font-bold flex items-center justify-between rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5" />
                            <span>Sales Assistant</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsFullScreen(!isFullScreen)}
                                className="hover:bg-blue-700 p-1 rounded transition-colors"
                                aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
                            >
                                {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-blue-700 p-1 rounded transition-colors"
                                aria-label="Close chat"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2 opacity-70">
                                <Sparkles className="w-8 h-8 text-yellow-400" />
                                <p className="text-xs font-medium">Ask me about our products!</p>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                {msg.role === 'model' && (
                                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                        <Bot className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed shadow-sm ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                                        }`}
                                >
                                    {renderMessage(msg.text)}
                                </div>
                                {msg.role === 'user' && (
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                                        <User className="w-3.5 h-3.5 text-blue-600" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start items-center gap-2 pl-8">
                                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2 rounded-b-lg">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2.5 bg-gray-100 border-transparent rounded-full focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-gray-700 placeholder-gray-400"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-colors"
                        >
                            <Send className="w-4 h-4 ml-0.5" />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default ChatBot;
