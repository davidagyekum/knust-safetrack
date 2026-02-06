import { AlertTriangle, Phone, MapPin, User, Clock, CheckCircle } from 'lucide-react';
import { ACTIVE_SOS_ALERTS } from '../../data/dashboardData';

function formatTimeAgo(date) {
    const mins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (mins < 1) return 'Just now';
    if (mins === 1) return '1 min ago';
    return `${mins} mins ago`;
}

export default function SOSAlertsPanel({ onSelectAlert, selectedAlertId }) {
    return (
        <div className="w-80 bg-bg-secondary border-l border-border h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-danger" />
                        <h2 className="font-bold text-text-primary">Active SOS</h2>
                    </div>
                    <span className="px-2 py-1 bg-danger/20 text-danger text-xs font-bold rounded-full">
                        {ACTIVE_SOS_ALERTS.length} Active
                    </span>
                </div>
            </div>

            {/* Alerts List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {ACTIVE_SOS_ALERTS.map((alert) => (
                    <div
                        key={alert.id}
                        onClick={() => onSelectAlert(alert)}
                        className={`p-3 rounded-xl cursor-pointer transition-all ${selectedAlertId === alert.id
                                ? 'bg-danger/20 border border-danger'
                                : 'bg-bg-primary hover:bg-bg-tertiary/50 border border-transparent'
                            } ${alert.status === 'active' ? 'animate-pulse-subtle' : ''}`}
                    >
                        {/* Status Badge */}
                        <div className="flex items-center justify-between mb-2">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${alert.status === 'active'
                                    ? 'bg-danger/30 text-danger'
                                    : 'bg-primary/30 text-primary'
                                }`}>
                                {alert.status === 'active' ? '🔴 Active' : '🟡 Responding'}
                            </span>
                            <span className="text-xs text-text-muted flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTimeAgo(alert.timestamp)}
                            </span>
                        </div>

                        {/* Student Info */}
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-bg-tertiary rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-text-secondary" />
                            </div>
                            <div>
                                <p className="font-medium text-text-primary text-sm">{alert.studentName}</p>
                                <p className="text-xs text-text-secondary">ID: {alert.studentId}</p>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-text-secondary text-xs mb-3">
                            <MapPin className="w-3 h-3" />
                            {alert.location}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-secondary text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1 hover:bg-secondary-light transition-colors">
                                <Phone className="w-3 h-3" />
                                Call
                            </button>
                            <button className="flex-1 py-2 bg-primary text-bg-primary text-xs font-medium rounded-lg flex items-center justify-center gap-1 hover:bg-primary-dark transition-colors">
                                <MapPin className="w-3 h-3" />
                                View
                            </button>
                            <button className="flex-1 py-2 bg-bg-tertiary text-text-primary text-xs font-medium rounded-lg flex items-center justify-center gap-1 hover:bg-border transition-colors">
                                <CheckCircle className="w-3 h-3" />
                                Assign
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
