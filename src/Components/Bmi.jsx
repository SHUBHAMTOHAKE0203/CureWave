import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation

export const Bmi = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [dietPlan, setDietPlan] = useState('');

  const calculateBmi = () => {
    if (weight && height && gender) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      categorizeBmi(bmiValue);
    }
  };

  const categorizeBmi = (bmiValue) => {
    let category = '';
    let plan = '';
    
    if (gender === 'Male') {
      if (bmiValue < 18.5) {
        category = 'Underweight';
        plan = generateDietPlan('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        category = 'Normal weight';
        plan = generateDietPlan('Normal');
      } else if (bmiValue >= 25 && bmiValue < 30) {
        category = 'Overweight';
        plan = generateDietPlan('Overweight');
      } else {
        category = 'Obese';
        plan = generateDietPlan('Obese');
      }
    } else if (gender === 'Female') {
      if (bmiValue < 18.5) {
        category = 'Underweight';
        plan = generateDietPlan('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 24) {
        category = 'Normal weight';
        plan = generateDietPlan('Normal');
      } else if (bmiValue >= 24 && bmiValue < 30) {
        category = 'Overweight';
        plan = generateDietPlan('Overweight');
      } else {
        category = 'Obese';
        plan = generateDietPlan('Obese');
      }
    }

    setBmiCategory(category);
    setDietPlan(plan);
  };

  // Function to generate diet plan based on BMI category
  const generateDietPlan = (category) => {
    let plan = '';
    if (category === 'Underweight') {
      plan = `
        Breakfast: chai  Whole grain toast with avocado, eggs, and a smoothie.
        Lunch: chai Brown rice, grilled chicken, and steamed vegetables.
        Dinner: chai Lentil soup, whole wheat chapati, and salad.
        Snacks:chai Almonds, bananas, and peanut butter.
      `;
    } else if (category === 'Normal') {
      plan = `
        Breakfast: Oatmeal with fruit and nuts, and a cup of green tea.
        Lunch: Whole wheat chapati with dal, sabzi, and yogurt.
        Dinner: Grilled fish or chicken with steamed vegetables.
        Snacks: Fresh fruit and mixed nuts.
      `;
    } else if (category === 'Overweight') {
      plan = `
        Breakfast: Scrambled egg whites with spinach and whole grain toast.
        Lunch: Quinoa salad with chickpeas and a side of yogurt.
        Dinner: Grilled tofu or paneer with a vegetable stir-fry.
        Snacks: A handful of nuts and green tea.
      `;
    } else if (category === 'Obese') {
      plan = `
        Breakfast: Greek yogurt with berries and chia seeds.
        Lunch: Salad with lean protein (chicken or tofu), lots of greens, and olive oil.
        Dinner: Lentil soup, vegetable stir-fry, and quinoa.
        Snacks: Carrot sticks, hummus, and green tea.
      `;
    }
    return plan;
  };

  // Function to download the diet plan as a PDF
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Your Customized Diet Plan', 10, 10);
    doc.setFontSize(12);
    doc.text(`BMI: ${bmi}`, 10, 20);
    doc.text(`Category: ${bmiCategory}`, 10, 30);
    doc.text(`Diet Plan:`, 10, 40);
    doc.text(dietPlan, 10, 50);
    doc.save('diet_plan.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-200 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-8 shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wider">BMI & Custom Diet Plan</h1>
        <p className="text-lg mt-2">Get a personalized diet plan based on your BMI</p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 space-y-10">
        {/* BMI Calculator Section */}
        <section className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition duration-500 ease-in-out">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">BMI Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter Your Weight (kg)"
              className="p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter Your Height (cm)"
              className="p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter Your Age"
              className="p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">--Select Gender--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="flex justify-center items-center mt-4">
  <button
    onClick={calculateBmi}
    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-full py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300"
  >
    Calculate BMI
  </button>
</div>


          </div>

          {bmi && (
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold">Your BMI: {bmi}</h3>
              <h4 className={`text-lg mt-2 ${bmiCategory === 'Obese' ? 'text-red-500' : 'text-green-600'}`}>
                Category: {bmiCategory}
              </h4>
              <div className="mt-4">
                <h5 className="text-md font-semibold text-indigo-600">Your Custom Diet Plan:</h5>
                <pre className="text-sm bg-gray-100 p-4 rounded-md">{dietPlan}</pre>
              </div>
              <button
                onClick={downloadPdf}
                className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md flex items-center space-x-2 hover:bg-green-600"
              >
                <FaDownload /> <span>Download Diet Plan</span>
              </button>
            </div>
          )}
        </section>
      </main>

     
    </div>
  );
};
