import React from "react";

const SchedulerButtontwo = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Book Your Appointment</h1>
        <a
          href="https://app.acuityscheduling.com/schedule.php?owner=34436443"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition"
        >
          Schedule Now
        </a>
      </div>
    </div>
  );
};

export default SchedulerButtontwo;