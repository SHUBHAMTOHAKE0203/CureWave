import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInUser, fetchUserData } from '../firebaseHelpers';
import { motion } from 'framer-motion';

export const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async () => {
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const userCredential = await signInUser(email, password);
            alert("Logged In Successfully");
            const userId = userCredential.user.uid;
            const userData = await fetchUserData(userId);
            navigate('/user-info', { state: { email: userCredential.user.email, userData } });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Welcome Text */}
            <div className="w-1/2 bg-gradient-to-br bg-blue-500 text-white flex justify-center items-center relative overflow-hidden">
                <motion.div
                    className="absolute bottom-0 left-0 w-[150%] h-32 overflow-hidden"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                        <path
                            fill="#ffffff"
                            fillOpacity="0.2"
                            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </motion.div>
                <div className="text-center p-8 max-w-lg z-10">
                    <motion.h1
                        className="text-5xl font-semibold mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Welcome to CureWave
                    </motion.h1>
                    <motion.p
                        className="text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Your journey to better health starts here. Please log in to continue.
                    </motion.p>
                </div>
            </div>

            {/* Right Side - Simplified Interactive Login Form */}
            <div className="w-1/2 flex justify-center items-center bg-white p-6 relative overflow-hidden">
                <motion.div
                    className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

                    {/* Email Input with Interactive Effect */}
                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: email ? 1 : 0.6 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Enter Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        />
                    </motion.div>

                    {/* Password Input with Interactive Effect */}
                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: password ? 1 : 0.6 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Enter Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        />
                    </motion.div>

                    {/* Login Button with Hover Effect */}
                    <motion.button
                        onClick={login}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Login
                    </motion.button>

                    {/* Signup Link */}
                    <motion.p
                        className="text-center mt-4 text-sm text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};
