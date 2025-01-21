import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Clock, Utensils, Flame, Apple, Droplet, Users, Search, X } from "lucide-react";

function NutritionInfoPage() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState();

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=9c1d6773e30b43d6816b5b2ce3428570&timeFrame=day&targetCalories=${calories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error fetching data");
      });
  }

  function handleChange(e) {
    setCalories(e.target.value);
  }

  if (!mealData || !mealData.nutrients || !mealData.meals) {
    return (
      <div
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center px-4 py-8"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      >
        <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-xl">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Healthy Recipe Finder</h1>
          <p className="text-lg text-gray-600 mb-6">Enter your daily calorie goal:</p>
          <div className="flex justify-center space-x-4 mb-6">
            <input
              type="number"
              placeholder="Calories (e.g. 2000)"
              onChange={handleChange}
              value={calories}
              className="border p-3 rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={getMealData}
              className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              Get Daily Meal Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nutrients = mealData.nutrients;

  return (
    <main
      className="bg-cover bg-center min-h-screen flex flex-col px-6 py-10"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-xl">
        <section className="text-center mb-12">
          <motion.h1
            className="text-5xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Healthy Recipe Finder
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Find meal plans based on your calorie goal.
          </motion.p>
          <div className="flex justify-center space-x-4 mb-8">
            <input
              type="number"
              placeholder="Calories (e.g. 2000)"
              onChange={handleChange}
              value={calories}
              className="border p-3 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={getMealData}
              className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              Get Daily Meal Plan
            </button>
          </div>
        </section>

        {/* Nutritional Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Nutritional Cards */}
        </section>

        {/* Meal Plan */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {mealData.meals.slice(0, 10).map((meal) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <Meal meal={meal} />
            </motion.div>
          ))}
        </section>
      </div>
    </main>
  );
}

function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=9c1d6773e30b43d6816b5b2ce3428570&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [meal.id]);

  return (
    <article className="flex flex-col justify-between h-full">
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error loading image</p>}
      {!loading && !error && (
        <>
          <img
            className="w-full h-56 object-cover"
            src={imageUrl}
            alt={meal.title}
          />
          <div className="p-6 flex flex-col justify-between h-full">
            <h2 className="text-2xl font-semibold text-gray-800">{meal.title}</h2>
            <ul className="mt-4 text-gray-600 space-y-2">
              <li><strong>Preparation time:</strong> {meal.readyInMinutes} minutes</li>
              <li><strong>Servings:</strong> {meal.servings}</li>
            </ul>
            <div className="mt-4">
              <a
                href={meal.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
              >
                Go to Recipe <FaArrowRight className="ml-1" />
              </a>
            </div>
          </div>
        </>
      )}
    </article>
  );
}

export default NutritionInfoPage;
