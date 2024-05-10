import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    userid: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        const response = await axios.post('/user/login', formData);
        console.log(response.data);
       window.alert('로그인을 하였습니다.');
       window.location.href = '/';
        // 로그인 성공 시 처리
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
        <div className="mb-3">
          <label htmlFor="userid" className="form-label">사용자 ID</label>
          <input type="text" name="userid" id="userid" className="form-control" value={formData.userid} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">비밀번호</label>
          <input type="password" name="password" id="password" className="form-control" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">로그인</button>
      </form>
    </div>
  );
}

export default Login;
