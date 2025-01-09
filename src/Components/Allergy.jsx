"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Wind, AlertTriangle, Heart, Bell, Loader2, Thermometer, Droplets, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";
import Navigation from "./Navigation";
// Air Quality Icon
const airQualityIcon = new L.DivIcon({
  className: "custom-div-icon",
  html: '<div style="background-color: #60A5FA; padding: 8px; border-radius: 50%;"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M9.7 17l3.3-3.3V6.7L9.7 10l-3.3-3.3v7l3.3 3.3z M16.3 17l3.3-3.3v-7L16.3 10 13 6.7v7l3.3 3.3z"/></svg></div>',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Health Tip Component with modern animations
const HealthTip = ({ icon: Icon, title, description, index }) => (
  <motion.div
    className="bg-white rounded-3xl shadow-lg overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
  >
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
    >
      <motion.div
        className="bg-blue-400 rounded-2xl p-3 w-fit mb-4"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="text-white h-6 w-6" />
      </motion.div>
      <motion.h3
        className="text-gray-900 font-semibold text-lg mb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-gray-600 text-sm leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  </motion.div>
);

// AQI Category function
const getAQICategory = (aqi) => {
  if (aqi <= 50) return { label: "Good", color: "bg-green-500" };
  else if (aqi <= 100) return { label: "Moderate", color: "bg-yellow-500" };
  else if (aqi <= 150) return { label: "Unhealthy for Sensitive Groups", color: "bg-orange-500" };
  else if (aqi <= 200) return { label: "Unhealthy", color: "bg-red-500" };
  else if (aqi <= 300) return { label: "Very Unhealthy", color: "bg-purple-500" };
  else return { label: "Hazardous", color: "bg-pink-500" };
};

// Allergy recommendation function
const getAllergyRecommendation = (aqi) => {
  if (aqi <= 50) return "It is safe for allergy patients to go outside.";
  else if (aqi <= 100) return "It is generally safe, but allergy patients should be cautious.";
  else if (aqi <= 150) return "Allergy patients should limit outdoor activities.";
  else if (aqi <= 200) return "Allergy patients should avoid outdoor activities.";
  else if (aqi <= 300) return "Allergy patients should stay indoors.";
  else return "It is dangerous for everyone, including allergy patients. Stay indoors.";
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
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          try {
            const res = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            setCity(res.data.address.city || res.data.address.state || "Unknown Location");
          } catch (err) {
            setCity("Unknown Location");
          }
        },
        (error) => {
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
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-400 to-white">
        <Loader2 className="h-16 w-16 text-white animate-spin mb-4" />
        <p className="text-white text-lg">Loading air quality data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-white flex items-center justify-center">
        <div className="text-center p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Error</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
    <Navigation/>
    <div className={`min-h-screen relative pt-14 bg-gradient-to-b from-blue-400 to-white ${showMap ? "backdrop-blur-md" : ""}`}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Air Quality in {city || "Loading..."}
        </motion.h1>

        <AnimatePresence mode="wait">
          {!showMap ? (
            <motion.div
              className="space-y-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                onClick={() => setShowMap(true)}
                className="mx-auto block px-6 py-3 text-lg font-semibold text-blue-400 bg-white rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Wind className="inline-block mr-2 h-5 w-5" />
                <span>View Air Quality Map</span>
              </motion.button>

              <div className="max-w-6xl mx-auto">
                <motion.p
                  className="text-white text-center text-lg md:text-xl mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Monitor real-time air quality data to make informed decisions
                  about outdoor activities and protect your health.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <HealthTip
                    icon={AlertTriangle}
                    title="Allergy Patients"
                    description="Check air quality levels before outdoor activities. High pollution can trigger allergic reactions and respiratory issues."
                    index={0}
                  />
                  <HealthTip
                    icon={Heart}
                    title="Respiratory Conditions"
                    description="Monitor PM2.5 and PM10 levels to manage asthma and other respiratory conditions effectively."
                    index={1}
                  />
                  <HealthTip
                    icon={Bell}
                    title="Preventive Measures"
                    description="Get alerts for poor air quality days to plan indoor activities and take necessary precautions."
                    index={2}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="bg-white rounded-3xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/3 bg-blue-50 p-6 overflow-auto">
                  <motion.div
                    className="mb-6 bg-blue-100 p-4 rounded-2xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="font-semibold mb-2 text-blue-900">Allergy Patient Recommendation:</p>
                    <p className="text-blue-800">{getAllergyRecommendation(airQualityData.aqi)}</p>
                  </motion.div>

                  <div className="space-y-4">
                    <motion.div
                      className={`p-4 rounded-2xl ${getAQICategory(airQualityData.aqi).color}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="font-bold text-lg text-white">AQI: {airQualityData.aqi}</p>
                      <p className="text-white/90">{getAQICategory(airQualityData.aqi).label}</p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "PM2.5", value: airQualityData.pm25, unit: "µg/m³", icon: Thermometer },
                        { label: "PM10", value: airQualityData.pm10, unit: "µg/m³", icon: Droplets },
                        { label: "O₃", value: airQualityData.o3, unit: "ppb", icon: Sun },
                        { label: "NO₂", value: airQualityData.no2, unit: "ppb", icon: Wind },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          className="bg-white p-4 rounded-2xl shadow-md"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        >
                          <item.icon className="h-6 w-6 text-blue-500 mb-2" />
                          <p className="font-semibold text-blue-900">{item.label}</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {item.value}
                            <span className="text-sm font-normal text-blue-400">{item.unit}</span>
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-2/3 h-[400px] lg:h-auto relative">
                  <div
                    className={`absolute inset-0 z-0 ${
                      showMap ? "blur-md brightness-50" : ""
                    }`}
                    style={{
                      backgroundImage: "url('air.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="relative z-10 h-full bg-black/10">
                    <MapContainer
                      center={[location.lat, location.lon]}
                      zoom={10}
                      scrollWheelZoom={false}
                      className="h-full w-full"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[location.lat, location.lon]} icon={airQualityIcon}>
                        <Popup>
                          Current Location<br />AQI: {airQualityData.aqi}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 text-center">
                <motion.button
                  onClick={() => setShowMap(false)}
                  className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close Map
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </div>
  );
};

export default AirQualityMap;
