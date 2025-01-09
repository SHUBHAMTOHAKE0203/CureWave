import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOutUser } from '../firebaseHelpers';
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { MdDashboard, MdEvent, MdArrowBack } from 'react-icons/md';
import { AiOutlineCalendar, AiOutlinePhone, AiOutlineIdcard } from 'react-icons/ai';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';

export const UserInfo= () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, userData } = location.state || {};
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = async () => {
        try {
            await logOutUser();
            alert("Logged Out Successfully");
            navigate('/');
        } catch (error) {
            alert("Error logging out: " + error.message);
        }
    };

    if (!userData) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
                <h1 className="text-4xl text-white font-bold mb-6 text-center">User data not found. Please Login/Signup Again</h1>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-full text-lg hover:scale-105 transform transition duration-300 shadow-lg"
                >
                    <MdArrowBack className="mr-2" /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar Navigation */}
            <aside className="bg-blue-600 w-64 text-white flex flex-col justify-between shadow-lg">
                <div>
                    <div className="p-6 text-center border-b border-blue-400">
                        <h1 className="text-3xl font-bold">CureWave</h1>
                        <p className="mt-2 text-sm">Your Healthcare Companion</p>
                    </div>
                    <nav className="flex flex-col mt-4 space-y-2">
                        <button className="flex items-center px-6 py-3 hover:bg-blue-500 transition-all">
                            <MdDashboard className="mr-3" size={20} /> Dashboard
                        </button>
                        <button
                            onClick={() => navigate('/appointment')}
                            className="flex items-center px-6 py-3 hover:bg-blue-500 transition-all">
                            <MdEvent className="mr-3" size={20} /> Appointments
                        </button>
                    </nav>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center px-6 py-3 bg-blue-700 hover:bg-red-500 transition-all">
                    <FaSignOutAlt className="mr-3" size={20} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Welcome, {userData.name || 'User'}</h1>
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center space-x-2 text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-all">
                            <FaUserAlt size={24} />
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg p-4 w-56">
                                <div className="text-lg font-semibold text-gray-800 mb-2">{userData.name || 'N/A'}</div>
                                <div className="text-sm text-gray-600 mb-4">{email}</div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Dashboard Content */}
                <section className="flex-1 p-6">
                    <div className="bg-white p-6 shadow-lg rounded-lg">
                        <h2 className="text-2xl font-bold text-blue-600 mb-6">Patient Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <HiOutlineMail className="text-blue-600 text-3xl mb-2" />
                                <h3 className="text-blue-600 font-semibold">Name</h3>
                                <p className="text-gray-800">{userData.name || 'N/A'}</p>
                            </div>
                            <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <HiOutlineMail className="text-blue-600 text-3xl mb-2" />
                                <h3 className="text-blue-600 font-semibold">Email</h3>
                                <p className="text-gray-800">{email}</p>
                            </div>
                            <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <HiOutlineLocationMarker className="text-blue-600 text-3xl mb-2" />
                                <h3 className="text-blue-600 font-semibold">Address</h3>
                                <p className="text-gray-800">{userData.address || 'N/A'}</p>
                            </div>
                            <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <AiOutlinePhone className="text-blue-600 text-3xl mb-2" />
                                <h3 className="text-blue-600 font-semibold">Contact</h3>
                                <p className="text-gray-800">{userData.phoneNumber || 'N/A'}</p>
                            </div>
                            <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <AiOutlineIdcard className="text-blue-600 text-3xl mb-2" />
                                <h3 className="text-blue-600 font-semibold">Patient ID</h3>
                                <p className="text-gray-800">{userData.patientID || 'N/A'}</p>
                            </div>
                            <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <AiOutlineCalendar className="text-blue-600 text-3xl mb-2" />
                                <h3 className="text-blue-600 font-semibold">Created At</h3>
                                <p className="text-gray-800">{new Date(userData.createdAt).toLocaleString() || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
