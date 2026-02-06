import { useState } from 'react';
import { X, Users, Shield, MapPin, Navigation, ChevronRight } from 'lucide-react';
import { BUS_STOPS } from '../data/mockData';

const DESTINATIONS = [
    { id: 'hall7', name: 'Hall 7', distance: '1.2 km' },
    { id: 'brunei', name: 'Brunei Hostel', distance: '1.5 km' },
    { id: 'gaza', name: 'Gaza Hostel', distance: '1.8 km' },
    { id: 'ayeduase', name: 'Ayeduase Gate', distance: '0.8 km' },
    { id: 'library', name: 'Main Library', distance: '0.3 km' },
    { id: 'kma', name: 'KMA Area', distance: '2.1 km' },
];

export default function WalkWithMeModal({ isOpen, onClose, onStartWalk }) {
    const [step, setStep] = useState(1); // 1: Choose companion, 2: Choose destination
    const [companion, setCompanion] = useState(null);
    const [destination, setDestination] = useState(null);

    if (!isOpen) return null;

    const handleCompanionSelect = (type) => {
        setCompanion(type);
        setStep(2);
    };

    const handleDestinationSelect = (dest) => {
        setDestination(dest);
    };

    const handleStartWalk = () => {
        if (companion && destination) {
            onStartWalk({ companion, destination });
            // Reset modal state
            setStep(1);
            setCompanion(null);
            setDestination(null);
        }
    };

    const handleClose = () => {
        setStep(1);
        setCompanion(null);
        setDestination(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[2000] bg-black/70 flex items-end justify-center">
            <div className="bg-bg-secondary rounded-t-3xl w-full max-w-md max-h-[85vh] overflow-hidden animate-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                            <h2 className="font-bold text-text-primary">Walk With Me</h2>
                            <p className="text-xs text-text-secondary">
                                {step === 1 ? 'Choose who walks with you' : 'Select your destination'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center hover:bg-border transition-colors"
                    >
                        <X className="w-5 h-5 text-text-secondary" />
                    </button>
                </div>

                {/* Step 1: Choose Companion */}
                {step === 1 && (
                    <div className="p-4 space-y-3">
                        <p className="text-sm text-text-secondary mb-4">
                            Your live location will be shared until you arrive safely.
                        </p>

                        {/* Trusted Friend Option */}
                        <button
                            onClick={() => handleCompanionSelect('friend')}
                            className="w-full p-4 bg-bg-primary rounded-xl flex items-center gap-4 hover:bg-bg-tertiary/50 transition-colors text-left"
                        >
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-text-primary">Trusted Friend</h3>
                                <p className="text-sm text-text-secondary">Share with a friend or family member</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-text-muted" />
                        </button>

                        {/* Campus Security Option */}
                        <button
                            onClick={() => handleCompanionSelect('security')}
                            className="w-full p-4 bg-bg-primary rounded-xl flex items-center gap-4 hover:bg-bg-tertiary/50 transition-colors text-left"
                        >
                            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                                <Shield className="w-6 h-6 text-secondary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-text-primary">Campus Security</h3>
                                <p className="text-sm text-text-secondary">Security monitors your journey</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-text-muted" />
                        </button>
                    </div>
                )}

                {/* Step 2: Choose Destination */}
                {step === 2 && (
                    <div className="p-4">
                        {/* Back button */}
                        <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-2 text-text-secondary text-sm mb-4 hover:text-text-primary transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 rotate-180" />
                            Back to companion selection
                        </button>

                        {/* Selected companion badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/20 rounded-full mb-4">
                            {companion === 'friend' ? (
                                <Users className="w-4 h-4 text-primary" />
                            ) : (
                                <Shield className="w-4 h-4 text-secondary" />
                            )}
                            <span className="text-sm font-medium text-text-primary">
                                {companion === 'friend' ? 'Trusted Friend' : 'Campus Security'}
                            </span>
                        </div>

                        <p className="text-sm text-text-secondary mb-3">Where are you going?</p>

                        {/* Destinations list */}
                        <div className="space-y-2 max-h-[40vh] overflow-y-auto hide-scrollbar">
                            {DESTINATIONS.map((dest) => (
                                <button
                                    key={dest.id}
                                    onClick={() => handleDestinationSelect(dest)}
                                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors text-left ${destination?.id === dest.id
                                            ? 'bg-primary/20 border border-primary'
                                            : 'bg-bg-primary hover:bg-bg-tertiary/50'
                                        }`}
                                >
                                    <MapPin className={`w-5 h-5 ${destination?.id === dest.id ? 'text-primary' : 'text-text-muted'
                                        }`} />
                                    <div className="flex-1">
                                        <p className="font-medium text-text-primary">{dest.name}</p>
                                        <p className="text-xs text-text-secondary">{dest.distance} away</p>
                                    </div>
                                    {destination?.id === dest.id && (
                                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                            <Navigation className="w-3 h-3 text-bg-primary" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Start Walk Button */}
                        <button
                            onClick={handleStartWalk}
                            disabled={!destination}
                            className={`w-full mt-4 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${destination
                                    ? 'bg-secondary text-white hover:bg-secondary-light'
                                    : 'bg-bg-tertiary text-text-muted cursor-not-allowed'
                                }`}
                        >
                            <Navigation className="w-5 h-5" />
                            Start Walking
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
