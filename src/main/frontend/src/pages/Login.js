import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [successMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    //console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/user/login', formData);
      const { userid, username } = response.data;
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); // 인증 상태 저장
      localStorage.setItem('userid', userid);
      localStorage.setItem('username', username);
      window.alert('로그인을 하였습니다.');
      window.location.href = '/';
     //console.log(response);
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.data) {
        setError(error.response.data);
      }
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
              <Button variant="primary" type="submit" id='loginBtn'>로그인</Button>
              <Button as={Link} to="/user/signups" variant="secondary" id="signupBtn">회원가입</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
