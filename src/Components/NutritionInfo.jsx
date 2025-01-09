import React from 'react'
import { Salad, Apple, Wheat, ChevronRight, Clock, Users } from 'lucide-react'

const icons = {
  Salad,
  Apple,
  Wheat,
  Fish: Wheat,
  Beef: Apple,
}

const recipes = [

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
    ingredients: [
      'Hummus',
      'Falafel',
      'Pita bread',
      'Olives',
      'Tzatziki'
    ],
    instructions: [
      'Prepare hummus',
      'Make falafel',
      'Cut vegetables',
      'Arrange platter'
    ],
    image: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/mediterranean-diet-meal-plan'
  },
  {
    id: 2,
    title: 'Teriyaki Tofu Stir-Fry',
    description: 'Plant-based protein with colorful vegetables',
    calories: 380,
    protein: 22,
    carbs: 42,
    fat: 16,
    prepTime: '25 mins',
    servings: 3,
    ingredients: [
      'Firm tofu',
      'Mixed vegetables',
      'Teriyaki sauce',
      'Brown rice',
      'Sesame seeds'
    ],
    instructions: [
      'Press and cube tofu',
      'Stir-fry vegetables',
      'Add sauce',
      'Serve over rice'
    ],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/what-is-tofu'
  },
  {
    id: 3,
    title: 'Banana Oatmeal Pancakes',
    description: 'Healthy breakfast pancakes with no added sugar',
    calories: 310,
    protein: 12,
    carbs: 52,
    fat: 8,
    prepTime: '15 mins',
    servings: 2,
    ingredients: [
      'Oats',
      'Bananas',
      'Eggs',
      'Cinnamon',
      'Maple syrup'
    ],
    instructions: [
      'Blend ingredients',
      'Cook pancakes',
      'Top with fruits',
      'Serve warm'
    ],
    image: 'https://images.unsplash.com/photo-1575853121743-60c24f0a7502?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/healthy-breakfast-recipes'
  },
  {
    id: 4,
    title: 'Quinoa Buddha Bowl',
    description: 'A nourishing bowl packed with protein and vegetables',
    calories: 450,
    protein: 15,
    carbs: 65,
    fat: 12,
    prepTime: '25 mins',
    servings: 2,
    ingredients: [
      '1 cup quinoa',
      '2 cups mixed vegetables',
      '1 avocado',
      'Tahini dressing'
    ],
    instructions: [
      'Cook quinoa according to package instructions',
      'Roast vegetables with olive oil',
      'Assemble bowl with quinoa base',
      'Top with vegetables and avocado',
      'Drizzle with tahini dressing'
    ],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/quinoa-benefits'
  },
  {
    id: 2,
    title: 'Mediterranean Grilled Salmon',
    description: 'Heart-healthy salmon with Mediterranean herbs',
    calories: 380,
    protein: 34,
    carbs: 8,
    fat: 24,
    prepTime: '20 mins',
    servings: 4,
    ingredients: [
      '4 salmon fillets',
      'Olive oil',
      'Mediterranean herbs',
      'Lemon',
      'Garlic'
    ],
    instructions: [
      'Marinate salmon with herbs and olive oil',
      'Preheat grill to medium-high',
      'Grill salmon for 4-5 minutes per side',
      'Squeeze fresh lemon before serving'
    ],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/11-benefits-of-salmon'
  },
  {
    id: 3,
    title: 'Vegan Chickpea Curry',
    description: 'Protein-rich curry with aromatic Indian spices',
    calories: 320,
    protein: 12,
    carbs: 45,
    fat: 14,
    prepTime: '30 mins',
    servings: 4,
    ingredients: [
      'Chickpeas',
      'Coconut milk',
      'Tomatoes',
      'Indian spices',
      'Rice'
    ],
    instructions: [
      'Sauté onions and spices',
      'Add chickpeas and tomatoes',
      'Simmer with coconut milk',
      'Serve over steamed rice'
    ],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/chickpeas-nutrition-benefits'
  },
  {
    id: 4,
    title: 'Green Smoothie Bowl',
    description: 'Nutrient-packed breakfast bowl',
    calories: 280,
    protein: 10,
    carbs: 42,
    fat: 8,
    prepTime: '10 mins',
    servings: 1,
    ingredients: [
      'Spinach',
      'Banana',
      'Mango',
      'Chia seeds',
      'Almond milk'
    ],
    instructions: [
      'Blend all ingredients until smooth',
      'Pour into bowl',
      'Top with granola and fruits',
      'Add honey if desired'
    ],
    image: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=500&auto=format',
    article: 'https://www.healthline.com/nutrition/green-smoothie-benefits'
  }
]

const nutritionFacts = [
  {
    id: 1,
    title: 'Protein Power',
    description: 'Essential for muscle growth and repair. Aim for 0.8-1g per kg of body weight.',
    icon: 'Beef'
  },
  {
    id: 2,
    title: 'Healthy Fats',
    description: 'Important for brain health and hormone production. Choose sources like avocados and nuts.',
    icon: 'Apple'
  },
  {
    id: 3,
    title: 'Complex Carbs',
    description: 'Provides sustained energy throughout the day. Opt for whole grains and legumes.',
    icon: 'Wheat'
  }
]

const foodCategories = [
  {
    id: 1,
    name: 'Leafy Greens',
    benefits: [
      'Rich in vitamins K, C, and E',
      'High in fiber and antioxidants',
      'Supports immune system',
      'Promotes eye health'
    ],
    icon: 'Salad'
  },
  {
    id: 2,
    name: 'Lean Proteins',
    benefits: [
      'Builds and repairs muscles',
      'Promotes satiety',
      'Supports immune function',
      'Maintains healthy bones'
    ],
    icon: 'Fish'
  },
  {
    id: 3,
    name: 'Whole Grains',
    benefits: [
      'Provides sustained energy',
      'Rich in B vitamins',
      'Supports heart health',
      'Aids digestive health'
    ],
    icon: 'Wheat'
  }
]

const healthTips = [
  {
    title: 'Portion Control',
    description: 'Use smaller plates and listen to your body\'s hunger signals.'
  },
  {
    title: 'Meal Timing',
    description: 'Eat regular meals to maintain stable blood sugar levels.'
  },
  {
    title: 'Hydration',
    description: 'Drink 8-10 glasses of water daily for optimal health.'
  }
]

function RecipeCard({ title, description, calories, protein, carbs, fat, image, prepTime, servings, article }) {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <img src={image} alt={title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex items-center gap-4 mb-4 text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{prepTime}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{servings} servings</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 text-sm mb-4">
          <div className="text-center">
            <p className="font-semibold">{calories}</p>
            <p className="text-gray-500">Calories</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{protein}g</p>
            <p className="text-gray-500">Protein</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{carbs}g</p>
            <p className="text-gray-500">Carbs</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{fat}g</p>
            <p className="text-gray-500">Fat</p>
          </div>
        </div>

        <a 
          href={article} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block w-full px-4 py-2 text-center text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors duration-300"
        >
          View Recipe Details
        </a>
      </div>
    </div>
  )
}

export default function NutritionInfo() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slideDown">
            Your Guide to Healthy Living
          </h1>
          <p className="text-xl md:text-2xl text-primary-50 max-w-2xl">
            Discover nutritious recipes and learn about the power of healthy eating
          </p>
        </div>
      </section>

      {/* Quick Facts Banner */}
      <section className="bg-secondary-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-secondary-700">2000+</p>
              <p className="text-secondary-600">Calories Daily Goal</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-700">5-9</p>
              <p className="text-secondary-600">Servings of Fruits & Veggies</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-700">8</p>
              <p className="text-secondary-600">Glasses of Water</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition Facts Section */}
      <section className="py-16 bg-white animate-fadeIn">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Essential Nutrition Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nutritionFacts.map((fact) => {
              const Icon = icons[fact.icon]
              return (
                <div key={fact.id} className="p-6 bg-primary-50 rounded-lg transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{fact.title}</h3>
                  <p className="text-gray-600">{fact.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="py-16 bg-gray-50 animate-fadeIn">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Healthy Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* Food Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Food Categories & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {foodCategories.map((category) => {
              const Icon = icons[category.icon]
              return (
                <div key={category.id} className="p-6 border border-gray-200 rounded-lg hover:border-primary-500 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                  <ul className="space-y-2">
                    {category.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="py-16 bg-primary-50 animate-fadeIn">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Daily Health Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {healthTips.map((tip, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-semibold mb-3 text-primary-600">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Start Your Healthy Journey Today</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Remember, small changes in your diet can lead to significant improvements in your health.
            Start with one healthy meal at a time!
          </p>
          <a 
            href="https://www.healthline.com/nutrition/27-health-and-nutrition-tips" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-secondary-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
          >
            Learn More Tips
          </a>
        </div>
      </section>
    </div>
  )
}