import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const credentials = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', credentials);

      const { name, email } = response.data.user;

      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);

      alert(`Welcome back, ${name}!`);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="contact login">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
