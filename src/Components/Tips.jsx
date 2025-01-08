import React, { useState, useEffect } from 'react';

const HealthTipsCards = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');

  const allTips = [
    [
      {
        id: 1,
        category: 'Nutrition',
        title: 'Balanced Diet',
        description: 'Eat a rainbow of fruits and vegetables daily. Aim for at least 5 servings to get essential vitamins and minerals.',
      },
      {
        id: 2,
        category: 'Exercise',
        title: 'Daily Movement',
        description: 'Aim for 30 minutes of moderate exercise daily. Even a brisk walk can make a significant difference.',
      },
      {
        id: 3,
        category: 'Mental Health',
        title: 'Stress Management',
        description: 'Practice mindfulness or meditation for 10 minutes daily to reduce stress levels.',
      },
      {
        id: 4,
        category: 'Heart Health',
        title: 'Cardiovascular Care',
        description: 'Maintain good heart health through regular cardio exercises and a healthy diet.',
      },
    ],
  ];

  useEffect(() => {
    const getTodaysTips = () => {
      const today = new Date();
      const startDate = new Date('2024-01-01');

      const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      const weekIndex = Math.floor(daysSinceStart / 7) % allTips.length;

      const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      setCurrentDate(formattedDate);
      setTips(allTips[weekIndex]);
      setLoading(false);
    };

    getTodaysTips();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Daily Health Tips</h1>
        <p className="text-blue-600 mt-2">{currentDate}</p>
      </div>
      <div className="space-y-6">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-blue-50 border border-blue-100 rounded-lg shadow-md p-6 max-w-6xl mx-auto transition-all hover:shadow-lg"
          >
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-blue-600">{tip.category}</span>
              <h2 className="text-xl font-bold text-blue-900">{tip.title}</h2>
              <p className="text-blue-800">{tip.description}</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 font-medium mt-4">
              Learn more
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


export default HealthTipsCards;


