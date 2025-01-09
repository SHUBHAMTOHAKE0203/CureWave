import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Salad, Apple, Wheat, ChevronRight, Clock, Users, 
  Droplets, Sun, Moon, Coffee, UtensilsCrossed,
  Scale, Activity, Heart, Award, Zap
} from 'lucide-react';

const mealTimes = [
  { id: 'breakfast', name: 'Breakfast', icon: Coffee, time: '7:00 - 9:00 AM' },
  { id: 'lunch', name: 'Lunch', icon: Sun, time: '12:00 - 2:00 PM' },
  { id: 'dinner', name: 'Dinner', icon: Moon, time: '7:00 - 9:00 PM' },
  { id: 'snacks', name: 'Snacks', icon: Apple, time: 'Between Meals' }
];

const healthScores = [
  { id: 1, name: 'Nutrition Score', value: 85, icon: Award, color: 'nutrition-green' },
  { id: 2, name: 'Health Index', value: 92, icon: Heart, color: 'nutrition-earth' },
  { id: 3, name: 'Energy Level', value: 78, icon: Zap, color: 'nutrition-green' },
];

const recipes = [
  {
    id: 7,
    title: 'Rainbow Veggie Stir-Fry',
    description: 'A colorful and nutrient-rich vegetarian stir-fry with seasonal vegetables',
    calories: 320,
    protein: 12,
    carbs: 42,
    fat: 14,
    prepTime: '25 mins',
    servings: 3,
    difficulty: 'Easy',
    rating: 4.6,
    reviews: 145,
    category: 'Dinner',
    dietaryInfo: ['Vegan', 'Low-Calorie'],
    ingredients: ['Bell peppers', 'Broccoli', 'Carrots', 'Snow peas', 'Tofu'],
    instructions: ['Press tofu', 'Chop vegetables', 'Make sauce', 'Stir-fry'],
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/stir-fry-recipes'
  },
  {
    id: 8,
    title: 'Overnight Chia Pudding',
    description: 'Omega-3 rich breakfast pudding with fresh fruits and nuts',
    calories: 290,
    protein: 9,
    carbs: 32,
    fat: 16,
    prepTime: '10 mins + overnight',
    servings: 2,
    difficulty: 'Easy',
    rating: 4.8,
    reviews: 203,
    category: 'Breakfast',
    dietaryInfo: ['Vegan', 'Gluten-Free'],
    ingredients: ['Chia seeds', 'Almond milk', 'Maple syrup', 'Berries', 'Almonds'],
    instructions: ['Mix ingredients', 'Refrigerate overnight', 'Add toppings'],
    image: 'https://images.unsplash.com/photo-1538252123699-b30f66f7e9f8?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/chia-seed-pudding-recipes'
  },
  {
    id: 9,
    title: 'Mediterranean Baked Fish',
    description: 'Light and flavorful baked white fish with Mediterranean herbs',
    calories: 380,
    protein: 42,
    carbs: 12,
    fat: 18,
    prepTime: '35 mins',
    servings: 2,
    difficulty: 'Medium',
    rating: 4.9,
    reviews: 167,
    category: 'Dinner',
    dietaryInfo: ['High Protein', 'Low Carb'],
    ingredients: ['White fish', 'Cherry tomatoes', 'Olives', 'Capers', 'Fresh herbs'],
    instructions: ['Prepare fish', 'Make sauce', 'Bake', 'Garnish'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/mediterranean-diet-fish-recipes'
  },
  {
    id: 4,
    title: 'Grilled Chicken Buddha Bowl',
    description: 'A protein-rich bowl with grilled chicken and fresh vegetables',
    calories: 520,
    protein: 32,
    carbs: 45,
    fat: 22,
    prepTime: '35 mins',
    servings: 2,
    difficulty: 'Medium',
    rating: 4.9,
    reviews: 178,
    category: 'Lunch',
    dietaryInfo: ['High Protein', 'Gluten-Free'],
    ingredients: ['Chicken breast', 'Quinoa', 'Sweet potato', 'Kale', 'Avocado'],
    instructions: ['Marinate chicken', 'Cook quinoa', 'Roast vegetables', 'Assemble bowl'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/buddha-bowl-recipes'
  },
  {
    id: 5,
    title: 'Berry Protein Smoothie',
    description: 'Antioxidant-rich smoothie perfect for post-workout',
    calories: 280,
    protein: 24,
    carbs: 35,
    fat: 8,
    prepTime: '10 mins',
    servings: 1,
    difficulty: 'Easy',
    rating: 4.7,
    reviews: 134,
    category: 'Breakfast',
    dietaryInfo: ['High Protein', 'Vegetarian'],
    ingredients: ['Mixed berries', 'Greek yogurt', 'Protein powder', 'Honey', 'Almond milk'],
    instructions: ['Blend all ingredients', 'Add ice if desired', 'Serve immediately'],
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/protein-smoothie-recipes'
  },
  {
    id: 6,
    title: 'Asian-Style Salmon Bowl',
    description: 'Omega-3 rich bowl with Asian-inspired flavors',
    calories: 480,
    protein: 35,
    carbs: 42,
    fat: 24,
    prepTime: '30 mins',
    servings: 2,
    difficulty: 'Medium',
    rating: 4.8,
    reviews: 167,
    category: 'Dinner',
    dietaryInfo: ['High Protein', 'Omega-3'],
    ingredients: ['Salmon fillet', 'Brown rice', 'Edamame', 'Seaweed', 'Avocado'],
    instructions: ['Cook rice', 'Grill salmon', 'Steam edamame', 'Make sauce'],
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/salmon-nutrition-benefits'
  },
  {
    id: 1,
    title: 'Mediterranean Mezze Platter',
    description: 'A colorful spread of Mediterranean appetizers',
    calories: 450,
    protein: 12,
    carbs: 48,
    fat: 28,
    prepTime: '30 mins',
    servings: 4,
    difficulty: 'Easy',
    rating: 4.8,
    reviews: 245,
    category: 'Mediterranean',
    dietaryInfo: ['Vegetarian', 'High Protein'],
    ingredients: ['Hummus', 'Falafel', 'Pita bread', 'Olives', 'Tzatziki'],
    instructions: ['Prepare hummus', 'Make falafel', 'Cut vegetables', 'Arrange platter'],
    image: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/mediterranean-diet-meal-plan'
  },
  {
    id: 2,
    title: 'Super Green Smoothie Bowl',
    description: 'Nutrient-packed breakfast bowl',
    calories: 320,
    protein: 15,
    carbs: 45,
    fat: 12,
    prepTime: '15 mins',
    servings: 1,
    difficulty: 'Easy',
    rating: 4.9,
    reviews: 189,
    category: 'Breakfast',
    dietaryInfo: ['Vegan', 'Gluten-Free'],
    ingredients: ['Spinach', 'Banana', 'Almond milk', 'Chia seeds'],
    instructions: ['Blend ingredients', 'Pour in bowl', 'Add toppings'],
    image: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/green-smoothie-benefits'
  },
  {
    id: 3,
    title: 'Quinoa Power Bowl',
    description: 'High-protein vegetarian bowl',
    calories: 440,
    protein: 18,
    carbs: 62,
    fat: 16,
    prepTime: '25 mins',
    servings: 2,
    difficulty: 'Medium',
    rating: 4.7,
    reviews: 156,
    category: 'Lunch',
    dietaryInfo: ['Vegetarian', 'High Protein'],
    ingredients: ['Quinoa', 'Chickpeas', 'Avocado', 'Kale'],
    instructions: ['Cook quinoa', 'Roast chickpeas', 'Prepare vegetables'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/quinoa-benefits'
  }
];

const nutritionFacts = [
  {
    id: 7,
    title: 'Mindful Eating',
    description: 'Practice eating slowly and mindfully to improve digestion and prevent overeating.',
    icon: Heart,
    color: 'nutrition-green'
  },
  {
    id: 8,
    title: 'Hydration Balance',
    description: 'Drink water between meals instead of during meals to optimize digestion.',
    icon: Droplets,
    color: 'nutrition-earth'
  },
  {
    id: 9,
    title: 'Rainbow Diet',
    description: 'Eat fruits and vegetables of different colors to get a wide range of nutrients.',
    icon: Salad,
    color: 'nutrition-green'
  },
  {
    id: 4,
    title: 'Essential Vitamins',
    description: 'Vitamins A, C, D, E, and B complex are crucial for immune function and overall health.',
    icon: Sun,
    color: 'nutrition-green'
  },
  {
    id: 5,
    title: 'Meal Timing',
    description: 'Eat every 3-4 hours to maintain stable blood sugar and energy levels throughout the day.',
    icon: Clock,
    color: 'nutrition-earth'
  },
  {
    id: 6,
    title: 'Fiber Intake',
    description: 'Aim for 25-30g of fiber daily from fruits, vegetables, and whole grains for gut health.',
    icon: Wheat,
    color: 'nutrition-green'
  },
  {
    id: 1,
    title: 'Protein Power',
    description: 'Essential for muscle growth and repair. Aim for 0.8-1g per kg of body weight.',
    icon: Scale,
    color: 'nutrition-green'
  },
  {
    id: 2,
    title: 'Healthy Fats',
    description: 'Important for brain health and hormone production. Choose sources like avocados and nuts.',
    icon: Heart,
    color: 'nutrition-earth'
  },
  {
    id: 3,
    title: 'Complex Carbs',
    description: 'Provides sustained energy throughout the day. Opt for whole grains and legumes.',
    icon: Activity,
    color: 'nutrition-green'
  }
];

const progressData = [
  { date: '2024-01-05', calories: 2100, protein: 82, carbs: 245, fat: 65 },
  { date: '2024-01-06', calories: 1950, protein: 88, carbs: 220, fat: 60 },
  { date: '2024-01-07', calories: 2200, protein: 90, carbs: 250, fat: 70 },
  { date: '2024-01-08', calories: 2050, protein: 85, carbs: 235, fat: 62 },
  { date: '2024-01-09', calories: 2150, protein: 87, carbs: 240, fat: 68 },
];

const goals = {
  calories: 2000,
  protein: 85,
  carbs: 230,
  fat: 65,
};



const todaysMeals = [
  {
    time: 'Breakfast',
    meals: [
      {
        name: 'Oatmeal with Berries',
        calories: 320,
        protein: 12,
        image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=500&auto=format'
      }
    ]
  },
  {
    time: 'Lunch',
    meals: [
      {
        name: 'Quinoa Buddha Bowl',
        calories: 450,
        protein: 15,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format'
      }
    ]
  },
  {
    time: 'Dinner',
    meals: [
      {
        name: 'Grilled Salmon',
        calories: 380,
        protein: 34,
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format'
      }
    ]
  }
];

const waterIntakeGoal = 8;

function WaterTracker() {
  const [glasses, setGlasses] = useState(0);

  return (
    <div className="bg-nutrition-green-50 p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Water Intake</h3>
        <Droplets className="w-6 h-6 text-nutrition-green-500" />
      </div>
      <div className="flex items-center gap-2 mb-4">
        {[...Array(waterIntakeGoal)].map((_, i) => (
          <button
            key={i}
            onClick={() => setGlasses(i + 1)}
            className={`w-8 h-12 rounded-full transition-all ${i < glasses ? 'bg-nutrition-green-500' : 'bg-nutrition-green-200'}`}
          />
        ))}
      </div>
      <p className="text-gray-700">
        {glasses} of {waterIntakeGoal} glasses
      </p>
    </div>
  );
}

function HealthScoreCard({ score }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-${score.color}-50 p-6 rounded-2xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{score.name}</h3>
        <score.icon className={`w-6 h-6 text-${score.color}-500`} />
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score.value}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`absolute h-full bg-${score.color}-500 rounded-full`}
        />
      </div>
      <p className={`text-${score.color}-700 text-2xl font-bold`}>
        {score.value}%
      </p>
    </motion.div>
  );
}

function NutritionInfoCard({ title, value, unit, icon: Icon, color = 'nutrition-green' }) {
  return (
    <div className={`bg-${color}-50 p-6 rounded-xl border border-${color}-100`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 bg-${color}-100 rounded-lg`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-bold text-${color}-600`}>{value}</span>
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>
    </div>
  );
}

function MealTimeCard({ mealTime }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-nutrition-green-100"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-nutrition-green-50 rounded-xl">
          <mealTime.icon className="w-6 h-6 text-nutrition-green-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{mealTime.name}</h3>
          <p className="text-gray-500 text-sm">{mealTime.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

function RecipeCard({ recipe }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden relative border border-nutrition-green-50 hover:border-nutrition-green-200 transition-all"
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            {recipe.dietaryInfo.map((info, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
              >
                {info}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold mb-1">{recipe.title}</h3>
          <p className="text-sm text-white/90">{recipe.description}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-amber-500">★</span>
            <span className="text-sm text-gray-600">{recipe.rating}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="text-center p-2 bg-nutrition-green-50 rounded-xl">
            <p className="text-sm font-semibold text-nutrition-green-600">{recipe.calories}</p>
            <p className="text-xs text-gray-500">Calories</p>
          </div>
          <div className="text-center p-2 bg-nutrition-earth-100 rounded-xl">
            <p className="text-sm font-semibold text-nutrition-green-600">{recipe.protein}g</p>
            <p className="text-xs text-gray-500">Protein</p>
          </div>
          <div className="text-center p-2 bg-nutrition-green-50 rounded-xl">
            <p className="text-sm font-semibold text-nutrition-green-600">{recipe.carbs}g</p>
            <p className="text-xs text-gray-500">Carbs</p>
          </div>
          <div className="text-center p-2 bg-nutrition-earth-100 rounded-xl">
            <p className="text-sm font-semibold text-nutrition-green-600">{recipe.fat}g</p>
            <p className="text-xs text-gray-500">Fat</p>
          </div>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <h4 className="font-semibold mb-2">Key Ingredients:</h4>
              <div className="flex flex-wrap gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="flex gap-4">
          <motion.a
            href={recipe.article}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-3 bg-nutrition-green-500 text-white text-center rounded-xl hover:bg-nutrition-green-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            Read Full Recipe
          </motion.a>
          <motion.button
            className="px-4 py-3 bg-nutrition-earth-100 text-nutrition-green-600 rounded-xl hover:bg-nutrition-earth-200 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(!showDetails);
            }}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

const formAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};

function AddMealForm({ onAdd }) {
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    time: 'Breakfast',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...newMeal,
      id: Date.now(),
      date: new Date().toISOString(),
      calories: parseInt(newMeal.calories),
      protein: parseInt(newMeal.protein),
      carbs: parseInt(newMeal.carbs),
      fat: parseInt(newMeal.fat)
    });
    setNewMeal({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      time: 'Breakfast',
      notes: ''
    });
  };

  return (
    <motion.form
      variants={formAnimation}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit} 
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meal Name</label>
          <input
            type="text"
            value={newMeal.name}
            onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-nutrition-green-500 focus:ring-1 focus:ring-nutrition-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
          <select
            value={newMeal.time}
            onChange={(e) => setNewMeal({ ...newMeal, time: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-nutrition-green-500 focus:ring-1 focus:ring-nutrition-green-500"
          >
            <option>Breakfast</option>
            <option>Morning Snack</option>
            <option>Lunch</option>
            <option>Afternoon Snack</option>
            <option>Dinner</option>
            <option>Evening Snack</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
          <input
            type="number"
            value={newMeal.calories}
            onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-nutrition-green-500 focus:ring-1 focus:ring-nutrition-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
          <input
            type="number"
            value={newMeal.protein}
            onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-nutrition-green-500 focus:ring-1 focus:ring-nutrition-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
          <input
            type="number"
            value={newMeal.carbs}
            onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-nutrition-green-500 focus:ring-1 focus:ring-nutrition-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fat (g)</label>
          <input
            type="number"
            value={newMeal.fat}
            onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-nutrition-green-500 focus:ring-1 focus:ring-nutrition-green-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          value={newMeal.notes}
          onChange={(e) => setNewMeal({ ...newMeal, notes: e.target.value })}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-nutrition-green-500 focus:ring-1 focus:ring-nutrition-green-500"
          rows={2}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full px-6 py-3 bg-nutrition-green-500 text-white rounded-xl font-semibold hover:bg-nutrition-green-600 transition-colors"
      >
        Add Meal
      </motion.button>
    </motion.form>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.6
    }
  }
};

function MealHistoryCard({ meal, onDelete }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        y: -5,
        transition: { type: 'spring', stiffness: 300 }
      }}
      className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-nutrition-green-50 hover:border-nutrition-green-200 transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-lg text-gray-900">{meal.name}</h4>
          <p className="text-sm text-gray-500">{meal.time} • {new Date(meal.date).toLocaleDateString()}</p>
        </div>
        <button
          onClick={() => onDelete(meal.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-3">
        <div className="text-center p-2 bg-nutrition-green-50 rounded-lg">
          <p className="text-sm font-semibold text-nutrition-green-600">{meal.calories}</p>
          <p className="text-xs text-gray-500">Calories</p>
        </div>
        <div className="text-center p-2 bg-nutrition-earth-50 rounded-lg">
          <p className="text-sm font-semibold text-nutrition-green-600">{meal.protein}g</p>
          <p className="text-xs text-gray-500">Protein</p>
        </div>
        <div className="text-center p-2 bg-nutrition-green-50 rounded-lg">
          <p className="text-sm font-semibold text-nutrition-green-600">{meal.carbs}g</p>
          <p className="text-xs text-gray-500">Carbs</p>
        </div>
        <div className="text-center p-2 bg-nutrition-earth-50 rounded-lg">
          <p className="text-sm font-semibold text-nutrition-green-600">{meal.fat}g</p>
          <p className="text-xs text-gray-500">Fat</p>
        </div>
      </div>

      {meal.notes && (
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{meal.notes}</p>
      )}
    </motion.div>
  );
}

function TodaysMealCard({ meal }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-nutrition-green-50 hover:border-nutrition-green-200 transition-all"
    >
      <div className="relative h-32">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 text-white">
          <h4 className="font-semibold">{meal.name}</h4>
          <div className="flex items-center gap-3 text-sm">
            <span>{meal.calories} cal</span>
            <span>{meal.protein}g protein</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function NutritionInfo() {
  const [trackedMeals, setTrackedMeals] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-nutrition-earth-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-nutrition-green-600 via-nutrition-earth-500 to-nutrition-green-700 py-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 max-w-3xl mx-auto text-white drop-shadow-lg tracking-tight">
            Your Journey to Better Health Starts with Nutrition
          </h1>
          <p className="text-xl text-white/90 max-w-xl mx-auto mb-10 drop-shadow leading-relaxed">
            Discover personalized meal plans, expert nutrition advice, and delicious healthy recipes
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('meals')}
              className="px-8 py-4 bg-white text-nutrition-green-600 rounded-2xl font-semibold hover:bg-nutrition-green-50 transition-all hover:scale-105 shadow-lg"
            >
              View Today's Meals
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className="px-8 py-4 bg-white/90 backdrop-blur-sm text-nutrition-green-600 rounded-2xl font-semibold hover:bg-white transition-all hover:scale-105 shadow-lg ml-4"
            >
              Explore Recipes
            </button>
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1800&auto=format')] bg-cover bg-center opacity-20" />
      </section>

      {/* Health Scores */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {healthScores.map((score) => (
              <HealthScoreCard key={score.id} score={score} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
            {['overview', 'meals', 'recipes', 'tracking'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-nutrition-green-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {nutritionFacts.map((fact) => (
                  <motion.div
                    key={fact.id}
                    className={`p-6 bg-${fact.color}-50 rounded-2xl transform transition-all duration-300 hover:shadow-xl`}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 bg-${fact.color}-100 rounded-xl`}>
                        <fact.icon className={`w-6 h-6 text-${fact.color}-500`} />
                      </div>
                      <h3 className="text-xl font-semibold">{fact.title}</h3>
                    </div>
                    <p className="text-gray-600">{fact.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'meals' && (
              <motion.div
                key="meals"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Nutrition Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  <NutritionInfoCard
                    title="Daily Calories"
                    value="2000"
                    unit="kcal"
                    icon={Activity}
                    color="nutrition-green"
                  />
                  <NutritionInfoCard
                    title="Protein Goal"
                    value="85"
                    unit="g"
                    icon={Scale}
                    color="nutrition-earth"
                  />
                  <NutritionInfoCard
                    title="Carbs Goal"
                    value="230"
                    unit="g"
                    icon={Wheat}
                    color="nutrition-green"
                  />
                  <NutritionInfoCard
                    title="Fat Goal"
                    value="65"
                    unit="g"
                    icon={Droplets}
                    color="nutrition-earth"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                  {mealTimes.map((mealTime) => (
                    <MealTimeCard key={mealTime.id} mealTime={mealTime} />
                  ))}
                </div>

                <h3 className="text-2xl font-bold mb-6">Today's Meals</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {todaysMeals.map((timeSlot) => (
                    <div key={timeSlot.time}>
                      <h4 className="font-semibold mb-3 text-gray-600">{timeSlot.time}</h4>
                      {timeSlot.meals.map((meal, index) => (
                        <TodaysMealCard key={index} meal={meal} />
                      ))}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <WaterTracker />
                </div>
              </motion.div>
            )}

            {activeTab === 'recipes' && (
              <motion.div
                key="recipes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </motion.div>
            )}

            {activeTab === 'tracking' && (
              <motion.div
                key="tracking"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Add Meal Form */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-nutrition-green-100 mb-8">
                  <h3 className="text-2xl font-semibold mb-6">Track New Meal</h3>
                  <AddMealForm onAdd={(meal) => setTrackedMeals([meal, ...trackedMeals])} />
                </div>

                {/* Meal History */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-nutrition-green-100 mb-8">
                  <h3 className="text-2xl font-semibold mb-6">Meal History</h3>
                  <div className="space-y-4">
                    {trackedMeals.map((meal) => (
                      <MealHistoryCard
                        key={meal.id}
                        meal={meal}
                        onDelete={(id) => setTrackedMeals(trackedMeals.filter(m => m.id !== id))}
                      />
                    ))}
                    {trackedMeals.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No meals tracked yet. Add your first meal above!</p>
                    )}
                  </div>
                </div>

                {/* Daily Progress */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl space-y-6 border border-nutrition-green-100">
                  <h3 className="text-2xl font-semibold mb-6">Today's Progress</h3>
                  
                  {/* Calories Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Calories</span>
                      <span>{progressData[4].calories} / {goals.calories} kcal</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(progressData[4].calories / goals.calories) * 100}%` }}
                        className="h-full bg-nutrition-green-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Protein Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Protein</span>
                      <span>{progressData[4].protein}g / {goals.protein}g</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(progressData[4].protein / goals.protein) * 100}%` }}
                        className="h-full bg-nutrition-earth-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Carbs Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Carbs</span>
                      <span>{progressData[4].carbs}g / {goals.carbs}g</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(progressData[4].carbs / goals.carbs) * 100}%` }}
                        className="h-full bg-nutrition-green-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Fat Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fat</span>
                      <span>{progressData[4].fat}g / {goals.fat}g</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(progressData[4].fat / goals.fat) * 100}%` }}
                        className="h-full bg-nutrition-earth-500 rounded-full"
                      />
                    </div>
                  </div>

                  <WaterTracker />
                </div>

                {/* Weekly Progress */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6">Your Journey</h3>
                  <div className="space-y-6">
                    {progressData.map((day, index) => (
                      <motion.div
                        key={day.date}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-nutrition-green-50 hover:border-nutrition-green-200 transition-colors"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                          <span className={`text-sm ${day.calories <= goals.calories ? 'text-nutrition-green-500' : 'text-nutrition-earth-500'}`}>
                            {day.calories} kcal
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>Protein: {day.protein}g</div>
                          <div>Carbs: {day.carbs}g</div>
                          <div>Fat: {day.fat}g</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-nutrition-green-600 to-nutrition-earth-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Start Your Health Journey Today</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get personalized nutrition advice, meal plans, and expert guidance
              to achieve your health goals.
            </p>
            <button className="px-8 py-3 bg-white text-nutrition-green-500 rounded-xl font-semibold hover:bg-nutrition-green-50 transition-colors">
              Get Started Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
