import { Menu, Search, MapPin } from 'lucide-react';

export default function TopBar({ currentLocation = 'KNUST Campus' }) {
    return (
        <div className="absolute top-3 left-4 right-4 z-[1000]">
            <div className="flex items-center justify-between h-12 px-4 bg-bg-secondary/90 backdrop-blur-sm rounded-xl border border-border">
                {/* Menu Button */}
                <button
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-bg-tertiary transition-colors"
                    aria-label="Open menu"
                >
                    <Menu className="w-5 h-5 text-text-primary" />
                </button>

                {/* Location Display */}
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-bg-tertiary transition-colors">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-text-primary truncate max-w-[160px]">
                        {currentLocation}
                    </span>
                </button>

                {/* Search Button */}
                <button
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-bg-tertiary transition-colors"
                    aria-label="Search"
                >
                    <Search className="w-5 h-5 text-text-primary" />
                </button>
            </div>
        </div>
    );
}
