import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div
      initial={false}
      className="border-b border-blue-100 last:border-none"
    >
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-6 text-left"
      >
        <span className="text-xl font-medium text-gray-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-500"
        >
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "What medical services do you offer?",
      answer: "We offer a comprehensive range of medical services including preventive care, specialized treatments, diagnostic services, and rehabilitation programs. Our facilities are equipped with state-of-the-art technology and staffed by experienced healthcare professionals to provide the highest quality of care."
    },
    {
      question: "How do I schedule an appointment?",
      answer: "Scheduling an appointment is easy! You can book online through our patient portal, call our dedicated appointment line, or use our mobile app. We offer flexible scheduling options including same-day appointments for urgent cases and extended hours for your convenience."
    },
    {
      question: "Do you accept insurance?",
      answer: "Yes, we accept most major insurance plans and work with various healthcare providers. Our billing team can help verify your coverage and explain any out-of-pocket costs before your visit. We also offer flexible payment plans for those without insurance."
    },
    {
      question: "What should I bring to my first appointment?",
      answer: "Please bring a valid photo ID, your insurance card, a list of current medications, relevant medical records, and any recent test results. Arriving 15 minutes early to complete necessary paperwork will help ensure a smooth first visit."
    },
    {
      question: "Are telehealth services available?",
      answer: "Yes, we offer secure telehealth consultations for eligible appointments. This service allows you to connect with our healthcare providers from the comfort of your home using your computer or mobile device. Contact us to learn if your condition qualifies for telehealth."
    }
  ]

  return (
    <div className="py-24 bg-gradient-to-br from-blue-50/50 to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our services and care
          </p>
        </div>
        
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

