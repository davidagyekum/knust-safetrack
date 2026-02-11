import { useState } from 'react';
import { AlertTriangle, Shield, MapPin, Clock } from 'lucide-react';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import MenuDrawer from '../components/MenuDrawer';

const mockAlerts = [
  {
    id: 1,
    title: 'Safety Notice',
    message: 'Avoid unlit paths near Tech Junction after 10 PM.',
    location: 'Tech Junction',
    time: 'Today, 9:42 PM',
    type: 'notice',
  },
  {
    id: 2,
    title: 'Shuttle Update',
    message: 'Route A delays due to high traffic near Commercial Area.',
    location: 'Commercial Area',
    time: 'Today, 8:15 PM',
    type: 'shuttle',
  },
  {
    id: 3,
    title: 'Security Advisory',
    message: 'Increased patrols around Main Library tonight.',
    location: 'Main Library',
    time: 'Feb 9, 7:05 PM',
    type: 'security',
  },
];

export default function Alerts({ onSignOut }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-bg-primary pb-20">
      <TopBar
        currentLocation="Alerts"
        showSearch={false}
        onMenuClick={() => setShowMenu(true)}
      />

      <div className="pt-20 px-4">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-text-primary">Latest Updates</h2>
        </div>

        {mockAlerts.length === 0 ? (
          <div className="bg-bg-secondary rounded-xl p-6 border border-border text-center">
            <p className="font-semibold text-text-primary">No alerts yet</p>
            <p className="text-sm text-text-secondary mt-1">
              Updates and safety notices will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockAlerts.map((alert) => {
            const badge =
              alert.type === 'security'
                ? { bg: 'bg-secondary/20', text: 'text-secondary', icon: Shield }
                : alert.type === 'shuttle'
                  ? { bg: 'bg-accent/20', text: 'text-accent', icon: MapPin }
                  : { bg: 'bg-primary/20', text: 'text-primary', icon: AlertTriangle };

            const Icon = badge.icon;

            return (
              <div
                key={alert.id}
                className="bg-bg-secondary rounded-xl p-4 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 ${badge.bg} rounded-lg flex items-center justify-center shrink-0`}
                    aria-hidden="true"
                  >
                    <Icon className={`w-5 h-5 ${badge.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-text-primary">{alert.title}</p>
                        <p className="text-sm text-text-secondary mt-1">{alert.message}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {alert.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        )}
      </div>

      <BottomNav activeTab="alerts" />

      <MenuDrawer
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onSignOut={onSignOut}
      />
    </div>
  );
}
