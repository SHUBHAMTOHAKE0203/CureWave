import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  Clock,
  Link as LinkIcon,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

// Fix for default marker icon
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const position = [18.5089, 73.7753]; // PVPIT coordinates

const emergencyNumbers = [
  { name: "Police", number: "100" },
  { name: "Ambulance", number: "108" },
  { name: "Fire Brigade", number: "101" },
  { name: "Women Helpline", number: "1091" },
];

function ContactInfo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-600">Email</p>
            <a
              href="mailto:info@pvpit.edu.in"
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              info@pvpit.edu.in
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-600">Phone</p>
            <a
              href="tel:+912067335100"
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              +91 20 6733 5100
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-600">Address</p>
            <p className="text-gray-800">
              S. No. 33/22, Pune Pirangut Road,
              <br />
              Next to Chandani Chowk,
              <br />
              Bavdhan, Pune,
              <br />
              Maharashtra 411021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Map() {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm h-[400px]">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={icon}>
          <Popup>
            PVPIT Campus
            <br />
            Bavdhan, Pune
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

function EmergencyContacts() {
  return (
    <div className="bg-red-50 p-6 rounded-lg shadow-sm mt-8">
      <div className="flex items-center space-x-2 mb-4">
        <AlertCircle className="w-6 h-6 text-red-600" />
        <h2 className="text-2xl font-bold text-red-800">Emergency Contacts</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {emergencyNumbers.map((contact) => (
          <div
            key={contact.name}
            className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm"
          >
            <Phone className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">{contact.name}</p>
              <a
                href={`tel:${contact.number}`}
                className="text-lg font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                {contact.number}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



function AdditionalInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Office Hours */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Office Hours</h2>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Monday - Friday</span>
            <span className="text-gray-800 font-medium">9:00 AM - 5:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Saturday</span>
            <span className="text-gray-800 font-medium">9:00 AM - 1:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sunday</span>
            <span className="text-gray-800 font-medium">Closed</span>
          </div>
        </div>
      </div>

      {/* Quick Links & Social Media */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <LinkIcon className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Connect With Us</h2>
        </div>
        {/* Quick Links */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Quick Links</h3>
          <div className="space-y-2">
            <a
              href="#"
              className="block text-blue-600 hover:text-blue-700 transition-colors"
            >
              Academic Calendar
            </a>
            <a
              href="#"
              className="block text-blue-600 hover:text-blue-700 transition-colors"
            >
              Student Portal
            </a>
            <a
              href="#"
              className="block text-blue-600 hover:text-blue-700 transition-colors"
            >
              Faculty Directory
            </a>
          </div>
        </div>
        {/* Social Media */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Contact Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactInfo />
            <Map />
          </div>

          <AdditionalInfo />

          <EmergencyContacts />
        </div>
      </main>
    </div>
  );
}
