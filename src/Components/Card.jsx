import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Search, Info } from 'lucide-react';

export default function NutritionServiceCard() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl  shadow-2xl border border-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Nutrition photo */}
        <div className="w-full lg:w-[45%] relative aspect-[4/3] bg-gray-50">
          <img
            src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Nutrition"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
            <span className="text-sm">Nutrition Matters</span>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full lg:w-[55%] p-8 lg:p-12 border-l border-gray-100">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm mb-6">
            Nutrition Insights
          </div>
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Guide to Better Nutrition
            </h2>
            <p className="text-gray-600 text-base">
              Explore tailored nutrition information to help you achieve your health goals and maintain a balanced lifestyle.
            </p>
          </div>
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Balanced Diet Plans</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Get personalized diet plans curated by experts to suit your individual needs and health objectives.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Nutrition Search</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Easily find nutrition information for various foods, ingredients, and recipes to fit your dietary needs.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Nutritional Facts</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Access detailed nutritional facts, including vitamins, minerals, and macronutrients, for various food items.
                </p>
              </div>
            </div>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 text-sm font-medium transition-colors duration-200"
            onClick={() => navigate('/nutri-info')}
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
