'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

export default function Navigation({ isScrolled }) {
  const location = useLocation()
  
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-20 py-6 transition-all duration-500 ${
        isScrolled || location.pathname !== "/" ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <Link to="/" className="flex items-center gap-3 group">
        <motion.div 
          className="w-10 h-10 bg-blue-400 rounded-full"
          whileHover={{ scale: 1.1, rotate: 180, backgroundColor: "#60a5fa" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        />
        <span className={`text-2xl font-bold transition-colors ${
          isScrolled || location.pathname !== "/" ? 'text-gray-900' : 'text-white'
        } group-hover:text-blue-400`}>
          CureWave
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-8 lg:gap-12">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`relative transition-all duration-300 text-lg tracking-wide ${
              isScrolled || location.pathname !== "/" ? 'text-gray-700 hover:text-blue-400' : 'text-white hover:text-blue-300'
            }`}
          >
            {item.name}
            {location.pathname === item.href && (
              <motion.div
                layoutId="activeNav"
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-400"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}
        <motion.button 
          className="relative px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full font-medium text-lg overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.location.href = "/login"}
        >
          <span className="relative z-10 text-white">Get Started</span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
          />
        </motion.button>
      </nav>
    </motion.header>
  )
}



