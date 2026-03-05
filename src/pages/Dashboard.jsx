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
                    <div className="flex-1 min-h-0 flex flex-col relative">
                        {/* Compact legend bar overlaying the map */}
                        <div className="bg-bg-secondary/90 backdrop-blur-sm border-b border-border px-3 py-2 flex items-center gap-3 flex-wrap z-10">
                            <Flame className="w-4 h-4 text-danger shrink-0" />
                            <span className="text-xs font-medium text-text-primary">Incident Density (7d)</span>
                            <span className="text-text-muted">|</span>
                            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-secondary/60"></div><span className="text-[10px] text-text-secondary">Low</span></div>
                            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-primary/60"></div><span className="text-[10px] text-text-secondary">Med</span></div>
                            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-danger/60"></div><span className="text-[10px] text-text-secondary">High</span></div>
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
                        <div className="p-3 sm:p-4">
                            {/* Notification Settings */}
                            <div className="bg-bg-secondary rounded-xl border border-border p-4 mb-3">
                                <div className="flex items-center gap-2 mb-3">
                                    <Bell className="w-4 h-4 text-primary" />
                                    <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { label: 'SOS Alerts', desc: 'New SOS triggered', defaultChecked: true },
                                        { label: 'Patrol Alerts', desc: 'New assignments', defaultChecked: true },
                                        { label: 'System Updates', desc: 'Maintenance info', defaultChecked: false },
                                        { label: 'Sound Alerts', desc: 'Critical SOS sounds', defaultChecked: true },
                                    ].map((setting) => (
                                        <div key={setting.label} className="flex items-center justify-between gap-3 py-1.5">
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-text-primary truncate">{setting.label}</p>
                                                <p className="text-xs text-text-secondary truncate">{setting.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                                <input type="checkbox" defaultChecked={setting.defaultChecked} className="sr-only peer" />
                                                <div className="w-9 h-5 bg-bg-tertiary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Security Profile */}
                            <div className="bg-bg-secondary rounded-xl border border-border p-4 mb-3">
                                <div className="flex items-center gap-2 mb-3">
                                    <Shield className="w-4 h-4 text-secondary" />
                                    <h3 className="text-sm font-semibold text-text-primary">Profile</h3>
                                </div>
                                <div className="space-y-0">
                                    {[
                                        { key: 'Name', val: 'Security Admin' },
                                        { key: 'Shift', val: 'Night (6PM–6AM)' },
                                        { key: 'Area', val: 'Main Campus' },
                                        { key: 'Status', val: '● On Duty', color: 'text-secondary' },
                                    ].map((row, i, arr) => (
                                        <div key={row.key} className={`flex items-center justify-between py-2 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
                                            <span className="text-xs text-text-secondary">{row.key}</span>
                                            <span className={`text-xs font-medium ${row.color || 'text-text-primary'}`}>{row.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sign Out */}
                            <div className="bg-bg-secondary rounded-xl border border-danger/30 p-4">
                                <button
                                    type="button"
                                    onClick={onSignOut}
                                    className="w-full py-2.5 bg-danger/10 text-danger border border-danger/30 text-sm font-medium rounded-lg hover:bg-danger/20 transition-colors"
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
                                <div className="lg:hidden min-h-0 h-[45dvh] bg-bg-secondary">
                                    <SOSAlertsPanel
                                        selectedAlertId={selectedAlert?.id}
                                        onSelectAlert={handleAlertSelect}
                                    />
                                </div>
                            </div>

                            {/* Desktop (xl+): docked right panel — always visible */}
                            <div className="hidden xl:block w-80 min-h-0 bg-bg-secondary">
                                <SOSAlertsPanel
                                    selectedAlertId={selectedAlert?.id}
                                    onSelectAlert={handleAlertSelect}
                                />
                            </div>
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
                                onClick={() => setShowHeatmap(false)}
                                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${!showHeatmap
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
                                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${showHeatmap
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
