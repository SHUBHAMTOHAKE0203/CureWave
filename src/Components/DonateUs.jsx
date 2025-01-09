import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, DollarSign, HelpingHand } from 'lucide-react';
import Navigation from './Navigation';
const ImpactCard = ({ icon: Icon, title, value }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className="w-8 h-8 text-blue-500 mb-4" />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold text-blue-600">{value}</p>
  </motion.div>
);

const DonationOption = ({ amount, description }) => (
  <motion.div
    className="bg-blue-50 p-6 rounded-xl cursor-pointer"
    whileHover={{ scale: 1.05, backgroundColor: "#EBF5FF" }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <h4 className="text-2xl font-bold text-blue-700 mb-2">₹{amount}</h4>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const impactItems = [
  { icon: '💊', label: 'Medicines Provided', baseValue: 10, unit: 'families' },
  { icon: '🏥', label: 'Health Camps Supported', baseValue: 0.2, unit: 'days' },
  { icon: '🩺', label: 'Medical Check-ups', baseValue: 5, unit: 'people' },
  { icon: '🚑', label: 'Emergency Responses', baseValue: 0.1, unit: 'cases' },
];

const ImpactVisualizer = () => {
  const [donationAmount, setDonationAmount] = useState(50);

  return (
    <div>
    <Navigation/>
    
    <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Visualize Your Impact</h3>
      <div className="mb-6">
        <label htmlFor="donation-slider" className="block text-sm font-medium text-gray-700 mb-2">
          Donation Amount: ₹{donationAmount}
        </label>
        <input
          type="range"
          id="donation-slider"
          min="10"
          max="500"
          step="10"
          value={donationAmount}
          onChange={(e) => setDonationAmount(parseInt(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {impactItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="bg-blue-50 p-4 rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="text-4xl mb-2"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              {item.icon}
            </motion.div>
            <p className="text-lg font-semibold text-blue-700">
              {Math.floor(donationAmount * item.baseValue)}
            </p>
            <p className="text-sm text-gray-600">
              {item.label}
              <br />
              ({item.unit})
            </p>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  );
};

const DonateUs = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 pt-48 to-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Us in Making a Difference</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your generosity can change lives. At CureWave, we're committed to helping those in need
            by providing essential medical care, supplies, and support to underprivileged communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3"
              alt="Volunteers helping in a medical camp"
              className="w-full h-[400px] object-cover rounded-xl shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">How Your Donation Helps</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <ArrowRight className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Provides essential medical supplies to remote areas</p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Supports free health camps for underprivileged communities</p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Funds life-saving surgeries for those who can't afford them</p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Enables continuous medical education for healthcare workers</p>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Impact So Far</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ImpactCard icon={Users} title="Lives Touched" value="50,000+" />
            <ImpactCard icon={Heart} title="Surgeries Funded" value="500+" />
            <ImpactCard icon={DollarSign} title="Funds Raised" value="₹2M+" />
            <ImpactCard icon={HelpingHand} title="Volunteers" value="1,000+" />
          </div>
        </motion.div>

        <ImpactVisualizer />

       

        <div className="text-center mb-16">
  <h3 className="text-2xl font-bold text-gray-900 mb-6">Scan to Donate</h3>
  <div className="bg-white p-8 rounded-xl shadow-lg inline-block">
    <div className="w-48 h-48 bg-gray-200 mb-4 flex items-center justify-center">
      <img src="QRCode.jpg" alt="QR Code" className="w-full h-full object-contain" />
    </div>
    <p className="text-gray-600">Scan this QR code to make a quick donation</p>
  </div>
</div>

      


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Testimonial</h3>
          <blockquote className="text-xl italic text-gray-600 max-w-3xl mx-auto">
            "Thanks to the generous donations to CureWave, I was able to receive the life-saving surgery
            I desperately needed but couldn't afford. You've given me a second chance at life."
          </blockquote>
          <p className="mt-4 font-semibold text-gray-900">- Arundhati, beneficiary</p>
        </motion.div>
      </div>
    </div>
  );
};

export default DonateUs;

