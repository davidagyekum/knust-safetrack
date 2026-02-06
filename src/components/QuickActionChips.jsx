import { Users, Share2, AlertTriangle } from 'lucide-react';

const chips = [
    { id: 'walk', label: 'Walk With Me', icon: Users, color: 'secondary' },
    { id: 'share', label: 'Share Location', icon: Share2, color: 'primary' },
    { id: 'report', label: 'Report Issue', icon: AlertTriangle, color: 'text-secondary' },
];

export default function QuickActionChips({ onWalkWithMe }) {
    const handleChipClick = (chipId) => {
        if (chipId === 'walk' && onWalkWithMe) {
            onWalkWithMe();
        } else if (chipId === 'share') {
            // Share location functionality
            alert('Location sharing link copied!');
        } else if (chipId === 'report') {
            // Report issue functionality
            alert('Report Issue feature coming soon!');
        }
    };

    return (
        <div
            className="absolute z-[1000] left-0 right-0 px-4 overflow-x-auto hide-scrollbar"
            style={{ bottom: 'calc(64px + 140px + 12px)' }}
        >
            <div className="flex gap-2 w-max">
                {chips.map((chip) => {
                    const Icon = chip.icon;
                    const bgColor = chip.color === 'secondary'
                        ? 'bg-secondary/20 hover:bg-secondary/30'
                        : chip.color === 'primary'
                            ? 'bg-primary/20 hover:bg-primary/30'
                            : 'bg-bg-tertiary hover:bg-border';
                    const textColor = chip.color === 'secondary'
                        ? 'text-secondary'
                        : chip.color === 'primary'
                            ? 'text-primary'
                            : 'text-text-secondary';

                    return (
                        <button
                            key={chip.id}
                            onClick={() => handleChipClick(chip.id)}
                            className={`flex items-center gap-2 px-4 py-2 ${bgColor} rounded-full transition-colors whitespace-nowrap`}
                        >
                            <Icon className={`w-4 h-4 ${textColor}`} />
                            <span className={`text-sm font-medium ${textColor}`}>{chip.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

