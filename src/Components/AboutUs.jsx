import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-20">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About CureWave
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">
            At CureWave, our mission is to empower individuals through innovative health data management solutions that streamline healthcare processes and enhance patient care. We aim to provide a seamless experience for both patients and healthcare providers by leveraging cutting-edge technology.
          </p>
          <p className="text-lg text-gray-700">
            We believe in making healthcare more accessible, transparent, and actionable. By giving patients control over their health data, we promote informed decisions, better collaboration with healthcare professionals, and ultimately, improved health outcomes.
          </p>
          
          </motion.div>
          <motion.div
            className="relative h-80 rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop" 
              alt="Medical team"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Data Security", 
                description: "We prioritize the security of your health data, implementing robust encryption and compliance with the highest industry standards to ensure your information remains confidential." 
              },
              { 
                title: "Patient-Centered Care", 
                description: "We place patients at the heart of everything we do, providing intuitive tools for easy access to health data, empowering individuals to take control of their well-being." 
              },
              { 
                title: "Advanced Technology", 
                description: "We integrate the latest in health data management technology, enabling seamless record sharing, real-time updates, and smart analytics for better decision-making." 
              }
              
            ].map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
        <h2 className="text-3xl font-semibold mb-6">Support Our Mission</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Your generous donations help us continue to provide cutting-edge healthcare and innovative health data management solutions to those in need. By contributing to CureWave, you're directly supporting our efforts to improve patient care and outcomes for the entire community.
        </p>
        
          <motion.a
          href='/donate-us'
            className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-medium inline-flex items-center gap-2 hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Donate Us <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </main>
    </div>
  )
}

