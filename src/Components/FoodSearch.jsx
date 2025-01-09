import React, { useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { GiOrangeSlice, GiPineapple, GiGrapes, GiStrawberry } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const healthTipsData = [
  {
    id: 1,
    title: "Balanced Diet Essentials",
    content: "A balanced diet should include proteins, carbohydrates, healthy fats, vitamins, and minerals. Aim to include all food groups in your daily meals.",
    icon: "🥗"
  },
  {
    id: 2,
    title: "Hydration is Key",
    content: "Drink at least 8 glasses of water daily. Water helps in digestion, absorption, and transportation of nutrients.",
    icon: "💧"
  },
  {
    id: 3,
    title: "Portion Control",
    content: "Use smaller plates and bowls to control portions. Listen to your body's hunger and fullness signals.",
    icon: "🍽️"
  },
  {
    id: 4,
    title: "Eat the Rainbow",
    content: "Different colored fruits and vegetables provide different nutrients. Try to include a variety of colors in your diet.",
    icon: "🌈"
  },
  {
    id: 5,
    title: "Mindful Eating",
    content: "Eat slowly and without distractions. This helps better digestion and prevents overeating.",
    icon: "🧘"
  },
  {
    id: 6,
    title: "Protein Power",
    content: "Include lean proteins in every meal to support muscle health and maintain energy levels throughout the day.",
    icon: "🥩"
  },
  {
    id: 7,
    title: "Fiber Focus",
    content: "Aim for 25-30g of fiber daily. High-fiber foods help maintain digestive health and keep you feeling full longer.",
    icon: "🌾"
  },
  {
    id: 8,
    title: "Smart Snacking",
    content: "Choose nutrient-rich snacks like nuts, fruits, or yogurt instead of processed foods.",
    icon: "🥜"
  },
  {
    id: 9,
    title: "Meal Timing",
    content: "Eat regular meals at consistent times to maintain stable blood sugar levels and prevent overeating.",
    icon: "⏰"
  },
  {
    id: 10,
    title: "Healthy Fats",
    content: "Include sources of healthy fats like avocados, nuts, and olive oil in your diet for heart and brain health.",
    icon: "🥑"
  }
];

const FoodSearch = () => {
  const [query, setQuery] = useState('');
  const [foodData, setFoodData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleSearch = async () => {
    if (!query) {
      setError('Please enter a food name.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=mnv47hh5GWSxdtRPfWAlqYxbSaqygzS6SjtZM10t`
      );

      const food = response.data.foods[0];

      if (food) {
        setFoodData(food);
      } else {
        setError('No food data found.');
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getNutrientData = () => {
    if (!foodData) return null;

    const nutrients = foodData.foodNutrients.slice(0, 4);
    return {
      labels: nutrients.map(n => n.nutrientName),
      datasets: [
        {
          data: nutrients.map(n => n.value),
          backgroundColor: [
            'rgba(135, 206, 235, 0.8)',
            'rgba(0, 119, 190, 0.8)',
            'rgba(173, 216, 230, 0.8)',
            'rgba(0, 191, 255, 0.8)',
          ],
          borderColor: [
            'rgba(135, 206, 235, 1)',
            'rgba(0, 119, 190, 1)',
            'rgba(173, 216, 230, 1)',
            'rgba(0, 191, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getBarData = () => {
    if (!foodData) return null;

    const nutrients = foodData.foodNutrients.slice(4, 8);
    return {
      labels: nutrients.map(n => n.nutrientName),
      datasets: [{
        label: 'Amount',
        data: nutrients.map(n => n.value),
        backgroundColor: 'rgba(0, 119, 190, 0.6)',
        borderColor: 'rgba(0, 119, 190, 1)',
        borderWidth: 1
      }]
    };
  };

  const NutrientCard = ({ title, value, unit, index }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      }}
      className="bg-white rounded-xl p-4 shadow-lg backdrop-blur-sm bg-opacity-90"
    >
      <h4 className="text-sm text-gray-600 mb-1">{title}</h4>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className="ml-1 text-gray-500">{unit}</span>
      </div>
    </motion.div>
  );

  return (
    <div>
    <Navigation/>
    <div className="min-h-screen pt-20 bg-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <motion.div 
          className="flex items-center justify-center mb-8 relative"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left side icons */}
          <motion.div 
            className="absolute left-0 flex gap-4"
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <GiOrangeSlice className="text-4xl text-orange-500" />
            <GiGrapes className="text-4xl text-purple-500" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Nutrition Explorer
          </h1>

          {/* Right side icons */}
          <motion.div 
            className="absolute right-0 flex gap-4"
            animate={{ 
              rotate: [0, -5, 5, 0],
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <GiPineapple className="text-4xl text-yellow-600" />
            <GiStrawberry className="text-4xl text-red-500" />
          </motion.div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 mb-8 text-center max-w-3xl mx-auto"
        >
          Discover the nutritional composition of your foods and make informed dietary choices for a healthier lifestyle.
        </motion.p>

        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => setActiveTab('search')}
            className={`px-6 py-2 rounded-l-lg transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'search' 
                ? 'bg-sky-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Food Search
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-6 py-2 rounded-r-lg transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'tips' 
                ? 'bg-sky-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Health Tips
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'search' ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <motion.div 
                className="flex flex-col md:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter a food item"
                  className="flex-1 p-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300"
                />
                <motion.button
                  onClick={handleSearch}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-all duration-300"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    'Search'
                  )}
                </motion.button>
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-center"
                >
                  {error}
                </motion.p>
              )}

              {foodData && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-sky-50 rounded-xl p-6 shadow-lg"
                >
                  <motion.h2 
                    variants={itemVariants}
                    className="text-3xl font-bold text-gray-900 mb-4"
                  >
                    {foodData.description}
                  </motion.h2>
                  <motion.p 
                    variants={itemVariants}
                    className="text-gray-600 mb-6"
                  >
                    <strong>Food Group:</strong> {foodData.foodCategory}
                  </motion.p>

                  <div className="space-y-8">
                    {/* Main Nutrients Grid */}
                    <motion.div 
                      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                      variants={containerVariants}
                    >
                      {foodData.foodNutrients.slice(0, 12).map((nutrient, index) => (
                        <NutrientCard
                          key={nutrient.nutrientName}
                          title={nutrient.nutrientName}
                          value={nutrient.value}
                          unit={nutrient.unitName}
                          index={index}
                        />
                      ))}
                    </motion.div>

                    {/* Charts Section */}
                    <motion.div 
                      className="grid md:grid-cols-2 gap-8"
                      variants={containerVariants}
                    >
                      <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Nutrient Distribution
                        </h3>
                        <motion.div 
                          className="bg-white p-4 rounded-xl shadow-lg"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          {getNutrientData() && (
                            <Pie data={getNutrientData()} options={{ responsive: true }} />
                          )}
                        </motion.div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Additional Nutrients Analysis
                        </h3>
                        <motion.div 
                          className="bg-white p-4 rounded-xl shadow-lg h-[300px]"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          {getBarData() && (
                            <Bar 
                              data={getBarData()} 
                              options={{
                                responsive: true,
                                maintainAspectRatio: false,
                              }} 
                            />
                          )}
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Detailed Nutrients Grid */}
                    <motion.div variants={containerVariants}>
                      <motion.h3 
                        variants={itemVariants}
                        className="text-xl font-semibold text-gray-900 mb-4"
                      >
                        Complete Nutritional Profile
                      </motion.h3>
                      <motion.div 
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        variants={containerVariants}
                      >
                        {foodData.foodNutrients.slice(12).map((nutrient, index) => (
                          <NutrientCard
                            key={nutrient.nutrientName}
                            title={nutrient.nutrientName}
                            value={nutrient.value}
                            unit={nutrient.unitName}
                            index={index}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="tips"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {healthTipsData.map((tip, index) => (
                <motion.div 
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  }}
                  className="bg-sky-50 rounded-lg p-6 shadow-lg"
                >
                  <motion.div 
                    className="text-4xl mb-4"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {tip.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600">{tip.content}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    </div>
  );
};

export default FoodSearch;

