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
              At CureWave, our mission is to provide exceptional, patient-centered healthcare that improves the quality of life for our community. We strive to combine cutting-edge medical technology with compassionate care to ensure the best possible outcomes for our patients.
            </p>
            <p className="text-lg text-gray-700">
              We believe in a holistic approach to health, addressing not just physical ailments but also promoting mental and emotional well-being. Our team of dedicated professionals works tirelessly to create a healing environment that supports recovery and fosters long-term health.
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
              { title: "Excellence", description: "We strive for excellence in all aspects of our care, continuously improving our services and skills." },
              { title: "Compassion", description: "We treat each patient with empathy, respect, and kindness, recognizing their individual needs and concerns." },
              { title: "Innovation", description: "We embrace innovative technologies and treatments to provide the most advanced care possible." }
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
          <h2 className="text-3xl font-semibold mb-6">Join Us on Our Journey</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join our team and help us in our mission to provide exceptional healthcare. Whether you're a medical professional or support staff, there might be a place for you at CureWave.
          </p>
          <motion.button
            className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-medium inline-flex items-center gap-2 hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Careers <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </main>
    </div>
  )
}

