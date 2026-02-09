import { useState } from 'react';
import { Clock, MapPin, Users, ChevronRight, Calendar } from 'lucide-react';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import MenuDrawer from '../components/MenuDrawer';

// Mock trip data
const tripHistory = [
    {
        id: 1,
        type: 'walk',
        title: 'Walk With Security',
        from: 'Main Library',
        to: 'Hall 7',
        date: 'Today, 10:34 PM',
        duration: '12 min',
        status: 'completed',
    },
    {
        id: 2,
        type: 'share',
        title: 'Location Shared',
        from: 'JQB',
        to: 'Brunei Hostel',
        date: 'Yesterday, 8:15 PM',
        duration: '18 min',
        status: 'completed',
    },
    {
        id: 3,
        type: 'walk',
        title: 'Walk With Friend',
        from: 'Tech Junction',
        to: 'Gaza',
        date: 'Feb 7, 9:20 PM',
        duration: '25 min',
        status: 'completed',
    },
    {
        id: 4,
        type: 'sos',
        title: 'SOS Alert',
        from: 'Near Casely-Hayford',
        to: 'Security Response',
        date: 'Feb 5, 11:45 PM',
        duration: '3 min',
        status: 'resolved',
    },
];

export default function Trips({ onSignOut }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="relative w-full min-h-screen bg-bg-primary pb-20">
            {/* Top Bar */}
            <TopBar
                currentLocation="Trip History"
                showSearch={false}
                onMenuClick={() => setShowMenu(true)}
            />

            {/* Content */}
            <div className="pt-20 px-4">
                {/* Stats Summary */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mb-2">
                            <Users className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-xl font-bold text-text-primary">12</p>
                        <p className="text-xs text-text-secondary">Safe Walks</p>
                    </div>
                    <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                        <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center mb-2">
                            <MapPin className="w-4 h-4 text-secondary" />
                        </div>
                        <p className="text-xl font-bold text-text-primary">8</p>
                        <p className="text-xs text-text-secondary">Locations Shared</p>
                    </div>
                    <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                        <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mb-2">
                            <Clock className="w-4 h-4 text-accent" />
                        </div>
                        <p className="text-xl font-bold text-text-primary">4.2h</p>
                        <p className="text-xs text-text-secondary">Total Time</p>
                    </div>
                </div>

                {/* Section Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-text-primary flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-text-secondary" />
                        Recent Activity
                    </h2>
                </div>

                {/* Trip List */}
                <div className="space-y-3">
                    {tripHistory.map((trip) => (
                        <div
                            key={trip.id}
                            className="bg-bg-secondary rounded-xl p-4 border border-border hover:border-primary/30 transition-colors cursor-pointer"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${trip.type === 'walk'
                                                ? 'bg-primary/20 text-primary'
                                                : trip.type === 'share'
                                                    ? 'bg-secondary/20 text-secondary'
                                                    : 'bg-danger/20 text-danger'
                                                }`}
                                        >
                                            {trip.title}
                                        </span>
                                        <span
                                            className={`text-xs ${trip.status === 'completed'
                                                ? 'text-primary'
                                                : 'text-secondary'
                                                }`}
                                        >
                                            ✓ {trip.status}
                                        </span>
                                    </div>
                                    <div className="text-sm text-text-primary mb-1">
                                        {trip.from} → {trip.to}
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-text-secondary">
                                        <span>{trip.date}</span>
                                        <span>• {trip.duration}</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-text-muted" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav activeTab="trips" />

            {/* Menu Drawer */}
            <MenuDrawer
                isOpen={showMenu}
                onClose={() => setShowMenu(false)}
                onSignOut={onSignOut}
            />
        </div>
    );
}
