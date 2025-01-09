import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Clock, Calendar, ChevronLeft, Filter, CheckCircle2, X } from 'lucide-react';

const doctors = [
  {
    path: "/Doctor1",
    name: "Dr.Swaminathan Joshi",
    profession: "Cardiologist",
    image: "https://t4.ftcdn.net/jpg/07/07/89/33/360_F_707893394_5DEhlBjWOmse1nyu0rC9T7ZRvsAFDkYC.jpg",
    rating: 4.8,
    experience: "15+ years",
    location: "Mumbai Central",
    availability: "Next Available: Today",
    consultationFee: "₹1000",
    specializations: ["Heart Disease", "Cardiac Surgery", "Hypertension"]
  },
  {
    path: "/Doctor2",
    name: "Dr.Rishabh Rana",
    profession: "Dermatologist",
    image: "https://imgcdn.stablediffusionweb.com/2024/9/28/a6a1ac2c-2a55-4592-8b4c-8ce2138c8807.jpg",
    rating: 4.9,
    experience: "12+ years",
    location: "Bandra West",
    availability: "Next Available: Tomorrow",
    consultationFee: "₹1200",
    specializations: ["Skin Care", "Cosmetic Dermatology", "Hair Treatment"]
  },
  {
    path: "/Doctor3",
    name: "Dr.Kartiki Meshram",
    profession: "Dentist",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMV9waG90b2dyYXBoeV9vZl9hbl9zb3V0aF9pbmRpYW5fd29tZW5fYXNfYV9kb2N0b19kMzAxMDM3Zi03MDUzLTQxNDAtYmYyZS1lZDFlYWE0YTM3NDRfMS5qcGc.jpg",
    rating: 4.7,
    experience: "8+ years",
    location: "Andheri East",
    availability: "Next Available: Today",
    consultationFee: "₹800",
    specializations: ["General Dentistry", "Orthodontics", "Dental Surgery"]
  },
  {
    path: "/Doctor4",
    name: "Dr.Dimple Ahuja",
    profession: "Orthopedic Surgeon",
    image: "https://media.istockphoto.com/id/497142181/photo/physician.jpg?s=612x612&w=0&k=20&c=PX_lRXXQo7lUpE1Slj2vHsiCnZZnVNF_OX99-ag6O_8=",
    rating: 4.9,
    experience: "20+ years",
    location: "Powai",
    availability: "Next Available: Tomorrow",
    consultationFee: "₹1500",
    specializations: ["Joint Replacement", "Sports Medicine", "Spine Surgery"]
  },
  {
    path: "/Doctor5",
    name: "Dr.Shashwati Meshram",
    profession: "Neurologist",
    image: "https://thumbs.dreamstime.com/b/berautiful-brunette-indian-happy-doctor-woman-10698488.jpg",
    rating: 4.8,
    experience: "16+ years",
    location: "Worli",
    availability: "Next Available: Today",
    consultationFee: "₹1300",
    specializations: ["Brain Disorders", "Stroke Treatment", "Epilepsy"]
  },
];

const specialties = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "Dentist",
  "Orthopedic Surgeon",
  "Neurologist"
];

const AppointmentPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.profession.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.profession === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find & Book Appointment</h1>
          <p className="text-xl text-blue-100 mb-8">Book appointments with the best doctors near you</p>
          
          {/* Search Bar */}
          <div className="flex gap-4 max-w-3xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors, specialties..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-300 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-blue-500 p-4 rounded-xl hover:bg-blue-600 transition-all"
            >
              <Filter className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white shadow-lg py-4 border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${selectedSpecialty === specialty
                    ? 'bg-blue-100 text-blue-600 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Doctor Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{doctor.rating}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium">{doctor.profession}</p>
                </div>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{doctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{doctor.availability}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {doctor.specializations.map((spec, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-gray-600 text-sm">Consultation Fee</p>
                    <p className="text-xl font-bold text-gray-900">{doctor.consultationFee}</p>
                  </div>
                  <Link
                    to={doctor.path}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;

