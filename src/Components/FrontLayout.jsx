import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, ChevronDown, ChevronUp, ArrowDown, Plus, Minus, Star, ChevronLeft, ChevronRight, Twitter, Instagram, Facebook, Linkedin, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Toaster } from "sonner"
import { createGlobalStyle } from 'styled-components'
import RecipeServiceCard from './Card';
import FAQ from './FAQ';
import Smile from './Smile';
import Testimonials from './Testimonials';
import Footer from './Footer';

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
  }
`

// Utility function (replacing cn from @/lib/utils)
const cn = (...classes) => classes.filter(Boolean).join(' ')

// Button component (replacing import from @/components/ui/button)
const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

// Card component (replacing import from @/components/ui/card)
const Card = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const backgrounds = [
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop'
]

// Preload images
backgrounds.forEach(url => {
  const img = new Image()
  img.src = url
})

const sections = [
  {
    title: "UNLOCK YOUR HEALTH DATA",
    description: "Empower yourself with CureWave's innovative health data management system. Seamlessly access, track, and manage your medical records in one secure and intuitive platform.",
    steps: [
      "Secure Data Upload",
      "Organized Record Keeping",
      "24/7 Data Access"
    ]
  },
  {
    title: "PERSONALIZED INSIGHTS",
    description: "Experience the future of healthcare with CureWave's data-driven insights. Our platform leverages advanced analytics to provide tailored recommendations and actionable health insights.",
    steps: [
      "Health Data Analysis",
      "Customized Recommendations",
      "Improved Decision Making"
    ]
  },
  {
    title: "YOUR HEALTH, SIMPLIFIED",
    description: "Streamline your healthcare journey with CureWave. Our user-friendly tools ensure seamless communication, efficient data sharing, and enhanced collaboration between patients and healthcare providers.",
    steps: [
      "Easy Data Sharing",
      "Real-Time Notifications",
      "Collaborative Care"
    ]
  }
];


function Navigation({ isScrolled }) {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-20 py-6 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
    >
      <Link to="/" className="flex items-center gap-3 group">
        <motion.div
          className="w-10 h-10 bg-blue-400 rounded-full"
          whileHover={{ scale: 1.1, rotate: 180, backgroundColor: "#60a5fa" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        />
        <span className={`text-2xl font-bold transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'
          } group-hover:text-blue-400`}>
          CureWave
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-8 lg:gap-12">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`transition-all duration-300 text-lg tracking-wide ${isScrolled ? 'text-gray-700 hover:text-blue-400' : 'text-white hover:text-blue-300'
              }`}
          >
            {item.name}
          </Link>
        ))}
        <motion.button
  className="relative px-6 py-2 bg-blue-400 rounded-full font-medium text-lg overflow-hidden group"
  whileHover={{ scale: 1.05, backgroundColor: "#60a5fa" }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
  onClick={() => window.location.href = "/login"}
>
  <span className="relative z-10">Get Started</span>
  <motion.div
    className="absolute inset-0 bg-blue-500"
    initial={{ x: "-100%" }}
    whileHover={{ x: 0 }}
    transition={{ type: "tween", duration: 0.3 }}
  />
</motion.button>

      </nav>
    </motion.header>
  )
}

function ProgressMenu({ steps, activeStepIndex }) {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute top-0 bottom-0 right-12 w-px bg-white/20" />

      <div className="flex flex-col gap-16">
        {steps.map((step, index) => (
          <div key={step} className="relative">
            <motion.div
              className={`text-2xl font-light tracking-wide ${index === activeStepIndex ? 'text-blue-400' : 'text-white/70'
                }`}
              initial={{ x: 50, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { delay: index * 0.2 }
              }}
              whileHover={{ x: -8 }}
            >
              {step}
            </motion.div>

            {index === activeStepIndex && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-blue-400"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function FrontPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [[page, direction], setPage] = useState([0, 0])

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % 3)
    }, 2000)

    const slideInterval = setInterval(() => {
      setPage(([prevPage]) => [prevPage + 1, 1])
      setActiveStepIndex(0)
    }, 6000)

    return () => {
      clearInterval(stepInterval)
      clearInterval(slideInterval)
    }
  }, [])

  const slideIndex = Math.abs(page % backgrounds.length)

  const variants = {
    enter: (direction) => ({
      opacity: 0,
      scale: 1.05,
      filter: 'brightness(0.8)',
      transition: {
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        filter: { duration: 0.5 }
      }
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
      filter: 'brightness(1)',
      transition: {
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        filter: { duration: 0.5 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      opacity: 0,
      scale: 0.95,
      filter: 'brightness(0.8)',
      transition: {
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        filter: { duration: 0.5 }
      }
    })
  }

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.7 }
          }}
          className="fixed inset-0 w-full h-full"
          style={{
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgrounds[slideIndex]})`,
              y: backgroundY,
              willChange: 'transform'
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          <div className="relative z-10 h-full flex items-center justify-between px-4 md:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-white"
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {sections[slideIndex].title}
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl leading-relaxed mb-8 md:mb-12 font-light tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {sections[slideIndex].description}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <motion.a
                  href="/about"
                  className="px-8 py-3 bg-blue-400 rounded-full text-lg font-medium hover:bg-blue-500 transition-colors text-center"
                  whileHover={{ scale: 1.05, backgroundColor: "#60a5fa" }}
                  whileTap={{ scale: 0.95 }}
                >
                  About Us
                </motion.a>
                <motion.a
                href="/login"
                  className="px-8 py-3 border-2 border-white rounded-full text-lg font-medium hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in Touch
                </motion.a>
              </motion.div>
            </motion.div>

            <ProgressMenu
              steps={sections[slideIndex].steps}
              activeStepIndex={activeStepIndex}
            />
          </div>
        </motion.div>
      </AnimatePresence>
      <ScrollIndicator />
    </div>
  )
}

function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed bottom-8 right-8 text-white flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-sm font-light">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </motion.div>
  )
}

function AboutUs() {
  const [expandedIndex, setExpandedIndex] = useState(-1)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -300])

  const features = [
    {
      title: "Streamlined Data Management",
      content: "At CureWave, we simplify healthcare by providing a centralized platform for securely managing your medical records. Say goodbye to fragmented data and hello to seamless organization."
    },
    {
      title: "Cutting-Edge Analytics",
      content: "Leverage the power of advanced data analytics to gain actionable insights into your health. Our platform helps you and your healthcare providers make informed decisions for better outcomes."
    },
    {
      title: "Patient-Centered Design",
      content: "CureWave is designed with you in mind. Enjoy an intuitive and user-friendly interface that makes accessing, sharing, and understanding your health data effortless and efficient."
    }
  ];
  

  return (
    <motion.div
      className="min-h-screen bg-white py-20 md:py-32 relative overflow-hidden"
      style={{ y }}
    >
      <div className="container mx-auto px-4 md:px-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center relative">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl group"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=2070&auto=format&fit=crop"
              alt="Healthcare"
              className="w-full h-auto object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          <ConnectingLine />

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.2
            }}
            viewport={{ once: true }}
            className="space-y-8"
          >
          <span className="text-blue-400 text-xl font-medium inline-block">
          Discover CureWave
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          Revolutionizing Health Data Management
        </h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          At CureWave, we believe that managing your health data should be seamless and empowering. 
          Our innovative platform bridges the gap between advanced technology and personalized healthcare, 
          providing secure, accessible, and actionable insights for patients and providers alike.
        </p>
        

            <div className="space-y-4">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  feature={feature}
                  index={index}
                  expandedIndex={expandedIndex}
                  setExpandedIndex={setExpandedIndex}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-24 md:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="order-2 lg:order-1 space-y-6"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            viewport={{ once: true }}
          >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Philosophy</h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            At CureWave, we believe in empowering individuals through efficient health data management. 
            Our philosophy revolves around making healthcare more accessible, personalized, and data-driven, 
            enabling better decisions for a healthier future.
          </p>
          
            
          </motion.div>

          <motion.div
            className="relative group order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.2
            }}
            viewport={{ once: true }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
              alt="Our Philosophy"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function ConnectingLine() {
  return (
    <motion.div
      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-400"
      >
        <motion.path
          d="M50 50 C 50 150, 200 200, 350 250"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="8,8"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  )
}

function FeatureCard({ feature, index, expandedIndex, setExpandedIndex }) {
  const isExpanded = expandedIndex === index
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 50 }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : (index % 2 === 0 ? -50 : 50),
        y: isInView ? 0 : 50
      }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      className="border-b border-gray-200 pb-4"
    >
      <button
        onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="text-lg md:text-xl font-medium text-gray-900 flex items-center gap-3">
          <motion.div
            className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 360, backgroundColor: "#60a5fa" }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white text-sm">0{index + 1}</span>
          </motion.div>
          <span className="group-hover:text-blue-400 transition-colors">
            {feature.title}
          </span>
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-blue-400" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-400" />
          )}
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pt-4 text-gray-600 leading-relaxed">
          {feature.content}
        </p>
      </motion.div>
    </motion.div>
  )
}

function ServiceItem({ title, description, image, link, large }) {
    return (
      <div
        className={`bg-white shadow-lg rounded-lg overflow-hidden ${
          large ? "md:col-span-1" : "md:col-span-1"
        } group relative`}
      >
        <img
          src={image}
          alt={title}
          className={`w-full ${
            large ? "h-80" : "h-64"
          } object-cover group-hover:scale-105 transition-all`}
        />
        {/* Adjusted Glass Effect */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-none p-6 flex flex-col justify-between z-10">
          <div>
            <h4 className="text-xl font-semibold text-white">{title}</h4>
            {description && <p className="text-white mt-2">{description}</p>}
          </div>
          <button
            onClick={() => (window.location.href = link)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
          >
            See More
          </button>
        </div>
      </div>
    );
  }
  
  
  function OurServices() {
    const { scrollYProgress } = useScroll();
    const springConfig = { stiffness: 100, damping: 15 };
    const scale = useSpring(
      useTransform(scrollYProgress, [0, 0.5], [0.95, 1]),
      springConfig
    );
  
    const services = {
      featured: [
        {
          title: "Locate Nearby Pharmacies",
          description:
            "Find trusted pharmacies close to you offering prescription medications, over-the-counter drugs, and health supplies for all your wellness needs.",
          image:
            "https://plus.unsplash.com/premium_photo-1682129892808-3476952259c7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          link: "/nearby-pharmacy",
        },
        {
          title: "Get Health Tips",
          description: "Unlock expert advice on fitness, nutrition, and mental well-being.Take charge of your health today and embrace a life full of vitality and balance. Your wellness journey starts here!",
          image:
            "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop",
          link: "/health-tips",
        },
      ],
      additional: [
        {
          title: "Preventive Medicine",
          image:
            "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop",
            link: "/health-tips",
        },
        {
          title: "Wellness Programs",
          image:
            "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=2070&auto=format&fit=crop",
            link: "/health-tips",
        },
        {
          title: "Ready to start your journey?",
          image:
            "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop",
            link: "/health-tips",
        },
      ],
    };
  
    return (
      <motion.div
        className="min-h-screen bg-blue-50/50 py-20 md:py-32 overflow-hidden"
        style={{ scale }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Text Content */}
            <div className="col-span-12 lg:col-span-4">
  <h2 className="text-blue-400 text-xl font-medium mb-4">
    OUR SERVICES
  </h2>
  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
    Simplifying Health Data 
  </h3>
  <p className="text-lg text-gray-600">
    CureWave offers a comprehensive platform to manage your health data efficiently. 
    From secure record storage to real-time access and seamless sharing, our services 
    empower patients and healthcare providers to collaborate effectively for better outcomes.
  </p>
</div>

  
            {/* Right Column - Cards Grid */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              {/* Top Row - Large Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.featured.map((service, index) => (
                  <ServiceItem key={index} {...service} large />
                ))}
              </div>
  
              {/* Bottom Row - Smaller Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.additional.map((service, index) => (
                  <ServiceItem key={index} {...service} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  
 
  
  

  function ServiceCard({ title, image, description, large = false, isActive, onClick, index, buttonLabel, linkPath }) {
    if (onClick) {
      return (
        <Card
          className={cn(
            "absolute w-full cursor-pointer",
            "bg-white rounded-3xl overflow-hidden will-change-transform",
            "border-0 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]",
            "transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "hover:shadow-[0_16px_80px_-12px_rgba(0,0,0,0.25)]",
            "group",
            isActive ? 
              "z-30 translate-y-0" : 
              index === 1 ? 
                "z-20 translate-y-[100px]" : 
                "z-10 translate-y-[200px]"
          )}
          onClick={onClick}
        >
          <div className="flex items-stretch min-h-[300px]">
            <div className="flex-1 p-8 flex flex-col justify-between">
              <div className="space-y-8">
                <h3 className="text-[40px] font-normal tracking-tight">{title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
              </div>
              <Link to={linkPath}>
                <motion.button
                  className="mt-8 relative overflow-hidden group px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {buttonLabel}
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: 5 }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
            </div>
            <div className="w-[45%] relative overflow-hidden">
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          </div>
        </Card>
      );
    }
  
    return (
      <motion.div
        className={`group relative overflow-hidden rounded-2xl ${large ? 'h-[400px]' : 'h-[300px]'}`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="absolute inset-0">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-8">
          <h3 className="text-3xl font-bold text-white mb-3">{title}</h3>
          {description && (
            <p className="text-white/90 text-lg mb-6 max-w-md">{description}</p>
          )}
          <Link to={linkPath}>
            <motion.button
              className="bg-blue-400 text-white px-6 py-2 rounded-full inline-flex items-center gap-2 w-fit"
              whileHover={{ scale: 1.05, backgroundColor: "#60a5fa" }}
              whileTap={{ scale: 0.95 }}
            >
              {buttonLabel}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }
  
  function SpecializedCare() {
    const [activeIndex, setActiveIndex] = useState(0);
  
    const services = [
      {
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&dpr=2&q=80",
        title: "Book An Appointment",
        description: "Schedule appointments with your preferred doctor in just a few clicks. Choose your time, get instant confirmation, and manage your bookings all in one place!",
        buttonLabel: "Book An Appointment",
        linkPath: "/login",
      },
      {
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&dpr=2&q=80",
        title: "Find Nearby Hospital",
        description: "Locate the best hospitals in your area with ease. Get directions, contact details, and essential information to access healthcare when you need it most.",
        buttonLabel: "Find Hospital Near You",
        linkPath: "/nearby-hospital",
      },
      {
        image: "https://images.unsplash.com/photo-1546198632-9ef6368bef12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Documentation",
        description: "Upload your documents here so that you can access them anywhere and anytime!",
        buttonLabel: "Upload Your Documents",
        linkPath: "/upload-file",
      }
    ];
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-white overflow-hidden">
        <main className="container mx-auto px-4 py-24 max-w-[1400px] relative">
          <div className="text-center mb-32">
            <h1 className="text-5xl font-normal tracking-tight mb-4">
              Your Partner in Health and Wellness
            </h1>
            <p className="text-xl text-muted-foreground">
  We offer a robust health data management platform for all stages of your healthcare journey. 
  Our tools are designed to cater to your unique needs, ensuring secure access and actionable insights.
</p>

          </div>
          <div className="relative mx-auto max-w-5xl h-[700px] mt-32">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                index={index}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                {...service}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }
  

export default function FrontLayout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const frontPageRef = useRef(null)
  const aboutUsRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  return (
    <>
      <GlobalStyle />
      <div className="overflow-x-hidden w-full">
        <div className="relative w-full">
          <Navigation isScrolled={isScrolled} />
          <motion.div
            ref={frontPageRef}
            style={{ opacity, scale }}
            className="relative z-10"
          >
            <FrontPage />
          </motion.div>
          <motion.div
            ref={aboutUsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-20"
          >
            <AboutUs />
          </motion.div>
          <OurServices />
          <SpecializedCare />
          <Toaster position="top-center" richColors />
        </div>
        <div>
         <RecipeServiceCard/>
        </div>
        <div>
        <Smile/>
        </div>
        <div>
        <FAQ/>
        </div>
        <div>
        <Testimonials/>
        </div>
        <div>
        <Footer/>
        </div>
      </div>
    </>
  )
}

