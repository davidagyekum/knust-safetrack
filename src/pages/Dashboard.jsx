import { useRef, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import SOSAlertsPanel from '../components/dashboard/SOSAlertsPanel';
import DashboardMap from '../components/dashboard/DashboardMap';
import StatsOverview from '../components/dashboard/StatsOverview';
import { Map, Flame, Menu, AlertTriangle, X, Shield, Bell, Clock, Users, MapPin, Settings, LogOut, CheckCircle } from 'lucide-react';
import { ACTIVE_SOS_ALERTS } from '../data/dashboardData';
import useFocusTrap from '../hooks/useFocusTrap';
import useToast from '../hooks/useToast.js';

export default function Dashboard({ onSignOut }) {
    const toast = useToast();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [alertsDrawerOpen, setAlertsDrawerOpen] = useState(false);
    const [alertsDockedOpen, setAlertsDockedOpen] = useState(true);
    const drawerRef = useRef(null);
    const drawerCloseRef = useRef(null);
    useFocusTrap({ enabled: alertsDrawerOpen, containerRef: drawerRef, initialFocusRef: drawerCloseRef });

    const handleAlertSelect = (alert) => {
        setSelectedAlert(alert);
    };

    // Get header title based on active tab
    const getHeaderTitle = () => {
        switch (activeTab) {
            case 'sos': return 'Active SOS Alerts';
            case 'heatmap': return 'Traffic Heatmap';
            case 'settings': return 'Settings';
            default: return 'Security Dashboard';
        }
    };

    // Render the main content based on active tab
    const renderMainContent = () => {
        switch (activeTab) {
            case 'sos':
                return (
                    <div className="flex-1 min-h-0 overflow-y-auto">
                        <div className="p-4 sm:p-6">
                            {/* SOS Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                <div className="bg-danger/10 border border-danger/30 rounded-xl p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-danger/20 rounded-full flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5 text-danger" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-danger">{ACTIVE_SOS_ALERTS.filter(a => a.status === 'active').length}</p>
                                        <p className="text-xs text-text-secondary">Active Alerts</p>
                                    </div>
                                </div>
                                <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-primary">{ACTIVE_SOS_ALERTS.filter(a => a.status === 'responding').length}</p>
                                        <p className="text-xs text-text-secondary">Responding</p>
                                    </div>
                                </div>
                                <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-secondary">12</p>
                                        <p className="text-xs text-text-secondary">Resolved Today</p>
                                    </div>
                                </div>
                            </div>

                            {/* Full SOS List */}
                            <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">All Active Alerts</h3>
                            <div className="space-y-3">
                                {ACTIVE_SOS_ALERTS.map((alert) => (
                                    <div
                                        key={alert.id}
                                        onClick={() => handleAlertSelect(alert)}
                                        className={`p-4 rounded-xl cursor-pointer transition-all bg-bg-secondary border ${selectedAlert?.id === alert.id
                                            ? 'border-danger bg-danger/10'
                                            : 'border-border hover:border-border hover:bg-bg-tertiary/30'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${alert.status === 'active'
                                                ? 'bg-danger/30 text-danger'
                                                : 'bg-primary/30 text-primary'
                                                }`}>
                                                {alert.status === 'active' ? '● Active' : '◎ Responding'}
                                            </span>
                                            <span className="text-xs text-text-muted flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)} min ago
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-bg-tertiary rounded-full flex items-center justify-center">
                                                <Users className="w-5 h-5 text-text-secondary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-text-primary">{alert.studentName}</p>
                                                <p className="text-xs text-text-secondary">ID: {alert.studentId}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-text-secondary text-sm mb-3">
                                            <MapPin className="w-4 h-4" />
                                            {alert.location}
                                        </div>
                                        <div className="flex gap-2">
                                            <button type="button" onClick={(e) => { e.stopPropagation(); toast.info(`Calling ${alert.studentName}...`); }}
                                                className="flex-1 py-2.5 bg-secondary text-white text-sm font-medium rounded-lg hover:bg-secondary-light transition-colors">
                                                Call Student
                                            </button>
                                            <button type="button" onClick={(e) => { e.stopPropagation(); toast.success(`Patrol assigned to ${alert.location}.`); }}
                                                className="flex-1 py-2.5 bg-primary text-bg-primary text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                                                Assign Patrol
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'heatmap':
                return (
                    <div className="flex-1 min-h-0 flex flex-col">
                        <div className="p-4 sm:p-6 border-b border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-danger/20 rounded-full flex items-center justify-center">
                                    <Flame className="w-5 h-5 text-danger" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-text-primary">Campus Activity Heatmap</h3>
                                    <p className="text-sm text-text-secondary">Showing incident density over the last 7 days</p>
                                </div>
                            </div>
                            {/* Legend */}
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-secondary/60"></div>
                                    <span className="text-xs text-text-secondary">Low Activity</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-primary/60"></div>
                                    <span className="text-xs text-text-secondary">Medium</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-danger/60"></div>
                                    <span className="text-xs text-text-secondary">High Activity</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 min-h-0">
                            <DashboardMap
                                showHeatmap={true}
                                selectedAlert={selectedAlert}
                                onAlertClick={handleAlertSelect}
                            />
                        </div>
                    </div>
                );

            case 'settings':
                return (
                    <div className="flex-1 min-h-0 overflow-y-auto">
                        <div className="p-4 sm:p-6 max-w-2xl">
                            {/* Notification Settings */}
                            <div className="bg-bg-secondary rounded-xl border border-border p-5 mb-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <Bell className="w-5 h-5 text-primary" />
                                    <h3 className="font-semibold text-text-primary">Notification Settings</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { label: 'SOS Alert Notifications', desc: 'Get notified when a new SOS is triggered', defaultChecked: true },
                                        { label: 'Patrol Assignment Alerts', desc: 'Alerts for new patrol assignments', defaultChecked: true },
                                        { label: 'System Updates', desc: 'Updates about system maintenance', defaultChecked: false },
                                        { label: 'Sound Alerts', desc: 'Play sound for critical SOS alerts', defaultChecked: true },
                                    ].map((setting) => (
                                        <div key={setting.label} className="flex items-center justify-between py-2">
                                            <div>
                                                <p className="text-sm font-medium text-text-primary">{setting.label}</p>
                                                <p className="text-xs text-text-secondary">{setting.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked={setting.defaultChecked} className="sr-only peer" />
                                                <div className="w-11 h-6 bg-bg-tertiary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Security Profile */}
                            <div className="bg-bg-secondary rounded-xl border border-border p-5 mb-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <Shield className="w-5 h-5 text-secondary" />
                                    <h3 className="font-semibold text-text-primary">Security Profile</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-2 border-b border-border">
                                        <span className="text-sm text-text-secondary">Name</span>
                                        <span className="text-sm font-medium text-text-primary">Security Admin</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-border">
                                        <span className="text-sm text-text-secondary">Shift</span>
                                        <span className="text-sm font-medium text-text-primary">Night (6PM - 6AM)</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-border">
                                        <span className="text-sm text-text-secondary">Area</span>
                                        <span className="text-sm font-medium text-text-primary">Main Campus, KNUST</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-sm text-text-secondary">Status</span>
                                        <span className="text-sm font-medium text-secondary">● On Duty</span>
                                    </div>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-bg-secondary rounded-xl border border-danger/30 p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <LogOut className="w-5 h-5 text-danger" />
                                    <h3 className="font-semibold text-text-primary">Account</h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={onSignOut}
                                    className="w-full py-3 bg-danger/10 text-danger border border-danger/30 font-medium rounded-lg hover:bg-danger/20 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                );

            default: // 'dashboard'
                return (
                    <>
                        {/* Stats Overview */}
                        <StatsOverview />

                        {/* Map + Alerts Panel */}
                        <div className="flex-1 min-h-0 flex flex-col xl:flex-row overflow-hidden">
                            <div className="flex-1 min-h-0 flex flex-col">
                                <div className="flex-1 min-h-0">
                                    <DashboardMap
                                        showHeatmap={showHeatmap}
                                        selectedAlert={selectedAlert}
                                        onAlertClick={handleAlertSelect}
                                    />
                                </div>

                                {/* Mobile: stack panel below map */}
                                <div className="lg:hidden min-h-0 h-[45dvh]">
                                    <SOSAlertsPanel
                                        selectedAlertId={selectedAlert?.id}
                                        onSelectAlert={handleAlertSelect}
                                    />
                                </div>
                            </div>

                            {/* Desktop (xl+): docked right panel (collapsible) */}
                            {alertsDockedOpen && (
                                <div className="hidden xl:block w-80 min-h-0">
                                    <SOSAlertsPanel
                                        selectedAlertId={selectedAlert?.id}
                                        onSelectAlert={handleAlertSelect}
                                    />
                                </div>
                            )}
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="flex h-[100dvh] bg-bg-primary overflow-hidden">
            {/* Sidebar (desktop) */}
            <div className="hidden md:flex">
                <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onSignOut={onSignOut} />
            </div>

            {/* Sidebar (mobile drawer) */}
            {mobileSidebarOpen && (
                <Sidebar
                    variant="drawer"
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onClose={() => setMobileSidebarOpen(false)}
                    onSignOut={onSignOut}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-bg-secondary border-b border-border px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h1 className="text-xl font-bold text-text-primary">
                                {getHeaderTitle()}
                            </h1>
                            <p className="text-sm text-text-secondary">
                                Real-time campus security monitoring
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setMobileSidebarOpen(true)}
                            className="md:hidden w-10 h-10 rounded-lg bg-bg-tertiary text-text-primary flex items-center justify-center hover:bg-border transition-colors shrink-0"
                            aria-label="Open menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>

                    {/* View Toggle — only show on dashboard tab */}
                    {activeTab === 'dashboard' && (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={() => {
                                    if (window.matchMedia('(min-width: 1280px)').matches) {
                                        setAlertsDockedOpen((v) => !v);
                                    } else {
                                        setAlertsDrawerOpen(true);
                                    }
                                }}
                                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-tertiary text-text-secondary hover:text-text-primary hover:bg-border transition-colors"
                                aria-label="Toggle SOS panel"
                            >
                                <AlertTriangle className="w-4 h-4 text-danger" />
                                <span className="font-medium">SOS Panel</span>
                                <span className="ml-1 px-2 py-0.5 text-xs font-bold rounded-full bg-danger text-white">
                                    {ACTIVE_SOS_ALERTS.length}
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowHeatmap(false)}
                                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${!showHeatmap
                                    ? 'bg-primary text-bg-primary'
                                    : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                <Map className="w-4 h-4" />
                                Live Map
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowHeatmap(true)}
                                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${showHeatmap
                                    ? 'bg-primary text-bg-primary'
                                    : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                <Flame className="w-4 h-4" />
                                Heatmap
                            </button>
                        </div>
                    )}
                </header>

                {/* Tab Content */}
                {renderMainContent()}
            </div>

            {/* Desktop (lg-xl): right drawer panel */}
            {alertsDrawerOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 3500, display: 'flex' }} role="dialog" aria-modal="true" aria-label="SOS panel">
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={() => setAlertsDrawerOpen(false)} />
                    <div ref={drawerRef} className="relative ml-auto h-full bg-bg-secondary border-l border-border flex flex-col" style={{ width: 'min(380px, 100vw)' }}>
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-danger" />
                                <span className="font-bold text-text-primary">Active SOS</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setAlertsDrawerOpen(false)}
                                className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
                                aria-label="Close SOS panel"
                                ref={drawerCloseRef}
                            >
                                <X className="w-5 h-5 text-text-secondary" />
                            </button>
                        </div>
                        <div className="flex-1 min-h-0">
                            <SOSAlertsPanel
                                selectedAlertId={selectedAlert?.id}
                                onSelectAlert={handleAlertSelect}
                                hideHeader={true}
                                className="border-0 lg:border-0"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
