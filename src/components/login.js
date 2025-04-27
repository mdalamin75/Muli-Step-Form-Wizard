import React, { useState, useContext } from 'react';
import users from '../data/users.json';
import { UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      loginUser(user);
      // onLoginSuccess(); // Notify parent to close modal
      navigate("/searchwizard")
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-dvh">
      <div className="flex flex-col justify-center items-center border border-slate-200 rounded-lg shadow-lg shadow-indigo-600 sm:w-full md:w-1/3 p-5">
        <h2 className="font-inter font-semibold text-xl py-3">Login Multi Step Form </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-slate-300 px-3 py-1 rounded-lg my-3 font-abel font-normal text-base"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-slate-300 px-3 py-1 rounded-lg my-3 font-abel font-normal text-base"
        />
        <button onClick={handleLogin} className="bg-primary px-6 py-1 mt-3 mb-5 font-abel font-normal text-lg text-white rounded-xl transition ease-in-out hover:bg-blue6">Login</button>
      </div>
    </div>
  );
};

export default Login;

