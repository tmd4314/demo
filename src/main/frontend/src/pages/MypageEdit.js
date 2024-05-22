

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import '../css/user.css';

function MypageEdit() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    if (isAuthenticated) {
      const storedUserId = localStorage.getItem('userid');
      setUserId(storedUserId);
    }
  }, [isAuthenticated]);

  const handleUpdateUsername = (e) => {
    e.preventDefault();

    if (username.length < 3) {
      setMessage('닉네임은 3글자 이상이어야 합니다.');
      return;
    }
  
    if (username.length > 25) {
      setMessage('닉네임은 25글자 이하여야 합니다.');
      return;
    }

    axios.put('/user/update/username', { userid: userId, username: username })
      .then(response => {
        setMessage('닉네임 변경이 완료되었습니다.');
      })
      .catch(error => {
        console.error('Error updating username:', error);
        setMessage('닉네임 변경이 실패하였습니다.');
      });
  };

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    axios.put('/user/update/email', { userid: userId, email: email })
      .then(response => {
        setMessage('이메일 변경이 완료되었습니다.');
      })
      .catch(error => {
        console.error('Error updating email:', error);
        setMessage('이메일 변경이 실패하였습니다.');
      });
  };

  const handleUpdatePhoneNumber = (e) => {
    e.preventDefault();
    axios.put('/user/update/phoneNumber', { userid: userId, phoneNumber: phoneNumber })
      .then(response => {
        setMessage('전화번호 변경이 완료되었습니다.');
      })
      .catch(error => {
        console.error('Error updating phone number:', error);
        setMessage('전화번호 변경이 실패하였습니다.');
      });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setMessage('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    axios.put('/user/update/password', { userid: userId, password: password })
      .then(response => {
        setMessage('비밀번호 변경이 완료되었습니다.');
      })
      .catch(error => {
        console.error('Error updating password:', error);
        setMessage('비밀번호 변경이 실패하였습니다.');
      });
  };

  return ( 
    <div className='change-box'>
      <h2 className="my-4">회원 정보 수정</h2>
      <Form>
        <Form.Group>
          <div className='change-pw'>
            <div>
              <p>기본 정보</p>
            </div>
            <div className="form-container">
              <div className="form-item">
                <p>ID : {userId}</p>
              </div>
              <div className="change-item">
                <Form.Label>비밀번호</Form.Label>
                <div className="change-container">
                  <Form.Control type="password" id='input' placeholder="새 비밀번호 (8자 이상)" name="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} />
                  <Button variant="primary" type="submit" id='Btn' onClick={handleUpdatePassword}>수정</Button>
                </div>
              </div>
            </div>
          </div>

          <div className='change-me'>
            <div className="form-container">
              <div className="change-item">
                <Form.Label>닉네임</Form.Label>
                <div className="change-container">
                  <Form.Control type="text" id='input' placeholder=" 새 닉네임 (3자 이상, 25자 이하)" name="username" value={username} onChange={(e) => setUsername(e.target.value)} minLength={3} maxLength={25} />
                  <Button variant="primary" type="submit" id='Btn' onClick={handleUpdateUsername}>수정</Button>
                </div>
              </div>
            </div>
            <div className="form-container">
              <div className="change-item">
                <Form.Label>이메일</Form.Label>
                <div className="change-container">
                  <Form.Control type="email" id='input' placeholder="변경할 이메일 입력" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Button variant="primary" type="submit" id='Btn' onClick={handleUpdateEmail}>수정</Button>
                </div>
              </div>
            </div>
            <div className="form-container">
              <div className="change-item">
                <Form.Label>전화번호</Form.Label>
                <div className="change-container">
                  <Form.Control type="tel" id='input' placeholder="변경할 전화번호" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  <Button variant="primary" type="submit" id='Btn' onClick={handleUpdatePhoneNumber}>수정</Button>
                </div>
              </div>
            </div>
          </div>
        </Form.Group>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default MypageEdit;
