import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from "sonner";

// Fix for Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom map icons
const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
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
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

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
  pageContainer: "min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 bg-gradient-to-b from-gray-900/50 to-black/50",
  backgroundImage: "absolute inset-0 w-full h-full object-cover blur-[8px] brightness-50 z-0 scale-105 transition-all duration-1000",
  contentWrapper: "relative z-10 text-center space-y-12 max-w-lg mx-auto backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl",
  title: "text-5xl font-bold text-white mb-8 drop-shadow-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80",
  button: "group px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3",
  buttonDisabled: "opacity-50 cursor-not-allowed hover:scale-100",
  helpText: "text-gray-300/90 text-sm mt-4 max-w-sm mx-auto leading-relaxed font-medium",
  mapContainer: "h-[600px] rounded-xl overflow-hidden shadow-inner border border-gray-100",
  hospitalList: "bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg max-h-[600px] overflow-auto",
  hospitalCard: "bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] mb-4 border border-gray-100 cursor-pointer",
  navigateButton: "w-full mt-3 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2",
  container: "container mx-auto px-4 py-8",
  gridContainer: "grid lg:grid-cols-3 gap-6 p-6",
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

// Main HospitalFinder Component
export default function HospitalFinder() {
  const [hospitals, setHospitals] = useState([]);
  const [location, setLocation] = useState(null);
  const [mapStyle, setMapStyle] = useState('streets');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

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
        
        setAddress(fullAddress);
        setPostalCode(addr.postcode || '');
      } catch (error) {
        console.error('Error fetching address:', error);
        setAddress('Address not available');
      }
    };

    fetchAddress();
  }, [location]);

  // Handle retry
  const handleRetry = async () => {
    setError(null);
    setIsRetrying(true);
    try {
      if (location) {
        await fetchNearbyHospitals(location.lat, location.lng);
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
      
      setLocation({ lat: latitude, lng: longitude });
      setLocationEnabled(true);
      fetchNearbyHospitals(latitude, longitude);
      
      if (accuracy > 100) {
        toast.warning("Location accuracy is low. Results may not be precise.");
      }
    } catch (error) {
      console.error('Location error:', error);
      const errorMessage = error.message || 'Failed to access location';
      setError(new Error(errorMessage));
      toast.error(errorMessage);
      setLocationEnabled(false);
    } finally {
      setIsLocating(false);
    }
  };

  // Fetch nearby hospitals
  const fetchNearbyHospitals = async (lat, lng) => {
    try {
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:3000,${lat},${lng});
          way["amenity"="hospital"](around:3000,${lat},${lng});
          relation["amenity"="hospital"](around:3000,${lat},${lng});
          node["amenity"="clinic"](around:3000,${lat},${lng});
          way["amenity"="clinic"](around:3000,${lat},${lng});
          node["healthcare"="centre"](around:3000,${lat},${lng});
          way["healthcare"="centre"](around:3000,${lat},${lng});
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
      
      const hospitals = data.elements
        .filter(element => {
          const tags = element.tags || {};
          return (
            tags.amenity === 'hospital' ||
            tags.amenity === 'clinic' ||
            tags.healthcare === 'centre' ||
            tags.healthcare === 'doctor'
          ) && element.lat && element.lon;
        })
        .map(facility => {
          const distance = calculateDistance(
            lat,
            lng,
            facility.lat,
            facility.lon
          );
          
          return {
            id: facility.id,
            name: facility.tags.name || 'Unknown Medical Facility',
            lat: facility.lat,
            lon: facility.lon,
            type: facility.tags.amenity || facility.tags.healthcare || 'medical',
            address: facility.tags['addr:full'] || 
                    [facility.tags['addr:street'], facility.tags['addr:city']]
                      .filter(Boolean)
                      .join(', ') || 
                    'Address not available',
            distance: distance
          };
        });

      const sortedHospitals = hospitals.sort((a, b) => a.distance - b.distance);
      const closestHospitals = sortedHospitals.slice(0, 10);

      setHospitals(closestHospitals);
      
      if (hospitals.length === 0) {
        toast.warning("No medical facilities found nearby. Try increasing location accuracy.");
      } else {
        toast.success(`Found ${hospitals.length} medical facilities nearby`);
      }
    } catch (error) {
      console.error('Error fetching medical facilities:', error);
      const errorMessage = error.message || 'Failed to fetch nearby medical facilities';
      setError(new Error(errorMessage));
      toast.error(errorMessage);
    }
  };

  // Handle navigation
  const handleNavigation = (lat, lon) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, '_blank');
  };

  // If location is not enabled, show enable location screen
  if (!locationEnabled) {
    return (
      <div className={styles.pageContainer}>
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop"
          alt="Hospital Background"
          className={styles.backgroundImage}
        />
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>Hospitals Near You</h1>
          <button
            className={`${styles.button} ${isLocating ? styles.buttonDisabled : ''}`}
            onClick={requestLocation}
            disabled={isLocating}
          >
            <MapPinIcon />
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
            Enable location access to find hospitals near you
          </p>
        </div>
      </div>
    );
  }

  // Map styles
  const mapStyles = {
    streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  };

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
    <div className={styles.container}>
      <TopLocationBar address={address} postalCode={postalCode} />
      <div className={styles.gridContainer}>
        <div className="lg:col-span-2">
          <div className={styles.mapContainer}>
            <MapContainer
              center={getMapCenter()}
              zoom={location ? 15 : 4}
              style={{ height: '100%', width: '100%' }}
            >
              <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-2">
                <button
                  onClick={() => setMapStyle(mapStyle === 'streets' ? 'satellite' : 'streets')}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {mapStyle === 'streets' ? 'Satellite View' : 'Street View'}
                </button>
              </div>

              <TileLayer
                url={mapStyles[mapStyle]}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {location && (
                <>
                  <Marker position={[location.lat, location.lng]} icon={userIcon}>
                    <Popup>Your Location</Popup>
                  </Marker>
                  <Circle
                    center={[location.lat, location.lng]}
                    radius={3000}
                    {...getDistanceCircleOptions('#3b82f6')}
                  />
                  <RecenterMap lat={location.lat} lng={location.lng} />
                </>
              )}

              {hospitals.map((hospital) => (
                <Marker
                  key={hospital.id}
                  position={[hospital.lat, hospital.lon]}
                  icon={hospitalIcon}
                >
                  <Popup>
                    <div className="p-3">
                      <h3 className="font-semibold text-lg mb-2">{hospital.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{hospital.address}</p>
                      <p className="text-sm text-blue-600 mb-3">{hospital.distance} km away</p>
                      <button
                        className={styles.navigateButton}
                        onClick={() => handleNavigation(hospital.lat, hospital.lon)}
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

        <div className={styles.hospitalList}>
          <h2 className="text-2xl font-bold mb-6">Nearby Hospitals</h2>
          {hospitals.length > 0 ? (
            hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className={styles.hospitalCard}
                onClick={() => handleNavigation(hospital.lat, hospital.lon)}
              >
                <h3 className="font-semibold text-lg">{hospital.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{hospital.address}</p>
                <p className="text-sm text-blue-600 mt-1">{hospital.distance} km away</p>
                <button className={styles.navigateButton}>
                  <NavigateIcon />
                  Navigate
                </button>
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
                    className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 ${isRetrying ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                <p className="text-gray-600">No medical facilities found nearby</p>
              )}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}