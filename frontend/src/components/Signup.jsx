import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const form = e.target;
    const userData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', userData);

      alert('Signup successful! Please log in.');
      navigate('/login'); 
    } catch (error) {
      console.error(error);
      alert('Signup failed. Try a different email or check your input.');
    }
  };

  return (
    <div className="contact login">
      <h2>Create a New Account</h2>
      <form onSubmit={handleSignup}>
        <input type="text" name="name" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
