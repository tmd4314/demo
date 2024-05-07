import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Signup() {
  const [csrfToken, setCsrfToken] = useState('');
  const [userCreateForm, setUserCreateForm] = useState({
    username: '',
    password1: '',
    password2: '',
    phoneNumber: '',
    email: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // 서버로부터 CSRF 토큰을 받아옵니다.
    axios.get('/api/csrf')
      .then(response => {
        setCsrfToken(response.data.token || ''); // CSRF 토큰 저장
      })
      .catch(error => {
        console.error('Error fetching CSRF token:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 비밀번호와 비밀번호 확인 필드 값이 일치하는지 확인
    if (userCreateForm.password1 !== userCreateForm.password2) {
      setErrorMessage('Passwords do not match');
      return; // 일치하지 않으면 회원가입 요청을 보내지 않고 종료
    }

    try {
      // 회원가입 데이터를 서버에 전송
      await axios.post('/user/signup', userCreateForm, {
        headers: {
          'X-XSRF-Token': csrfToken,
          'Content-Type': 'application/json'
        }
      });
      console.log('Signup successful:', userCreateForm);
    } catch (error) {
      console.error('Signup failed:', userCreateForm);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserCreateForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="_csrf" value={csrfToken} />
        <input type="text" name="username" placeholder="ID" value={userCreateForm.username} onChange={handleInputChange} />
        <input type="password" name="password1" placeholder="password" value={userCreateForm.password1} onChange={handleInputChange} />
        <input type="password" name="password2" placeholder="password" value={userCreateForm.password2} onChange={handleInputChange} />
        <input type="text" name="phoneNumber" placeholder="phoneNumber" value={userCreateForm.phoneNumber} onChange={handleInputChange} />
        <input type="text" name="email" placeholder="email" value={userCreateForm.email} onChange={handleInputChange} />
        <button type="submit">Signup</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Signup;
