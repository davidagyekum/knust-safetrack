import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { KNUST_CENTER, BUS_STOPS, SHUTTLES } from '../../data/mockData';
import { ACTIVE_SOS_ALERTS, PATROL_UNITS, ACTIVE_WALKS, HEATMAP_DATA } from '../../data/dashboardData';

// SOS Alert icon (flashing red)
const sosIcon = L.divIcon({
    className: 'sos-marker',
    html: `
    <div style="
      width: 28px;
      height: 28px;
      background-color: #DC2626;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 3px #DC2626, 0 0 15px rgba(220,38,38,0.7);
      animation: sos-flash 0.5s infinite alternate;
    "></div>
    <style>
      @keyframes sos-flash {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0.7; transform: scale(1.1); }
      }
    </style>
  `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
});

// Patrol unit icon (yellow)
const patrolIcon = L.divIcon({
    className: 'patrol-marker',
    html: `
    <div style="
      width: 32px;
      height: 32px;
      background-color: #F4C430;
      border: 3px solid white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    ">🚔</div>
  `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

// Active walk icon (green)
const walkIcon = L.divIcon({
    className: 'walk-marker',
    html: `
    <div style="
      width: 24px;
      height: 24px;
      background-color: #228B22;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 2px #228B22;
    "></div>
  `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

// Bus icon
const busIcon = L.divIcon({
    className: 'bus-marker',
    html: `
    <div style="
      width: 28px;
      height: 28px;
      background-color: #3B82F6;
      border: 2px solid white;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    ">🚌</div>
  `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
});

export default function DashboardMap({ showHeatmap = false, selectedAlert, onAlertClick }) {
    return (
        <div className="flex-1 relative">
            <MapContainer
                center={[KNUST_CENTER.lat, KNUST_CENTER.lng]}
                zoom={15}
                className="w-full h-full"
                zoomControl={true}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {/* Heatmap circles (when enabled) */}
                {showHeatmap && HEATMAP_DATA.map((point, idx) => (
                    <Circle
                        key={`heat-${idx}`}
                        center={[point.lat, point.lng]}
                        radius={150}
                        pathOptions={{
                            color: 'transparent',
                            fillColor: `rgba(244, 196, 48, ${point.intensity})`,
                            fillOpacity: 0.6,
                        }}
                    />
                ))}

                {/* SOS Alerts */}
                {ACTIVE_SOS_ALERTS.map((alert) => (
                    <Marker
                        key={alert.id}
                        position={[alert.lat, alert.lng]}
                        icon={sosIcon}
                        eventHandlers={{
                            click: () => onAlertClick && onAlertClick(alert),
                        }}
                    >
                        <Popup>
                            <div className="text-center">
                                <p className="font-bold text-red-600">🚨 SOS ALERT</p>
                                <p className="font-medium">{alert.studentName}</p>
                                <p className="text-sm text-gray-600">{alert.location}</p>
                                <p className="text-xs text-gray-500">ID: {alert.studentId}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Patrol Units */}
                {PATROL_UNITS.map((patrol) => (
                    <Marker
                        key={patrol.id}
                        position={[patrol.lat, patrol.lng]}
                        icon={patrolIcon}
                    >
                        <Popup>
                            <div className="text-center">
                                <p className="font-bold">{patrol.name}</p>
                                <p className={`text-sm ${patrol.status === 'available' ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {patrol.status === 'available' ? '✅ Available' : '🔄 Responding'}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Active Walks */}
                {ACTIVE_WALKS.map((walk) => (
                    <Marker
                        key={walk.id}
                        position={[walk.currentLat, walk.currentLng]}
                        icon={walkIcon}
                    >
                        <Popup>
                            <div className="text-center">
                                <p className="font-bold text-green-600">Walking</p>
                                <p className="font-medium">{walk.studentName}</p>
                                <p className="text-sm text-gray-600">{walk.from} → {walk.to}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Shuttles */}
                {SHUTTLES.map((shuttle) => (
                    <Marker
                        key={shuttle.id}
                        position={[shuttle.lat, shuttle.lng]}
                        icon={busIcon}
                    >
                        <Popup>
                            <div className="text-center">
                                <p className="font-bold">{shuttle.id}</p>
                                <p className="text-sm">{shuttle.route}</p>
                                <p className="text-sm text-green-600">ETA: {shuttle.eta} min</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 z-[1000] bg-bg-secondary/95 backdrop-blur-sm rounded-xl p-3 border border-border">
                <p className="text-xs font-medium text-text-primary mb-2">Legend</p>
                <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-danger rounded-full" />
                        <span className="text-text-secondary">SOS Alert</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded" />
                        <span className="text-text-secondary">Patrol Unit</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded-full" />
                        <span className="text-text-secondary">Active Walk</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded" />
                        <span className="text-text-secondary">Shuttle</span>
                    </div>
                </div>
            </div>

            {/* View Toggle (when heatmap is available) */}
            {showHeatmap && (
                <div className="absolute top-4 right-4 z-[1000] bg-bg-secondary/95 backdrop-blur-sm rounded-xl p-2 border border-border">
                    <p className="text-xs font-medium text-primary">📍 Night Traffic Heatmap</p>
                </div>
            )}
        </div>
    );
}
