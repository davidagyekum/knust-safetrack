import { useState } from 'react';
import { User, Mail, Phone, MapPin, Bell, Shield, LogOut, ChevronRight, Edit2 } from 'lucide-react';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import MenuDrawer from '../components/MenuDrawer';

// Mock user data
const userData = {
    name: 'Kofi Mensah',
    studentId: '20481234',
    email: 'kofi.mensah@st.knust.edu.gh',
    phone: '+233 24 123 4567',
    hostel: 'Unity Hall (Conti)',
    emergencyContacts: [
        { name: 'Mom', phone: '+233 20 987 6543' },
        { name: 'Dad', phone: '+233 24 555 1234' },
    ],
};

const savedLocations = [
    { id: 1, name: 'Home (Hostel)', location: 'Unity Hall, Room 215' },
    { id: 2, name: 'Main Library', location: 'KNUST Library' },
    { id: 3, name: 'Tech Junction', location: 'Engineering Faculty' },
];

export default function Profile({ onSignOut }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="relative w-full min-h-screen bg-bg-primary pb-20">
            {/* Top Bar */}
            <TopBar
                currentLocation="Profile"
                showSearch={false}
                onMenuClick={() => setShowMenu(true)}
            />

            {/* Content */}
            <div className="pt-20 px-4">
                {/* Profile Header */}
                <div className="bg-bg-secondary rounded-2xl p-6 border border-border mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-text-primary">{userData.name}</h2>
                            <p className="text-sm text-text-secondary">ID: {userData.studentId}</p>
                            <div className="flex items-center gap-1 mt-1">
                                <div className="w-2 h-2 bg-primary rounded-full" />
                                <span className="text-xs text-primary">Active</span>
                            </div>
                        </div>
                        <button className="p-2 bg-bg-tertiary rounded-lg hover:bg-border transition-colors">
                            <Edit2 className="w-5 h-5 text-text-secondary" />
                        </button>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-bg-secondary rounded-xl border border-border mb-6 overflow-hidden">
                    <div className="px-4 py-3 border-b border-border">
                        <h3 className="font-semibold text-text-primary text-sm">Contact Information</h3>
                    </div>
                    <div className="divide-y divide-border">
                        <div className="flex items-center gap-3 px-4 py-3">
                            <Mail className="w-5 h-5 text-text-muted" />
                            <div className="flex-1">
                                <p className="text-xs text-text-secondary">Email</p>
                                <p className="text-sm text-text-primary">{userData.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3">
                            <Phone className="w-5 h-5 text-text-muted" />
                            <div className="flex-1">
                                <p className="text-xs text-text-secondary">Phone</p>
                                <p className="text-sm text-text-primary">{userData.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3">
                            <MapPin className="w-5 h-5 text-text-muted" />
                            <div className="flex-1">
                                <p className="text-xs text-text-secondary">Hostel</p>
                                <p className="text-sm text-text-primary">{userData.hostel}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Emergency Contacts */}
                <div className="bg-bg-secondary rounded-xl border border-border mb-6 overflow-hidden">
                    <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                        <h3 className="font-semibold text-text-primary text-sm">Emergency Contacts</h3>
                        <button className="text-xs text-primary hover:underline">+ Add</button>
                    </div>
                    <div className="divide-y divide-border">
                        {userData.emergencyContacts.map((contact, index) => (
                            <div key={index} className="flex items-center gap-3 px-4 py-3">
                                <div className="w-9 h-9 bg-danger/20 rounded-full flex items-center justify-center">
                                    <Shield className="w-4 h-4 text-danger" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-text-primary">{contact.name}</p>
                                    <p className="text-xs text-text-secondary">{contact.phone}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-text-muted" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Saved Locations */}
                <div className="bg-bg-secondary rounded-xl border border-border mb-6 overflow-hidden">
                    <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                        <h3 className="font-semibold text-text-primary text-sm">Saved Locations</h3>
                        <button className="text-xs text-primary hover:underline">+ Add</button>
                    </div>
                    <div className="divide-y divide-border">
                        {savedLocations.map((loc) => (
                            <div key={loc.id} className="flex items-center gap-3 px-4 py-3">
                                <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-text-primary">{loc.name}</p>
                                    <p className="text-xs text-text-secondary">{loc.location}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-text-muted" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Settings & Sign Out */}
                <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 bg-bg-secondary rounded-xl px-4 py-3.5 border border-border hover:border-primary/30 transition-colors">
                        <Bell className="w-5 h-5 text-text-secondary" />
                        <span className="flex-1 text-left text-sm text-text-primary">Notification Settings</span>
                        <ChevronRight className="w-5 h-5 text-text-muted" />
                    </button>

                    <button
                        onClick={onSignOut}
                        className="w-full flex items-center gap-3 bg-danger/10 rounded-xl px-4 py-3.5 border border-danger/20 hover:bg-danger/20 transition-colors"
                    >
                        <LogOut className="w-5 h-5 text-danger" />
                        <span className="flex-1 text-left text-sm font-medium text-danger">Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav activeTab="profile" />

            {/* Menu Drawer */}
            <MenuDrawer
                isOpen={showMenu}
                onClose={() => setShowMenu(false)}
                onSignOut={onSignOut}
            />
        </div>
    );
}
