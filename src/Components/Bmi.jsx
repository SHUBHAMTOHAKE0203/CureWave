import React from 'react'
import useBMIStore from './utils/bmistore'
import { toast } from 'sonner'
import { LucideScale, LucideRuler, LucideCalendarDays, LucideUserCircle2, LucideSunrise, LucideSun, LucideMoon, LucideChefHat, LucideActivity, LucideHeartPulse, LucideStethoscope } from 'lucide-react'
import Navigation from './Navigation'
export function BMICalculator() {
  const { 
    weight, height, age, gender,
    setWeight, setHeight, setAge, setGender,
    calculateBMI, bmi, getBMICategory
  } = useBMIStore()

  // Rest of the functions remain the same
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!weight || !height || !age) {
      toast.error('Please fill in all fields')
      return
    }
    calculateBMI()
  }

  const getDietPlan = () => {
    // ... existing getDietPlan function
    const category = getBMICategory()
    switch (category) {
      case 'Underweight':
        return {
          breakfast: 'High-protein oatmeal with nuts, banana, and whole milk',
          lunch: 'Grilled chicken sandwich with avocado, cheese, and a fruit smoothie',
          dinner: 'Salmon with quinoa, roasted vegetables, and olive oil dressing'
        }
      case 'Normal weight':
        return {
          breakfast: 'Greek yogurt with berries, honey, and granola',
          lunch: 'Mixed green salad with grilled chicken and balsamic dressing',
          dinner: 'Lean beef stir-fry with brown rice and vegetables'
        }
      case 'Overweight':
        return {
          breakfast: 'Egg white omelet with spinach and whole grain toast',
          lunch: 'Tuna salad with light mayo on lettuce leaves',
          dinner: 'Grilled fish with steamed vegetables and quinoa'
        }
      case 'Obese':
        return {
          breakfast: 'Steel-cut oats with cinnamon and apple slices',
          lunch: 'Large mixed green salad with grilled chicken breast',
          dinner: 'Baked cod with roasted vegetables'
        }
      default:
        return {
          breakfast: '',
          lunch: '',
          dinner: ''
        }
    }
  }

  const getBMICategoryColor = () => {
    // ... existing getBMICategoryColor function
    const category = getBMICategory()
    switch (category) {
      case 'Underweight':
        return 'text-yellow-600'
      case 'Normal weight':
        return 'text-green-600'
      case 'Overweight':
        return 'text-orange-600'
      case 'Obese':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getBMIScale = () => {
    // ... existing getBMIScale function
    if (!bmi) return null
    const categories = [
      { range: '< 18.5', label: 'Underweight', color: 'bg-yellow-400' },
      { range: '18.5-24.9', label: 'Normal', color: 'bg-green-400' },
      { range: '25-29.9', label: 'Overweight', color: 'bg-orange-400' },
      { range: '> 30', label: 'Obese', color: 'bg-red-400' }
    ]
    return categories.map((category, index) => (
      <div key={index} className="flex-1">
        <div className={`h-3 ${category.color} ${index === 0 ? 'rounded-l-full' : ''} ${index === categories.length - 1 ? 'rounded-r-full' : ''}`} />
        <div className="mt-1">
          <p className="text-xs font-semibold text-gray-700">{category.range}</p>
          <p className="text-xs text-gray-500">{category.label}</p>
        </div>
      </div>
    ))
  }

  return (
    <div>
    <Navigation/>
    <div className="w-full max-w-6xl min-h-screen pt-24 pb-5 mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl relative">
      <div className="px-12 py-12 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)] opacity-50" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <LucideStethoscope className="w-10 h-10 text-white absolute -left-1 -top-1 opacity-30" />
              <LucideHeartPulse className="w-10 h-10 text-white animate-pulse relative z-10" />
            </div>
            <h2 className="text-3xl font-semibold">BMI Calculator</h2>
          </div>
          <p className="text-center text-blue-50 font-light text-lg">Calculate your Body Mass Index for better health insights</p>
        </div>
      </div>
      
      <form onSubmit={handleCalculate} className="p-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3 group">
            <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
              <LucideScale className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
              Weight (kg)
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LucideScale className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors" />
                </div>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200/50 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none hover:border-blue-300 bg-white/50 shadow-sm"
                  placeholder="Enter weight"
                  min="0"
                  step="0.1"
                />
            </div>
          </div>
          
          <div className="space-y-3 group">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <LucideRuler className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
              Height (cm)
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LucideRuler className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors" />
                </div>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200/50 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none hover:border-blue-300 bg-white/50 shadow-sm"
                  placeholder="Enter height"
                  min="0"
                  step="0.1"
                />
            </div>
          </div>

          <div className="space-y-3 group">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <LucideCalendarDays className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
              Age
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LucideCalendarDays className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors" />
                </div>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200/50 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none hover:border-blue-300 bg-white/50 shadow-sm"
                  placeholder="Enter age"
                  min="0"
                />
            </div>
          </div>

          <div className="space-y-3 group">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <LucideUserCircle2 className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
              Gender
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LucideUserCircle2 className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors" />
                </div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200/50 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none appearance-none bg-white/50 shadow-sm hover:border-blue-300"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white py-4 rounded-lg hover:bg-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-xl active:scale-[0.99] transform group relative overflow-hidden hover:from-blue-600 hover:via-blue-500 hover:to-blue-600"
        >
          <span className="flex items-center justify-center gap-2">
            <LucideActivity className="w-6 h-6 group-hover:animate-pulse" />
            Calculate BMI
          </span>
        </button>


        {bmi !== null && (
          <div className="mt-6 p-6 bg-gradient-to-b from-blue-50 to-white rounded-lg border border-blue-100 transition-all duration-300 shadow-md hover:shadow-lg">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center justify-center gap-2">
                <LucideActivity className="w-5 h-5 text-blue-400" />
                Your BMI Result
              </h3>
              <div className="mt-6 space-y-4">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent tracking-tight animate-pulse">{bmi}</span>
                <p className={`text-lg font-medium ${getBMICategoryColor()}`}>{getBMICategory()}</p>
                
                <div className="mt-6 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50">
                  <p className="text-sm text-gray-600 mb-4">BMI Categories:</p>
                  <div className="flex gap-1">
                    {getBMIScale()}
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
                  BMI is a measure of body fat based on height and weight. It's a screening tool, not a diagnostic of body fatness or health.
                </p>
              </div>
            </div>

            <div className="mt-8 text-left">
              <div className="flex items-center gap-2 mb-4">
                <LucideChefHat className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-semibold text-gray-900">Recommended Meal Plan</h4>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-blue-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <LucideSunrise className="w-4 h-4 text-blue-400" />
                    <h5 className="font-medium text-gray-900">Breakfast</h5>
                  </div>
                  <p className="text-gray-600 ml-6">{getDietPlan().breakfast}</p>
                </div>

                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-blue-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <LucideSun className="w-4 h-4 text-blue-400" />
                    <h5 className="font-medium text-gray-900">Lunch</h5>
                  </div>
                  <p className="text-gray-600 ml-6">{getDietPlan().lunch}</p>
                </div>

                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-blue-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <LucideMoon className="w-4 h-4 text-blue-400" />
                    <h5 className="font-medium text-gray-900">Dinner</h5>
                  </div>
                  <p className="text-gray-600 ml-6">{getDietPlan().dinner}</p>
                </div>

                <p className="text-xs text-gray-500 italic mt-4">
                  Note: This is a general meal plan suggestion. Please consult with a registered dietitian or nutritionist for a personalized diet plan that meets your specific needs.
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
    </div>
  )
}
