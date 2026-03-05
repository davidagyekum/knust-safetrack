import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, ArrowLeft, Search, Users, Clock, ChevronRight } from 'lucide-react';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import MenuDrawer from '../components/MenuDrawer';

// Mock conversation data
const CONVERSATIONS = [
    {
        id: 1,
        name: 'Kwame Asante',
        hostel: 'Unity Hall',
        lastMessage: 'Are you heading to the library tonight?',
        time: '9:42 PM',
        unread: 2,
        avatar: 'KA',
    },
    {
        id: 2,
        name: 'Ama Serwaa',
        hostel: 'Queens Hall',
        lastMessage: 'Thanks for the walk! Got home safe 🙏',
        time: '8:15 PM',
        unread: 0,
        avatar: 'AS',
    },
    {
        id: 3,
        name: 'Walk Group — Brunei',
        hostel: 'Group • 4 members',
        lastMessage: 'Kofi: Who is heading to Brunei around 10?',
        time: '7:50 PM',
        unread: 5,
        avatar: 'WG',
        isGroup: true,
    },
    {
        id: 4,
        name: 'Yaw Mensah',
        hostel: 'Hall 7 (Brunei)',
        lastMessage: 'I just saw security near Tech Junction',
        time: 'Yesterday',
        unread: 0,
        avatar: 'YM',
    },
    {
        id: 5,
        name: 'Abena Osei',
        hostel: 'Ayeduase Hostel',
        lastMessage: 'Let me know when you leave the lab',
        time: 'Yesterday',
        unread: 0,
        avatar: 'AO',
    },
];

const MOCK_MESSAGES = [
    { id: 1, sender: 'them', text: 'Hey! Are you still at the library?', time: '9:30 PM' },
    { id: 2, sender: 'me', text: 'Yeah I am. Planning to leave around 10', time: '9:32 PM' },
    { id: 3, sender: 'them', text: 'Are you heading to the library tonight?', time: '9:42 PM' },
    { id: 4, sender: 'them', text: 'I was thinking we could walk together. Same direction', time: '9:42 PM' },
];

export default function Chat({ onSignOut }) {
    const [showMenu, setShowMenu] = useState(false);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (activeChat) scrollToBottom();
    }, [messages, activeChat]);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                sender: 'me',
                text: newMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
        ]);
        setNewMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const filteredConversations = CONVERSATIONS.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Individual chat view
    if (activeChat) {
        const chat = CONVERSATIONS.find((c) => c.id === activeChat);
        return (
            <div className="relative w-full h-screen flex flex-col bg-bg-primary">
                {/* Chat Header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-bg-secondary border-b border-border safe-area-top">
                    <button
                        onClick={() => setActiveChat(null)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-bg-tertiary transition-colors"
                        aria-label="Back"
                    >
                        <ArrowLeft className="w-5 h-5 text-text-primary" />
                    </button>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${chat?.isGroup ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                        {chat?.avatar}
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-text-primary text-sm">{chat?.name}</p>
                        <p className="text-xs text-text-secondary">{chat?.hostel}</p>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${msg.sender === 'me'
                                    ? 'bg-primary text-bg-primary rounded-br-md'
                                    : 'bg-bg-secondary text-text-primary rounded-bl-md'
                                    }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                                <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-bg-primary/70' : 'text-text-muted'}`}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="px-4 py-3 bg-bg-secondary border-t border-border safe-area-bottom">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 h-11 px-4 bg-bg-primary border border-border rounded-full text-text-primary text-sm outline-none focus:border-primary transition-colors"
                            style={{ fontSize: '16px' }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!newMessage.trim()}
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${newMessage.trim()
                                ? 'bg-primary text-bg-primary'
                                : 'bg-bg-tertiary text-text-muted'
                                }`}
                            aria-label="Send message"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Conversation list view
    return (
        <div className="relative w-full min-h-screen bg-bg-primary pb-20">
            <TopBar
                currentLocation="Messages"
                showSearch={false}
                onMenuClick={() => setShowMenu(true)}
            />

            <div className="pt-20 px-4">
                {/* Search Bar */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 bg-bg-secondary border border-border rounded-xl text-text-primary text-sm outline-none focus:border-primary transition-colors"
                        style={{ fontSize: '16px' }}
                    />
                </div>

                {/* Section Header */}
                <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold text-text-primary">Recent Chats</h2>
                </div>

                {/* Conversation List */}
                <div className="space-y-2">
                    {filteredConversations.length === 0 ? (
                        <div className="bg-bg-secondary rounded-xl p-6 border border-border text-center">
                            <p className="font-semibold text-text-primary">No conversations yet</p>
                            <p className="text-sm text-text-secondary mt-1">
                                Start a walk with someone to begin chatting
                            </p>
                        </div>
                    ) : (
                        filteredConversations.map((convo) => (
                            <button
                                key={convo.id}
                                onClick={() => setActiveChat(convo.id)}
                                className="w-full flex items-center gap-3 p-3 bg-bg-secondary rounded-xl border border-border hover:border-primary/30 transition-colors text-left"
                            >
                                {/* Avatar */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${convo.isGroup ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                                    {convo.avatar}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="font-semibold text-text-primary text-sm truncate">{convo.name}</p>
                                        <span className="text-xs text-text-muted shrink-0">{convo.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 mt-0.5">
                                        <p className="text-sm text-text-secondary truncate">{convo.lastMessage}</p>
                                        {convo.unread > 0 && (
                                            <span className="w-5 h-5 bg-primary text-bg-primary text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                                                {convo.unread}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-text-muted mt-0.5">{convo.hostel}</p>
                                </div>

                                <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
                            </button>
                        ))
                    )}
                </div>
            </div>

            <BottomNav activeTab="chat" />

            <MenuDrawer
                isOpen={showMenu}
                onClose={() => setShowMenu(false)}
                onSignOut={onSignOut}
            />
        </div>
    );
}
