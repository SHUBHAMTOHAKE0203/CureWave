import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Github, Heart, Zap, Shield } from 'lucide-react';

const Button = ({ children, className, ...props }) => (
  <button
    className={`inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
)

const Input = ({ className, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const quotes = [
  "The greatest wealth is health.",
  "Take care of your body. It's the only place you have to live.",
  "Health is not valued till sickness comes.",
  "He who has health has hope, and he who has hope has everything.",
  "Wellness is the complete integration of body, mind, and spirit.",
  "The first wealth is health.",
  "Your body hears everything your mind says.",
  "Health is a state of complete harmony of the body, mind and spirit.",
  "The groundwork of all happiness is health.",
  "To keep the body in good health is a duty, otherwise we shall not be able to keep our mind strong and clear."
]

export default function Footer() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])
  const [isAnimating, setIsAnimating] = useState(false)

  const getRandomQuote = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      const randomIndex = Math.floor(Math.random() * quotes.length)
      const newQuote = quotes[randomIndex]
      
      // Only change if it's a different quote
      if (newQuote !== currentQuote) {
        setTimeout(() => {
          setCurrentQuote(newQuote)
          setTimeout(() => setIsAnimating(false), 300) // Reduced from 500ms
        }, 300) // Reduced from 500ms
      } else {
        setIsAnimating(false)
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(getRandomQuote, 7000) // Reduced from 10000ms
    return () => clearInterval(interval)
  }, [currentQuote])

  return (
    <footer className="w-full relative bg-white">
      {/* Upper Section */}
      <div className="container mx-auto px-4">
        <div className="bg-blue-400 text-white p-8 rounded-2xl relative z-10 mb-[-2rem] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-400 opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold mb-3 flex items-center">
                Master Your Wellness, Live Fully
                <Heart className="ml-2 text-red-400 animate-pulse" />
              </h2>
              <div className="relative min-h-[3rem]">
                <p 
                  className={`text-lg transition-all duration-300 ease-in-out ${
                    isAnimating ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'
                  }`}
                >
                  {currentQuote}
                </p>
              </div>
              <div className="flex mt-4 space-x-4">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-300" />
                  <span>Energize</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-300" />
                  <span>Protect</span>
                </div>
              </div>
            </div>
            <Button 
              className="whitespace-nowrap bg-white text-[#4361ee] hover:bg-gray-100 hover:text-[#3651de] transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={getRandomQuote}
              disabled={isAnimating}
            >
              Get Inspired
            </Button>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="bg-[#18191b] text-white pt-16">
        <div className="container mx-auto px-4">
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Left Column */}
            <div className="md:col-span-5">
              <h3 className="text-2xl font-bold mb-4">Supporting Your Wellness Journey</h3>
              <p className="text-gray-400 mb-6">
                Our comprehensive health resources, expert advice, and supportive community are here to guide you every step of the way.
              </p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter email address"
                  className="bg-[#222327] border-gray-700"
                />
                <Button className="bg-blue-400 text-white">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Spacer */}
            <div className="md:col-span-2" />

            {/* Middle Column - About */}
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4">About CureWave</h4>
              <ul className="space-y-3">
                <li><Link to="#" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Our Team</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              </ul>
            </div>

            {/* Right Column - For Patients */}
            <div className="md:col-span-3">
              <h4 className="font-semibold mb-4">For Patients</h4>
              <ul className="space-y-3">
                <li><Link to="#" className="text-gray-400 hover:text-white">Patient Portal</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Health Resources</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Appointment Booking</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Telemedicine Services</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Patient Support</Link></li>
              </ul>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 py-8 border-t border-gray-800">
            <Link to="#" className="text-gray-400 hover:text-white">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <Github className="h-5 w-5" />
            </Link>
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-between items-center py-6 border-t border-gray-800">
            <div className="flex-1" />
            <div className="flex items-center justify-center flex-1">
              <span className="font-bold text-xl">CureWave</span>
            </div>
            
            
            <div className="flex justify-end flex-1">
              <Link to="#" className="text-gray-400 hover:text-white text-sm">
                Team UnbelivAPI
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

