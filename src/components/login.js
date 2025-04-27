import React, { useState, useContext } from 'react';
import users from '../data/users.json';
import { UserContext } from '../contexts/userContext';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(UserContext);

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      loginUser(user);
      onLoginSuccess(); // Notify parent to close modal
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

