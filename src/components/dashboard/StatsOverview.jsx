import { AlertTriangle, Users, Shield, CheckCircle, Clock, Activity } from 'lucide-react';
import { DASHBOARD_STATS } from '../../data/dashboardData';

const stats = [
    {
        id: 'alerts',
        label: 'Active SOS Alerts',
        value: DASHBOARD_STATS.activeAlerts,
        icon: AlertTriangle,
        color: 'danger',
        urgent: true
    },
    {
        id: 'walks',
        label: 'Active Walks',
        value: DASHBOARD_STATS.activeWalks,
        icon: Users,
        color: 'secondary'
    },
    {
        id: 'patrols',
        label: 'Patrols On Duty',
        value: DASHBOARD_STATS.patrolsOnDuty,
        icon: Shield,
        color: 'primary'
    },
    {
        id: 'resolved',
        label: 'Resolved Today',
        value: DASHBOARD_STATS.resolvedToday,
        icon: CheckCircle,
        color: 'secondary'
    },
    {
        id: 'response',
        label: 'Avg. Response Time',
        value: DASHBOARD_STATS.averageResponseTime,
        icon: Clock,
        color: 'primary'
    },
    {
        id: 'students',
        label: 'Students Active',
        value: DASHBOARD_STATS.studentsActive,
        icon: Activity,
        color: 'text-secondary'
    },
];

export default function StatsOverview() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 p-4 bg-bg-secondary border-b border-border">
            {stats.map((stat) => {
                const Icon = stat.icon;
                const bgColor = stat.color === 'danger'
                    ? 'bg-danger/20'
                    : stat.color === 'secondary'
                        ? 'bg-secondary/20'
                        : stat.color === 'primary'
                            ? 'bg-primary/20'
                            : 'bg-bg-tertiary';
                const textColor = stat.color === 'danger'
                    ? 'text-danger'
                    : stat.color === 'secondary'
                        ? 'text-secondary'
                        : stat.color === 'primary'
                            ? 'text-primary'
                            : 'text-text-secondary';

                return (
                    <div
                        key={stat.id}
                        className={`p-3 rounded-xl ${bgColor} ${stat.urgent ? 'animate-pulse-subtle' : ''}`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Icon className={`w-4 h-4 ${textColor}`} />
                            <span className="text-xs text-text-secondary">{stat.label}</span>
                        </div>
                        <p className={`text-2xl font-bold ${textColor}`}>{stat.value}</p>
                    </div>
                );
            })}
        </div>
    );
}
