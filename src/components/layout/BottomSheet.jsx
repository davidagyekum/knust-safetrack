import { useState } from 'react';
import { ChevronUp, Bus, Clock, ArrowRight } from 'lucide-react';
import { getNextShuttle, BUS_STOPS } from '../../data/mockData';

export default function BottomSheet() {
    const [isExpanded, setIsExpanded] = useState(false);
    const nextShuttle = getNextShuttle();

    return (
        <div
            className={`absolute left-0 right-0 z-[1000] bg-bg-secondary rounded-t-2xl border-t border-border bottom-sheet ${isExpanded ? 'h-[65vh]' : 'h-auto'
                }`}
            style={{ bottom: '64px' }}
        >
            {/* Drag Handle */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex justify-center py-2 cursor-pointer"
                aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
            >
                <div className="w-10 h-1 bg-bg-tertiary rounded-full" />
            </button>

            {/* Collapsed Content */}
            <div className="px-4 pb-4">
                {/* Next Shuttle Info */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Bus className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary">Next Shuttle at</p>
                            <p className="font-semibold text-text-primary">{nextShuttle.stop}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-1 text-primary">
                            <Clock className="w-4 h-4" />
                            <span className="font-bold text-lg">{nextShuttle.eta} min</span>
                        </div>
                        <p className="text-xs text-text-secondary">{nextShuttle.route}</p>
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex gap-3">
                    <button className="flex-1 py-2.5 bg-primary text-bg-primary font-medium rounded-xl hover:bg-primary-dark transition-colors">
                        Details
                    </button>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-4 pb-4 overflow-y-auto max-h-[calc(65vh-140px)] hide-scrollbar">
                    {/* Section Header */}
                    <div className="flex items-center justify-between py-3 border-t border-border">
                        <h3 className="font-semibold text-text-primary">Nearby Stops</h3>
                        <ChevronUp
                            className="w-5 h-5 text-text-secondary cursor-pointer"
                            onClick={() => setIsExpanded(false)}
                        />
                    </div>

                    {/* Bus Stops List */}
                    <div className="space-y-2">
                        {BUS_STOPS.slice(0, 5).map((stop) => (
                            <div
                                key={stop.id}
                                className="flex items-center justify-between p-3 bg-bg-primary rounded-xl hover:bg-bg-tertiary/50 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                                        <Bus className="w-4 h-4 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-text-primary text-sm">{stop.name}</p>
                                        <p className="text-xs text-text-secondary">2 buses nearby</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-primary">3 min</span>
                                    <ArrowRight className="w-4 h-4 text-text-secondary" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
