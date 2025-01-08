'use client'

import React from 'react'
import { Utensils, Search, FileText } from 'lucide-react'

export default function RecipeServiceCard() {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Empty space for video */}
        <div className="w-full lg:w-[45%] relative aspect-[4/3] bg-gray-50">
          <div className="absolute bottom-6 left-6 flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
            <span className="text-sm">Play Video</span>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full lg:w-[55%] p-8 lg:p-12 border-l border-gray-100">
          {/* Badge */}
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm mb-6">
            Our Specialist
          </div>

          {/* Title and Description */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Recipe Types for Your Well-being
            </h2>
            <p className="text-gray-600 text-base">
              We provide an extensive array of recipe types designed to cater to your unique nutritional needs and preferences.
            </p>
          </div>

          {/* Service Items */}
          <div className="space-y-6 mb-8">
            {/* Service 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Utensils className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Recipe Categories</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Our comprehensive recipe collection includes breakfast, lunch, dinner, and desserts, with detailed nutritional information for each serving size.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Recipe Search</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Find the perfect recipe with our advanced search feature. Filter by ingredients, cooking time, and nutritional values to match your preferences.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Nutrition Details</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Access detailed nutrition information for each recipe, including calories, protein, and fat content per serving to help maintain your healthy lifestyle.
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 text-sm font-medium transition-colors duration-200">
            More Service
          </button>
        </div>
      </div>
    </div>
  )
}



