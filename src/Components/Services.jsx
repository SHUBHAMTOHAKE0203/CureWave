import React from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom';
import Navigation from './Navigation';


const services = [
  
  {
   
    title: "Nutrition Finder",
    description: "Restores movement, strengthens muscles, and improves overall physical function.",
    image: "https://plus.unsplash.com/premium_photo-1675798983878-604c09f6d154?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    path: "/nutrition"
  },
  {
   
    title: "BMI Calculator",
    description: "Restores movement, strengthens muscles, and improves overall physical function.",
    image: "https://images.unsplash.com/photo-1618939291225-8d558ea4369f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    path: "/bmi-calculator"
  },
  {
    
    title: "DrugInfo",
    description: "Strengthens heart, improves circulation, and boosts overall cardiovascular fitness.",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    path: "/drug-info"
  },
  {
    
    title: "Stay Fit",
    description: "Supports emotional health, reduces anxiety, and promotes psychological well-being.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    path: "/workout"
  },
  {
    
    title: "Nearby Hospital",
    description: "Regular check-ups and screenings to detect and prevent potential health issues.",
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    path: "/nearby-hospital"
  },
  {
    
    title: "Menstrual Cycle Predictor",
    description: "Personalized dietary advice to improve overall health and manage specific conditions.",
    image: "https://images.birlafertility.com/spai/ret_img/birlafertility.com/wp-content/uploads/2024/04/Untitled-4-2-scaled.webp",
    path: "/period-predictor"
  },
  {
    
    title: "BreathSafe",
    description: "Diagnosis and treatment of sleep disorders for better rest and improved health.",
    image: "https://www.healthscreenuk.co.uk/wp-content/uploads/2024/09/AdobeStock_594165142-scaled.jpeg.webp",
    path: "/breathsafe"
  },
  {
    
    title: "Pharmacy Finder",
    description: "Specialized care for musculoskeletal system, including bones, joints, and muscles.",
    image: "https://content3.jdmagicbox.com/comp/lucknow/g3/0522px522.x522.210301115417.c5g3/catalogue/go-pharmacy-india-gomti-nagar-lucknow-chemists-2tfwifcxhe.jpg",
    path: "/nearby-pharmacy"
  }
]

function ServiceCard({ service, index }) {
  const isEven = index % 2 === 0
  const { scrollYProgress } = useScroll()
  
  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 }
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, 0]), springConfig)

  return (
    <div>
    <Navigation/>
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 0.5,
          delay: index * 0.1
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ y }}
      className={`flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl ${
        isEven ? 'bg-white' : 'bg-blue-400 text-white'
      } shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <motion.div 
        className="flex-1 space-y-4"
      >
        <motion.div 
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
            isEven ? 'bg-blue-50' : 'bg-blue-300'
          }`}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, -5, 0],
            transition: {
              rotate: {
                duration: 0.5,
                ease: "easeInOut"
              }
            }
          }}
        >
          {service.icon}
        </motion.div>
        
        <motion.h3 
          className={`text-2xl font-bold ${
            isEven ? 'text-gray-900' : 'text-white'
          }`}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {service.title}
        </motion.h3>
        
        <motion.p 
          className={isEven ? 'text-gray-600' : 'text-blue-50'}
        >
          {service.description}
        </motion.p>
        
        <motion.div
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link 
            to={service.path}
            className={`inline-flex items-center gap-2 group ${
              isEven ? 'text-blue-500' : 'text-white'
            }`}
          >
            Know more
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
    </div>
  )
}

export default function Services() {
  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 }
  const { scrollYProgress } = useScroll()
  const headerY = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, -50]), springConfig)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 20
            }
          }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Our Services
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Discover our range of professional healthcare services designed to support your journey to optimal health and wellness.
          </motion.p>
        </motion.div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
