import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import FrontLayout from './Components/FrontLayout';
import Services from './Components/Services';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import AboutUs from './Components/AboutUs';
import HealthNewsCards from './Components/HealthNews';
import NearByPharmacy from './Components/NearByPharmacy'; 
import AirQualityMap from './Components/Allergy';
import {BMICalculator} from './Components/Bmi';
import DrugSearch from './Components/DrugSearch';
import Workout from './Components/ExerciseList';
import FoodSearch from './Components/FoodSearch';
import HospitalFinder from './Components/HospitalNear';
import PeriodPredictor from './Components/PeriodPredictor';
import { Signin } from './Components/Signin';
import { UserInfo } from './Components/UserInfo';
import { Signout } from './Components/Signout';
import HealthTipsCards from './Components/Tips';
import Chatbot from './Components/CureMate';
import DonateUs from './Components/DonateUs';
import UploadFile from './Components/UploadFile';
import AppointmentCards from './Components/Appointments';

import ContactUs from './Components/ContactUs';
import SchedulerButtonone from './Components/Doctor01';
import SchedulerButtontwo from './Components/Doctor02';
import SchedulerButtonthree from './Components/Doctor03';
import SchedulerButtonfour from './Components/Doctor04';
import SchedulerButtonfive from './Components/Doctor05';
import NutritionInfo from './Components/NutritionInfo';


function App() {
  return (
    <Router>
      <div className="App font-montserrat">
        <Routes>
          <Route path="/" element={<FrontLayout />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/news" element={<HealthNewsCards />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/nearby-pharmacy" element={<NearByPharmacy />} /> 
          <Route path="/breathsafe" element={<AirQualityMap/>}/>
          <Route path="/Doctor1" element={<SchedulerButtonone/>}/>
          <Route path="/Doctor2" element={<SchedulerButtontwo/>}/>
          <Route path="/Doctor3" element={<SchedulerButtonthree/>}/>
          <Route path="/Doctor4" element={<SchedulerButtonfour/>}/>
          <Route path="/Doctor5" element={<SchedulerButtonfive/>}/>
          <Route path="/drug-info" element={<DrugSearch/>}/>
          <Route path="/workout" element={<Workout/>}/>
          <Route path="/nutrition" element={<FoodSearch/>}/>
          <Route path="/nearby-hospital" element={<HospitalFinder/>}/>
          <Route path="/period-predictor" element={<PeriodPredictor/>}/>
          <Route path="/login" element={<Signin/>}/>
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/signup" element={<Signout/>}/>
          <Route path="/health-tips" element={<HealthTipsCards/>}/>
          <Route path="/bmi-calculator" element={<BMICalculator/>}/>
          <Route path="/donate-us" element={<DonateUs/>}/>
          <Route path ="/upload-file" element={<UploadFile/>}/>
          <Route path="/appointment" element={<AppointmentCards/>}/>
          <Route path="/nutri-info" element={<NutritionInfo/>}/>
        </Routes>
        <Chatbot/>
    
      </div>
    </Router>
  );
}

export default App;