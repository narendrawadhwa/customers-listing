import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const response = await fetch('/assignment_auth.jsp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              login_id: username,
              password: password,
            }),
          });
          

      if (!response.ok) {
        const errorMessage = `Authentication failed with status ${response.status}`;
        const responseBody = await response.text();
        throw new Error(`${errorMessage}. Response body: ${responseBody}`);
      }

      const data = await response.json();
      setToken(data.token);
      navigate('/customer-list');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='login-page'>
      <h1>Login Screen</h1>
      <form>
        <label>
          Login Id:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
