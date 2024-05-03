// Signup.js
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    phoneNumber: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/signup', user);
      console.log('Signup successful');
    } catch (err) {
          console.log('Register err : ', err.response);
          const statusCode = err.response.status; // 400
          const statusText = err.response.statusText; // Bad Request
          const message = err.response.data.message[0]; // id should not be empty
          console.log(`${statusCode} - ${statusText} - ${message}`);
      // console.error('Signup failed:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={user.phoneNumber} onChange={handleChange} />
        <input type="text" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
