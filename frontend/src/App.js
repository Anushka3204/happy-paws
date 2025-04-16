import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import AllPets from './pages/AllPets';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import PetAdoptionForm from './components/PetAdoptionForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<AllPets />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/list-your-pet" element={<PetAdoptionForm />}/>

        </Routes>
      </div>
    </Router>
  );
};

export default App;
