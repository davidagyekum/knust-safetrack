// Mock data for KNUST SafeTrack

// KNUST Campus center coordinates
export const KNUST_CENTER = {
    lat: 6.6745,
    lng: -1.5716,
};

// Bus stops around KNUST campus
export const BUS_STOPS = [
    { id: 1, name: 'JQB (Junior Quarters)', lat: 6.6731, lng: -1.5672, isActive: true },
    { id: 2, name: 'Ayeduase Gate', lat: 6.6698, lng: -1.5645, isActive: true },
    { id: 3, name: 'Hall 7 Junction', lat: 6.6782, lng: -1.5689, isActive: true },
    { id: 4, name: 'Main Library', lat: 6.6738, lng: -1.5725, isActive: true },
    { id: 5, name: 'Great Hall', lat: 6.6755, lng: -1.5745, isActive: true },
    { id: 6, name: 'Engineering Building', lat: 6.6721, lng: -1.5758, isActive: true },
    { id: 7, name: 'KSB (KNUST School of Business)', lat: 6.6768, lng: -1.5702, isActive: true },
    { id: 8, name: 'Brunei Area', lat: 6.6805, lng: -1.5678, isActive: true },
];

// Active shuttle buses
export const SHUTTLES = [
    {
        id: 'BUS-001',
        route: 'Tech Ring Road',
        lat: 6.6725,
        lng: -1.5695,
        direction: 45, // degrees
        nextStop: 'JQB (Junior Quarters)',
        eta: 4,
    },
    {
        id: 'BUS-002',
        route: 'Ayeduase Express',
        lat: 6.6760,
        lng: -1.5730,
        direction: 180,
        nextStop: 'Hall 7 Junction',
        eta: 7,
    },
    {
        id: 'BUS-003',
        route: 'Tech Ring Road',
        lat: 6.6795,
        lng: -1.5665,
        direction: 270,
        nextStop: 'Brunei Area',
        eta: 2,
    },
];

// Current user location (simulated - near Library)
export const USER_LOCATION = {
    lat: 6.6742,
    lng: -1.5718,
};

// Nearest stop calculation
export const getNearestStop = () => {
    return BUS_STOPS[3]; // Main Library for demo
};

export const getNextShuttle = () => {
    return {
        stop: 'JQB (Junior Quarters)',
        route: 'Tech Ring Road',
        eta: 4,
        busId: 'BUS-001',
    };
};
