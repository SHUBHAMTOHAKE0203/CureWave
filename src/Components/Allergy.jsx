import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Wind, AlertTriangle, Heart, Bell } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Air Quality Icon (remains unchanged)
const airQualityIcon = new L.DivIcon({
  className: "custom-div-icon",
  html: '<div style="background-color: #4CAF50; padding: 8px; border-radius: 50%;"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M9.7 17l3.3-3.3V6.7L9.7 10l-3.3-3.3v7l3.3 3.3z M16.3 17l3.3-3.3v-7L16.3 10 13 6.7v7l3.3 3.3z"/></svg></div>',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Health Tip Component (remains unchanged)
const HealthTip = ({ icon: Icon, title, description }) => (
  <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg transform transition-all duration-500 hover:scale-105 hover:bg-opacity-30">
    <Icon className="text-white mb-2 h-6 w-6" />
    <h3 className="text-white font-semibold mb-1">{title}</h3>
    <p className="text-white text-sm opacity-90">{description}</p>
  </div>
);

// Function to categorize AQI and return the corresponding color and label
const getAQICategory = (aqi) => {
  if (aqi <= 50) {
    return { label: "Good", color: "bg-green-500" };
  } else if (aqi <= 100) {
    return { label: "Moderate", color: "bg-yellow-500" };
  } else if (aqi <= 150) {
    return { label: "Unhealthy for Sensitive Groups", color: "bg-orange-500" };
  } else if (aqi <= 200) {
    return { label: "Unhealthy", color: "bg-red-500" };
  } else if (aqi <= 300) {
    return { label: "Very Unhealthy", color: "bg-purple-500" };
  } else {
    return { label: "Hazardous", color: "bg-pink-500" };
  }
};

// Function to provide allergy recommendation based on AQI
const getAllergyRecommendation = (aqi) => {
  if (aqi <= 50) {
    return "It is safe for allergy patients to go outside.";
  } else if (aqi <= 100) {
    return "It is generally safe, but allergy patients should be cautious.";
  } else if (aqi <= 150) {
    return "Allergy patients should limit outdoor activities.";
  } else if (aqi <= 200) {
    return "Allergy patients should avoid outdoor activities.";
  } else if (aqi <= 300) {
    return "Allergy patients should stay indoors.";
  } else {
    return "It is dangerous for everyone, including allergy patients. Stay indoors.";
  }
};

const AirQualityMap = () => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      console.log("Attempting to fetch geolocation...");

      // Using geolocation API to fetch location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Geolocation successful: ", latitude, longitude); // Debugging the location

          setLocation({ lat: latitude, lon: longitude });

          try {
            // Fetching city from OpenStreetMap reverse geocoding API
            const res = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            console.log("Location data from reverse geocoding:", res.data); // Debugging the location response
            setCity(res.data.address.city || res.data.address.state || "Unknown Location");
          } catch (err) {
            console.error("Error fetching city from geocoding:", err);
            setCity("Unknown Location");
          }
        },
        (error) => {
          console.error("Geolocation error:", error); // Log error details
          setError("Failed to fetch location");
        }
      );
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchAirQuality = async () => {
      if (location) {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.weatherbit.io/v2.0/current/airquality?lat=${location.lat}&lon=${location.lon}&key=e22a0ee1504146cdafa8233780da6810`
          );
          setAirQualityData(response.data.data[0]);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch air quality data");
          setLoading(false);
        }
      }
    };

    fetchAirQuality();
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-400 to-green-600">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-green-600 flex items-center justify-center">
        <div className="text-center text-white p-8 bg-red-500 bg-opacity-75 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const backgroundStyle = {
    backgroundImage: `url('/air.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 filter blur-sm"
        style={backgroundStyle}
      ></div>

      <div className="relative z-10 min-h-screen bg-black bg-opacity-40">
        <h1 className="text-4xl font-bold text-center py-6 text-white animate-fade-in">
          Air Quality in {city || "Loading..."}
        </h1>

        {!showMap ? (
          <div className="flex flex-col items-center justify-center space-y-8 h-[80vh]">
            {/* Animated button */}
            <button
              onClick={() => setShowMap(true)}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-bounce"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <Wind className="mr-2 h-6 w-6 animate-pulse" />
              <span>View Air Quality Map</span>
            </button>

            {/* Info text with fade-in animation */}
            <div className="max-w-4xl mx-auto px-4 space-y-6 animate-fade-in">
              <p className="text-white text-center text-xl mb-8 animate-fade-in">
                Monitor real-time air quality data to make informed decisions
                about outdoor activities
              </p>

              {/* Health tips grid */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <HealthTip
                  icon={AlertTriangle}
                  title="Allergy Patients"
                  description="Check air quality levels before outdoor activities. High pollution can trigger allergic reactions and respiratory issues."
                />
                <HealthTip
                  icon={Heart}
                  title="Respiratory Conditions"
                  description="Monitor PM2.5 and PM10 levels to manage asthma and other respiratory conditions effectively."
                />
                <HealthTip
                  icon={Bell}
                  title="Preventive Measures"
                  description="Get alerts for poor air quality days to plan indoor activities and take necessary precautions."
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-screen">
            <div className="w-1/4 bg-black bg-opacity-60 text-white p-4 overflow-auto">
              {/* Allergy Recommendation */}
              <div className="p-4 bg-blue-100 text-blue-700 rounded mb-4">
                <p className="font-semibold">Allergy Patient Recommendation:</p>
                <p>{getAllergyRecommendation(airQualityData.aqi)}</p>
              </div>

              {/* Air Quality Data */}
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg ${getAQICategory(airQualityData.aqi).color} text-black`}
                >
                  <p className="font-bold">AQI: {airQualityData.aqi}</p>
                  <p>{getAQICategory(airQualityData.aqi).label}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-black">
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-semibold">PM2.5</p>
                    <p>{airQualityData.pm25} µg/m³</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-semibold">PM10</p>
                    <p>{airQualityData.pm10} µg/m³</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-semibold">O₃</p>
                    <p>{airQualityData.o3} ppb</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-semibold">NO₂</p>
                    <p>{airQualityData.no2} ppb</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/4">
              <MapContainer
                center={[location.lat, location.lon]}
                zoom={10}
                scrollWheelZoom={true}
                className="h-full w-full rounded-xl shadow-2xl"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[location.lat, location.lon]} icon={airQualityIcon}>
                  
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirQualityMap;
