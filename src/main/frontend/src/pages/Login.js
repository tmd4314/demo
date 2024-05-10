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
      axios.post('/user/login', formData) // 올바른 URL 사용
        .then(response => {
          console.log(response);
          console.log('Login successful:', formData); // 로그인 성공 시
          // 예를 들어, 로그인 성공 후 메인 페이지로 이동
          //window.location.href = '/';
        })
        .catch(error => {
          console.error('Login failed:', error); // 로그인 실패 시 에러 메시지 표시
          setError('사용자 ID 또는 비밀번호를 확인해 주세요.'); // 여기에는 실제로 setError 함수가 정의되어 있어야 합니다.
        });
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
