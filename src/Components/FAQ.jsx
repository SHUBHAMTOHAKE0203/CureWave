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
      question: "What is CureWave's primary service?",
      answer: "CureWave specializes in health data management, providing a secure platform to store, access, and share your medical records. Our tools are designed to enhance collaboration between patients and healthcare providers."
    },
    {
      question: "How can I access my health data?",
      answer: "You can access your health data anytime through our user-friendly web portal or mobile app. Our platform ensures secure login and provides an intuitive interface for seamless navigation."
    },
    {
      question: "Is my health data secure with CureWave?",
      answer: "Absolutely. CureWave uses advanced encryption and security protocols to protect your data. We comply with all relevant healthcare regulations, ensuring your information remains confidential."
    },
    {
      question: "Can I share my health records with my doctor?",
      answer: "Yes, CureWave allows you to share your health records securely with your healthcare providers. You can control who has access to your data and for how long, ensuring complete privacy."
    },
    {
      question: "Do you offer real-time updates and notifications?",
      answer: "Yes, CureWave provides real-time updates and notifications for new test results, data changes, and appointment reminders. Stay informed and connected at all times."
    }
  ];
  

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

