import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOutUser } from '../firebaseHelpers';

export const UserInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, userData } = location.state || {}; // Retrieve email and userData from the state

    // Handle Logout
    const handleLogout = async () => {
        try {
            await logOutUser();
            alert("Logged Out Successfully");
            navigate('/'); // Redirect to home or login page after logout
        } catch (error) {
            alert("Error logging out: " + error.message);
        }
    };

    if (!userData) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl text-red-500">User data not found. Please Login/Singup Again</h1>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Header Section */}
            <div className="flex justify-between items-center bg-blue-100 py-4 px-6">
                <img className="w-[180px] h-[40px]" src="curewaveLogo.png" alt="Logo" />
                <img className="w-[65px] h-[65px] rounded-full" src="patient.png" alt="Patient Profile" />
            </div>

            {/* Dashboard Content */}
            <div className="w-full mt-10 p-6 bg-gray-50 shadow-lg rounded-lg max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Patient Dashboard</h1>

                {/* Patient Profile Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Patient Profile</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-700"><strong>Name:</strong> {userData.name || 'N/A'}</p>
                            <p className="text-gray-700"><strong>Address:</strong> {userData.address || 'N/A'}</p>
                            <p className="text-gray-700"><strong>Contact:</strong> {userData.phoneNumber || 'N/A'}</p>
                            <p className="text-gray-700"><strong>Email:</strong> {email}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Patient ID:</strong> {userData.patientID || 'N/A'}</p>
                            <p className="text-gray-700"><strong>Created At:</strong> {new Date(userData.createdAt).toLocaleString() || 'N/A'}</p>
                            {/* Additional fields like health stats can go here */}
                        </div>
                    </div>
                </div>

                {/* Health Metrics Section */}
                

                {/* Logout Button */}
                <div className="text-center mt-8">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};
