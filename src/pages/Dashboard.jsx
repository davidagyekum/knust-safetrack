import { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import SOSAlertsPanel from '../components/dashboard/SOSAlertsPanel';
import DashboardMap from '../components/dashboard/DashboardMap';
import StatsOverview from '../components/dashboard/StatsOverview';
import { Map, Flame } from 'lucide-react';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [showHeatmap, setShowHeatmap] = useState(false);

    const handleAlertSelect = (alert) => {
        setSelectedAlert(alert);
    };

    return (
        <div className="flex h-screen bg-bg-primary overflow-hidden">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-bg-secondary border-b border-border px-6 py-4 flex items-center justify-between">
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

                    {/* View Toggle */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowHeatmap(false)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${!showHeatmap
                                    ? 'bg-primary text-bg-primary'
                                    : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
                                }`}
                        >
                            <Map className="w-4 h-4" />
                            Live Map
                        </button>
                        <button
                            onClick={() => setShowHeatmap(true)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${showHeatmap
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
                <div className="flex-1 flex overflow-hidden">
                    <DashboardMap
                        showHeatmap={showHeatmap}
                        selectedAlert={selectedAlert}
                        onAlertClick={handleAlertSelect}
                    />
                    <SOSAlertsPanel
                        selectedAlertId={selectedAlert?.id}
                        onSelectAlert={handleAlertSelect}
                    />
                </div>
            </div>
        </div>
    );
}
