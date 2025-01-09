import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from "sonner";
import Navigation from './Navigation';
// Fix for Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom map icons
const pharmacyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Icons as components
const NavigateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

// Map recenter component
function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 15);
  }, [lat, lng, map]);
  return null;
}

// Styles
const styles = {
  welcomeMessage: "text-3xl font-bold text-gray-800 mb-4",
  welcomeSubtext: "text-lg text-gray-600 mb-6",
  pharmacyTip: "bg-emerald-50 p-4 rounded-lg text-emerald-800 text-sm mb-6 border border-emerald-100 flex items-start gap-2",
  pulseButton: "relative before:absolute before:inset-0 before:rounded-full before:animate-ping before:bg-emerald-400/20 before:-z-10",
  patternBackground: "absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-90 z-0",
  patternOverlay: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9IiMwNDdBRjciIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9nPjwvc3ZnPg==')] opacity-30 z-0",
  addressBadge: "inline-flex items-center px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200",
  pageContainer: "min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 bg-gradient-to-b from-emerald-900/50 to-black/50",
  backgroundImage: "absolute inset-0 w-full h-full object-cover blur-[8px] brightness-50 z-0 scale-105 transition-all duration-1000",
  contentWrapper: "relative z-10 text-center space-y-12 max-w-lg mx-auto backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl",
  title: "text-5xl font-bold text-white mb-8 drop-shadow-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80",
  button: "group px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3",
  buttonDisabled: "opacity-50 cursor-not-allowed hover:scale-100",
  helpText: "text-gray-300/90 text-sm mt-4 max-w-sm mx-auto leading-relaxed font-medium",
  mapContainer: "h-[600px] rounded-2xl overflow-hidden shadow-xl border border-gray-200/50 backdrop-blur-sm bg-white/50",
  pharmacyList: "bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-h-[600px] overflow-auto border border-gray-200/50 divide-y divide-gray-100",
  pharmacyCard: "bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm rounded-xl p-5 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer group space-y-3 border border-gray-100 hover:border-emerald-200/50",
  navigateButton: "w-full py-2.5 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg",
  container: "container mx-auto px-4 py-6",
  gridContainer: "grid lg:grid-cols-3 gap-8 p-6",
  badge: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
  distanceBadge: "bg-emerald-100 text-emerald-800",
  statusBadge: "bg-blue-100 text-blue-800",
  mapControls: "absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 space-y-3 border border-gray-200/50",
};

// TopLocationBar Component
const TopLocationBar = ({ address, postalCode }) => {
  if (!address) return null;

  return (
    <div className="w-full bg-gray-100 py-2 border-b border-gray-200">
      <div className="container mx-auto max-w-7xl px-4 flex items-center justify-center gap-2">
        <div className="flex items-center gap-2 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{address}</span>
          {postalCode && (
            <>
              <span className="text-gray-400">|</span>
              <span className="text-sm font-medium">{postalCode}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// UserLocation Component
const UserLocation = ({ location }) => {
  if (!location) return null;

  return (
    <div className="w-full bg-white border-t border-gray-200 py-3 mt-8 shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 flex items-center gap-3 text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div className="flex-1">
          <div className="text-sm text-gray-700">{location.address}</div>
          {location.postalCode && <div className="text-sm font-medium text-gray-900">{location.postalCode}</div>}
        </div>
        <div className="text-sm text-gray-500">
          {location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E
        </div>
      </div>
    </div>
  );
};

// Main PharmacyFinder Component
export default function PharmacyFinder() {
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get random pharmacy tip
  const getPharmacyTip = () => {
    const tips = [
      '💊 Remember to carry your prescription',
      '⏰ Most pharmacies are open from 9 AM to 9 PM',
      '📱 Save emergency pharmacy numbers',
      '🏥 Check if your pharmacy offers home delivery',
      '💉 Ask about vaccination services'
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };
  const [pharmacies, setPharmacies] = useState([]);
  const [location, setLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState(3000);
  const [mapStyle, setMapStyle] = useState('streets');
  const [isLocating, setIsLocating] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10; // Round to 1 decimal place
  };

  // Fetch address when location changes
  useEffect(() => {
    const fetchAddress = async () => {
      if (!location) return;
      
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}&addressdetails=1`
        );
        const data = await response.json();
        
        // Construct address string
        const addr = data.address;
        const fullAddress = [
          addr.road,
          addr.suburb,
          addr.city || addr.town,
          addr.state,
          addr.country
        ].filter(Boolean).join(', ');
        
        setLocation(prev => prev ? { ...prev, address: fullAddress, postalCode: addr.postcode } : null);
      } catch (error) {
        console.error('Error fetching address:', error);
        setLocation(prev => prev ? { ...prev, address: 'Address not available' } : null);
      }
    };

    if (location && !location.address) {
      fetchAddress();
    }
  }, [location]);

  // Handle retry
  const handleRetry = async () => {
    setError(null);
    setIsRetrying(true);
    try {
      if (location) {
        await fetchNearbyPharmacies(location.lat, location.lng);
      } else {
        await requestLocation();
      }
    } catch (error) {
      console.error('Retry failed:', error);
      toast.error('Retry failed. Please try again.');
    } finally {
      setIsRetrying(false);
    }
  };

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      if (result.state === 'granted') {
        setPermissionGranted(true);
        requestLocation();
      } else if (result.state === 'prompt') {
        // Show permission request UI
        setPermissionGranted(false);
      } else {
        throw new Error('Location permission denied');
      }
    } catch (error) {
      console.error('Permission error:', error);
      toast.error('Unable to access location permissions');
    }
  };

  // Request location
  const requestLocation = async () => {
    setIsLocating(true);

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0,
          }
        );
      });

      const { latitude, longitude, accuracy } = position.coords;
      console.log(`Location obtained - Lat: ${latitude}, Lng: ${longitude}, Accuracy: ${accuracy}m`);
      
      setLocation({ lat: latitude, lng: longitude, address: '' });
      setLocationEnabled(true);
      setPermissionGranted(true);
      fetchNearbyPharmacies(latitude, longitude);
      
      if (accuracy > 100) {
        toast.warning("Location accuracy is low. Results may not be precise.");
      }
    } catch (error) {
      console.error('Location error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to access location';
      setError(new Error(errorMessage));
      toast.error(errorMessage);
      setLocationEnabled(false);
      setPermissionGranted(false);
    } finally {
      setIsLocating(false);
    }
  };

  // Fetch nearby pharmacies
  // Function to get random operating hours for demo purposes
const getRandomOperatingHours = () => {
  const openTime = Math.floor(Math.random() * 4) + 7; // Random hour between 7-10
  const closeTime = Math.floor(Math.random() * 4) + 20; // Random hour between 20-23
  return `${openTime}:00 AM - ${closeTime-12}:00 PM`;
};

const fetchNearbyPharmacies = async (lat, lng) => {
    // Reset pharmacies list before fetching new ones
    setPharmacies([]);
    // Show loading toast

    // Show loading toast
    toast.loading("Finding pharmacies near you...");

    try {
      const query = `
        [out:json];
        (
          node["amenity"="pharmacy"](around:${searchRadius},${lat},${lng});
          way["amenity"="pharmacy"](around:${searchRadius},${lat},${lng});
          relation["amenity"="pharmacy"](around:${searchRadius},${lat},${lng});
          node["shop"="pharmacy"](around:${searchRadius},${lat},${lng});
          way["shop"="pharmacy"](around:${searchRadius},${lat},${lng});
        );
        out body;
        >;
        out skel qt;
      `;
      
      const response = await fetch(
        'https://overpass-api.de/api/interpreter',
        {
          method: 'POST',
          body: query,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.elements || !Array.isArray(data.elements)) {
        throw new Error('Invalid response format from OpenStreetMap');
      }
      
      const pharmacies = data.elements
        .filter(element => {
          const tags = element.tags || {};
          return (
            (tags.amenity === 'pharmacy' || tags.shop === 'pharmacy') &&
            element.lat && element.lon
          );
        })
        .map(facility => {
          const distance = calculateDistance(
            lat,
            lng,
            facility.lat,
            facility.lon
          );
          
          const address = facility.tags['addr:full'] || 
    [
      facility.tags['addr:street'],
      facility.tags['addr:housenumber'],
      facility.tags['addr:suburb'],
      facility.tags['addr:city'],
      facility.tags['addr:postcode']
    ].filter(Boolean).join(', ') || 'Address not available';

  return {
    id: facility.id,
    name: facility.tags.name || 'Unknown Pharmacy',
    lat: facility.lat,
    lon: facility.lon,
    type: 'pharmacy',
    address: address,
    distance: distance,
    operatingHours: getRandomOperatingHours(),
    hasDelivery: Math.random() > 0.5, // Random boolean for demo
    isOpen: true // For demo purposes
  };
        });

      const sortedPharmacies = pharmacies.sort((a, b) => a.distance - b.distance);
      const closestPharmacies = sortedPharmacies.slice(0, 10);

      setPharmacies(closestPharmacies);
      
      if (pharmacies.length === 0) {
        toast.warning("No pharmacies found nearby. Try increasing location accuracy.");
      } else {
        toast.success(`Found ${pharmacies.length} pharmacies nearby`);
      }
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch nearby pharmacies';
      setError(new Error(errorMessage));
      toast.error(errorMessage);
    }
  };

  // Handle navigation
  const handleNavigation = (lat, lon) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, '_blank');
  };

  // If location permission not granted, show permission request screen
  if (!permissionGranted) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.patternBackground} />
        <div className={styles.patternOverlay} />
        <img
          src="https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=2000&auto=format&fit=crop"
          alt="Pharmacy Background"
          className={styles.backgroundImage}
        />
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>Pharmacies Near You</h1>
          <button
            className={`${styles.button} ${styles.pulseButton}`}
            onClick={requestLocationPermission}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Allow Location Access
          </button>
          <p className={styles.helpText}>
            We need your location to find pharmacies near you. Your location data is only used to show nearby pharmacies and is never stored.
          </p>
        </div>
      </div>
    );
  }

  // If location is not enabled, show enable location screen
  if (!locationEnabled) {
    return (
      <div className={styles.pageContainer}>
        <img
          src="https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=2000&auto=format&fit=crop"
          alt="Pharmacy Background"
          className={styles.backgroundImage}
        />
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>Pharmacies Near You</h1>
          <button
            className={`${styles.button} ${isLocating ? styles.buttonDisabled : ''}`}
            onClick={requestLocation}
            disabled={isLocating}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {isLocating ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Accessing Location...
              </>
            ) : (
              "Enable Location"
            )}
          </button>
          <p className={styles.helpText}>
            Enable location access to find pharmacies near you
          </p>
        </div>
      </div>
    );
  }

  // Circle options for distance indicator
  const getDistanceCircleOptions = (color) => ({
    color,
    fillColor: color,
    fillOpacity: 0.1,
    weight: 1
  });

  // Default map position (India)
  const defaultPosition = { lat: 20.5937, lng: 78.9629 };

  // Get map center
  const getMapCenter = () => {
    if (location && location.lat && location.lng) {
      return [location.lat, location.lng];
    }
    return [defaultPosition.lat, defaultPosition.lng];
  };

  return (
    <div>
    <Navigation/>
    <div className='pt-24'>
    <div className={styles.container}>
      <TopLocationBar address={location?.address || ''} postalCode={location?.postalCode} />
      <div className={styles.gridContainer}>
        <div className="lg:col-span-2">
          <div className={styles.mapContainer}>
            <MapContainer
              zoomControl={false}
              center={getMapCenter()}
              zoom={location ? 15 : 4}
              style={{ height: '100%', width: '100%' }}
            >
              <div className={styles.mapControls}>
                {/* Search Radius Control */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-600 block">Search Radius: {searchRadius/1000}km</label>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="1000"
                    value={searchRadius}
                    onChange={(e) => setSearchRadius(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Map Style Toggle */}
                <button
                  onClick={() => setMapStyle(mapStyle === 'streets' ? 'satellite' : 'streets')}
                  className="w-full px-3 py-1 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                >
                  {mapStyle === 'streets' ? 'Satellite View' : 'Street View'}
                </button>
              </div>

              <TileLayer
                url={mapStyle === 'satellite' 
                  ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                  : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                }
                attribution={mapStyle === 'satellite'
                  ? '&copy; Esri'
                  : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }
              />

              {location && (
                <>
                  <Marker position={[location.lat, location.lng]} icon={userIcon}>
                    <Popup>Your Location</Popup>
                  </Marker>
                  <Circle
                    center={[location.lat, location.lng]}
                    radius={searchRadius}
                    {...getDistanceCircleOptions('#10b981')}
                  />
                  <RecenterMap lat={location.lat} lng={location.lng} />
                  <ZoomControl position="bottomright" />
                </>
              )}

              {pharmacies.map((pharmacy) => (
                <Marker
                  key={pharmacy.id}
                  position={[pharmacy.lat, pharmacy.lon]}
                  icon={pharmacyIcon}
                >
                  <Popup>
                    <div className="p-3">
                      <h3 className="font-semibold text-lg mb-2">{pharmacy.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{pharmacy.address}</p>
                      <p className="text-sm text-emerald-600 mb-3">{pharmacy.distance} km away</p>
                      <button
                        className={styles.navigateButton}
                        onClick={() => handleNavigation(pharmacy.lat, pharmacy.lon)}
                      >
                        <NavigateIcon />
                        Navigate
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className={styles.pharmacyList}>
          <div className="mb-8">
            <h2 className={styles.welcomeMessage}>{getGreeting()}</h2>
            <p className={styles.welcomeSubtext}>Find pharmacies near your location</p>
            <div className={styles.pharmacyTip}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{getPharmacyTip()}</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6">Nearby Pharmacies</h2>
          {pharmacies.length > 0 ? (
            pharmacies.map((pharmacy) => (
              <div
                key={pharmacy.id}
                className={styles.pharmacyCard}
                onClick={() => handleNavigation(pharmacy.lat, pharmacy.lon)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{pharmacy.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{pharmacy.operatingHours}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <span className={`${styles.badge} ${styles.distanceBadge}`}>
                        {pharmacy.distance} km
                      </span>
                      <span className={`${styles.badge} ${pharmacy.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {pharmacy.isOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                    {pharmacy.hasDelivery && (
                      <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Delivery Available
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="space-y-3 bg-gray-50/50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start gap-2">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 font-medium">Location Details</p>
                          <div className={styles.addressBadge}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {pharmacy.address || 'Fetching address...'}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            <p className="text-xs text-gray-500 font-mono">{pharmacy.lat.toFixed(6)}, {pharmacy.lon.toFixed(6)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className={styles.navigateButton}>
                    <NavigateIcon />
                    <span className="font-medium">Navigate</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-5 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              {error ? (
                <div className="space-y-4">
                  <p className="text-red-600">{error.message}</p>
                  <button
                    onClick={handleRetry}
                    disabled={isRetrying}
                    className={`px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 ${isRetrying ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isRetrying ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Retrying...
                      </>
                    ) : (
                      'Try Again'
                    )}
                  </button>
                </div>
              ) : (
                <p className="text-gray-600">No pharmacies found nearby</p>
              )}
            </div>
          )}
        </div>
      </div>
      <UserLocation location={location} />
    </div>
    </div>
    </div>
  );
}

