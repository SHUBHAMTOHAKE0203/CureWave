import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const doctors = [
  {
    path: "/Doctor1",
    name: "Dr.Swaminathan Joshi",
    profession: "Cardiologist",
    image: "https://t4.ftcdn.net/jpg/07/07/89/33/360_F_707893394_5DEhlBjWOmse1nyu0rC9T7ZRvsAFDkYC.jpg",
  },
  {
    path: "/Doctor2",
    name: "Dr.Rishabh Rana",
    profession: "Dermatologist",
    image: "https://imgcdn.stablediffusionweb.com/2024/9/28/a6a1ac2c-2a55-4592-8b4c-8ce2138c8807.jpg",
  },
  {
    path: "/Doctor3",
    name: "Dr.Kartiki Meshram",
    profession: "Dentist",
    image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMV9waG90b2dyYXBoeV9vZl9hbl9zb3V0aF9pbmRpYW5fd29tZW5fYXNfYV9kb2N0b19kMzAxMDM3Zi03MDUzLTQxNDAtYmYyZS1lZDFlYWE0YTM3NDRfMS5qcGc.jpg",
  },
  {
    path: "/Doctor4",
    name: "Dr.Dimple Ahuja",
    profession: "Orthopedic Surgeon",
    image: "https://media.istockphoto.com/id/497142181/photo/physician.jpg?s=612x612&w=0&k=20&c=PX_lRXXQo7lUpE1Slj2vHsiCnZZnVNF_OX99-ag6O_8=",
  },
  {
    path: "/Doctor5",
    name: "Dr.Shashwati Meshram",
    profession: "Neurologist",
    image: "https://thumbs.dreamstime.com/b/berautiful-brunette-indian-happy-doctor-woman-10698488.jpg",
  },
];

const AppointmentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex flex-col items-center py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/login")}
        className="bg-blue-400 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-500 transition duration-300 transform hover:scale-105 mb-8"
      >
        Back
      </button>

      {/* Header */}
      <h1 className="text-5xl font-extrabold text-blue-600 mb-12 drop-shadow-md">Book Your Appointment</h1>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="relative bg-cover bg-center rounded-2xl shadow-xl overflow-hidden w-80 h-96 transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            style={{ backgroundImage: `url(${doctor.image})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
              {/* Doctor Info */}
              <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-2">{doctor.name}</h3>
                <p className="text-lg text-gray-300">{doctor.profession}</p>
              </div>

              {/* Button */}
              <Link
                to={doctor.path}
                className="mt-6 bg-blue-500 text-white text-center py-2 px-6 rounded-full font-semibold shadow-md hover:bg-blue-600 transition duration-300"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        ))}
      </div>

     
      
    </div>
  );
};

export default AppointmentPage;