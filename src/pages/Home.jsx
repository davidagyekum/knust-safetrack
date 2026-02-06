import { useState } from 'react';
import TopBar from '../components/layout/TopBar';
import BottomSheet from '../components/layout/BottomSheet';
import BottomNav from '../components/layout/BottomNav';
import SOSButton from '../components/SOSButton';
import QuickActionChips from '../components/QuickActionChips';
import MapContainerComponent from '../components/map/MapContainer';
import EmergencyMode from '../components/EmergencyMode';
import WalkWithMeModal from '../components/WalkWithMeModal';
import ActiveWalkScreen from '../components/ActiveWalkScreen';

export default function Home() {
    const [isEmergencyMode, setIsEmergencyMode] = useState(false);
    const [showWalkModal, setShowWalkModal] = useState(false);
    const [activeWalk, setActiveWalk] = useState(null);

    const handleSOSActivate = () => {
        setIsEmergencyMode(true);
    };

    const handleEmergencyCancel = () => {
        setIsEmergencyMode(false);
    };

    const handleWalkWithMeClick = () => {
        setShowWalkModal(true);
    };

    const handleStartWalk = (walkData) => {
        setShowWalkModal(false);
        setActiveWalk(walkData);
    };

    const handleEndWalk = () => {
        setActiveWalk(null);
    };

    // Show Emergency Mode screen when SOS is activated
    if (isEmergencyMode) {
        return <EmergencyMode onCancel={handleEmergencyCancel} />;
    }

    // Show Active Walk screen when walking
    if (activeWalk) {
        return <ActiveWalkScreen walkData={activeWalk} onEndWalk={handleEndWalk} />;
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-bg-primary">
            {/* Map Layer (Base) */}
            <MapContainerComponent />

            {/* Floating Top Bar */}
            <TopBar currentLocation="KNUST Campus" />

            {/* Quick Action Chips */}
            <QuickActionChips onWalkWithMe={handleWalkWithMeClick} />

            {/* Bottom Sheet */}
            <BottomSheet />

            {/* SOS Button */}
            <SOSButton onActivate={handleSOSActivate} />

            {/* Bottom Navigation */}
            <BottomNav />

            {/* Walk With Me Modal */}
            <WalkWithMeModal
                isOpen={showWalkModal}
                onClose={() => setShowWalkModal(false)}
                onStartWalk={handleStartWalk}
            />
        </div>
    );
}
