import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const Button = ({ children, className, ...props }) => (
  <button
    className={`inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
)

const testimonials = [
  {
    id: 1,
    content: "The care I received was exceptional. The staff was attentive, professional, and truly cared about my well-being. I couldn't have asked for a better healthcare experience.",
    author: "Anuradha Joshi",
    role: "Patient",
    image: "https://i.pinimg.com/originals/8c/6a/78/8c6a785483ee3e92d8163f2fac2cc567.jpg",
    rating: 5
  },
  {
    id: 2,
    content: "State-of-the-art facilities combined with compassionate care. The doctors took time to explain everything thoroughly and made sure all my concerns were addressed.",
    author: "Ram Tirthkar",
    role: "Regular Patient",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7yEGVr0WDqJTtcLbXpUXmUSwwzlHDtF1XA&s",
    rating: 5
  },
  {
    id: 3,
    content: "From the moment I walked in, I felt welcomed and cared for. The medical team's expertise and the modern facilities made my treatment journey smooth and successful.",
    author: "Shila Yadav",
    role: "Recovery Patient",
    image: "https://as2.ftcdn.net/jpg/01/34/87/59/1000_F_134875961_8odtbDofzxum7RKlkt0Zk4nIVoYfwXCv.jpg",
    rating: 5
  }
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setActiveIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="py-24 bg-white rounded-b-[50px]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block text-blue-500 text-lg font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.span>
          <motion.h2 
            className="text-5xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What Our Patients Say
          </motion.h2>
        </div>

        <div className="relative h-[400px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className="absolute inset-0"
            >
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 shadow-lg h-full">
                <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                  <div className="w-full md:w-1/3">
                    <div className="relative w-32 h-32 mx-auto">
                      <div className="absolute inset-0 bg-blue-200 rounded-full blur-2xl opacity-50" />
                      <img
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].author}
                        className="relative w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1 mb-4">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <blockquote className="text-xl md:text-2xl text-gray-900 leading-relaxed mb-6">
                      "{testimonials[activeIndex].content}"
                    </blockquote>
                    
                    <div>
                      <cite className="not-italic">
                        <span className="block text-lg font-semibold text-gray-900">
                          {testimonials[activeIndex].author}
                        </span>
                        <span className="text-blue-500">
                          {testimonials[activeIndex].role}
                        </span>
                      </cite>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1)
                    setActiveIndex(index)
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-blue-500' : 'bg-blue-200'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => paginate(1)}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

