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
import { Bmi } from './Components/Bmi';
import DiseasePredictor from './Components/DiseasePredictor';
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


function App() {
  return (
    <Router>
      <div className="App font-montserrat">
        <Routes>
          <Route path="/" element={<FrontLayout />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/news" element={<HealthNewsCards />} />
          <Route path="/nearby-pharmacy" element={<NearByPharmacy />} /> 
          <Route path="/breathsafe" element={<AirQualityMap/>}/>
          <Route path="/disease-predictor" element={<DiseasePredictor/>}/>
          <Route path="/drug-info" element={<DrugSearch/>}/>
          <Route path="/workout" element={<Workout/>}/>
          <Route path="/nutrition" element={<FoodSearch/>}/>
          <Route path="/nearby-hospital" element={<HospitalFinder/>}/>
          <Route path="/period-predictor" element={<PeriodPredictor/>}/>
          <Route path="/login" element={<Signin/>}/>
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/signup" element={<Signout/>}/>
          <Route path="/health-tips" element={<HealthTipsCards/>}/>
        </Routes>
        <Chatbot/>
      </div>
    </Router>
  );
}

export default App;