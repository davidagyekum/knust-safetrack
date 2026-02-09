import {
    LayoutDashboard,
    AlertTriangle,
    MapPin,
    Settings,
    Shield,
    LogOut
} from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sos', label: 'Active SOS', icon: AlertTriangle, badge: 3 },
    { id: 'heatmap', label: 'Heatmap', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange }) {
    return (
        <aside className="w-60 bg-bg-secondary border-r border-border flex flex-col h-screen">
            {/* Logo Header */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                    <img
                        src="/knust-logo.png"
                        alt="KNUST Logo"
                        className="w-10 h-10 object-contain"
                    />
                    <div>
                        <h1 className="font-bold text-text-primary text-sm">KNUST SafeTrack</h1>
                        <p className="text-xs text-text-secondary">Security Dashboard</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${isActive
                                ? 'bg-primary/20 text-primary'
                                : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium text-sm flex-1">{item.label}</span>
                            {item.badge && (
                                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${isActive ? 'bg-primary text-bg-primary' : 'bg-danger text-white'
                                    }`}>
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="p-3 border-t border-border">
                <div className="flex items-center gap-3 p-2">
                    <div className="w-9 h-9 bg-secondary/30 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">Security Admin</p>
                        <p className="text-xs text-text-secondary">On Duty</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors">
                        <LogOut className="w-4 h-4 text-text-muted" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
