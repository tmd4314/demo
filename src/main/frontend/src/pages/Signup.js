import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Signup() {

  const [csrfToken, setCsrfToken] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phoneNumber: '',
    email: ''
  });

  useEffect(() => {
    // 서버로부터 CSRF 토큰을 받아옵니다.
    axios.get('/api/csrf')
      .then(response => {
        setCsrfToken(response.data.token); // CSRF 토큰 저장
      })
      .catch(error => {
        console.error('Error fetching CSRF token:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Axios 요청 시 헤더에 CSRF 토큰을 포함시킵니다.
    axios.post('/user/signup', formData, {
      headers: {
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      // 회원가입 성공 시 처리
      console.log('Signup successful:', response.data);
    })
    .catch(error => {
      // 에러 처리
      console.error('Signup failed:', error);
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData);
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="_csrf" value={csrfToken} />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <input type="text" name="phoneNumber" placeholder="PhoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
        <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;