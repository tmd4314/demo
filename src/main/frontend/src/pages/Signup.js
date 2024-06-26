import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';

import '../css/user.css';

function Signup() {
  const [csrfToken, setCsrfToken] = useState('');
  const [userCreateForm, setUserCreateForm] = useState({
    userid: '',
    password: '',
    passwordConfirmation: '',
    username:'',
    phoneNumber: '',
    email: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  // const navigate = useNavigate();

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

    // 아이디, 이메일, 전화번호의 중복 여부 확인
    try {
      // 여기에 중복 확인 로직 추가
    } catch (error) {
      console.error('Error checking duplicates:', error);
    }

    // 비밀번호의 길이 확인
    if (userCreateForm.password.length < 8) {
      setErrorMessage('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    // 비밀번호와 비밀번호 확인 필드 값이 일치하는지 확인
    if (userCreateForm.password !== userCreateForm.passwordConfirmation) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 회원가입 데이터를 서버에 전송
      const response = await axios.post('/user/signup', userCreateForm, {
        headers: {
          'X-XSRF-Token': csrfToken,
          'Content-Type': 'application/json'
        }
      });
      window.alert('회원가입을 축하드립니다.');
      window.location.href = '/user/logins';
    } catch (error) {
      console.error('Signup failed:', error);
      if (error.response && error.response.data) {
        // 서버로부터 받은 에러 메시지를 state에 설정
        setErrorMessage(error.response.data);
      }
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
    <Layout>
      <div className='signup-box'>
        <h2 className="my-4">회원가입</h2>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="_csrf" value={csrfToken} />
          <Form.Group>
            <div className='input-id'>
              <div>
                <p>기본 정보</p>
              </div>
              <div className="form-container">
                <div className="form-item">
                  <Form.Label>ID</Form.Label>
                  <Form.Control type="text" placeholder="ID (3자 이상, 25자 이하)" name="userid" value={userCreateForm.userid} onChange={handleInputChange} minLength={3} maxLength={25} required />
                </div>

                <div className="form-item">
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control type="password" placeholder="비밀번호 (8자 이상)" name="password" value={userCreateForm.password} onChange={handleInputChange} minLength={8} required />
                </div>

                <div className="form-item">
                  <Form.Label>비밀번호 확인</Form.Label>
                  <Form.Control type="password" placeholder="비밀번호 확인" name="passwordConfirmation" value={userCreateForm.passwordConfirmation} onChange={handleInputChange} required />
                </div>
              </div>
            </div>

            <div className='input-me'>
              <div className="form-container">
                <div className="form-item">
                  <Form.Label>닉네임</Form.Label>
                  <Form.Control type="text" placeholder="닉네임 (3자 이상, 25자 이하)" name="username" value={userCreateForm.username} onChange={handleInputChange} minLength={3} maxLength={25} required />
                </div>
              </div>
              <div className="form-container">
                <div className="form-item">
                  <Form.Label>이메일</Form.Label>
                  <Form.Control type="email" placeholder="이메일" name="email" value={userCreateForm.email} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-container">
                <div className="form-item">
                  <Form.Label>전화번호</Form.Label>
                  <Form.Control type="tel" placeholder="전화번호" name="phoneNumber" value={userCreateForm.phoneNumber} onChange={handleInputChange} required />
                </div>
              </div>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">회원가입</Button>
        </Form>  
      </div>
    
    </Layout>
  );
}

export default Signup;