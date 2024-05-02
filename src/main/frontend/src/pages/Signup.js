// SignUpForm.js

import React, { useState } from 'react';

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      // Handle response as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
