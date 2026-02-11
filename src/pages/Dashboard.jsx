import { useRef, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import SOSAlertsPanel from '../components/dashboard/SOSAlertsPanel';
import DashboardMap from '../components/dashboard/DashboardMap';
import StatsOverview from '../components/dashboard/StatsOverview';
import { Map, Flame, Menu, AlertTriangle, X } from 'lucide-react';
import { ACTIVE_SOS_ALERTS } from '../data/dashboardData';
import useFocusTrap from '../hooks/useFocusTrap';

export default function Dashboard({ onSignOut }) {
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
                                {activeTab === 'dashboard' && 'Security Dashboard'}
                                {activeTab === 'sos' && 'Active SOS Alerts'}
                                {activeTab === 'shuttles' && 'Shuttle Monitoring'}
                                {activeTab === 'heatmap' && 'Traffic Heatmap'}
                                {activeTab === 'settings' && 'Settings'}
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

                    {/* View Toggle */}
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
                </header>

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
            </div>

            {/* Desktop (lg-xl): right drawer panel */}
            {alertsDrawerOpen && (
                <div className="fixed inset-0 z-[3500] hidden lg:flex xl:hidden" role="dialog" aria-modal="true" aria-label="SOS panel">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setAlertsDrawerOpen(false)} />
                    <div ref={drawerRef} className="relative ml-auto h-full w-[min(380px,100vw)] bg-bg-secondary border-l border-border flex flex-col">
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
