import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../css/Login.css';

function Login() {
  const [formData, setFormData] = useState({
    userid: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/user/login', formData);
      console.log("서버 응답:", response.data);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); // 인증 상태 저장
      window.alert('로그인을 하였습니다.');
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error);
      setError('사용자 이름 또는 비밀번호를 확인하세요.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}


        {/* <div className="mb-3">
          <label htmlFor="userid" className="form-label">사용자 ID</label>
          <input type="text" name="userid" id="userid" className="form-control" value={formData.userid} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">비밀번호</label>
          <input type="password" name="password" id="password" className="form-control" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">로그인</button> */}


        <div className='login-box'>
          <h3>로그인</h3>
          <div>
            <div className="form-item">
              <Form.Control type="username" placeholder="아이디" name="userid" id="userid" className="form-control" value={formData.userid} onChange={handleChange} />
            </div>
            <div className="form-item">
              <Form.Control type="password" placeholder="비밀번호" name="password" id="password" className="form-control" value={formData.password} onChange={handleChange} />
            </div>
            <div className="button-container">
              <a href='/user/signup'>
                  <Button variant="secondary" id='joinBtn'>회원가입</Button>
              </a>
              <Button variant="primary" type="submit" id='loginBtn'>로그인</Button>
            </div>
          </div>
        </div>


      </form>
    </div>
  );
}

export default Login;
