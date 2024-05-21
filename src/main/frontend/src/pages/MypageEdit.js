import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MypageEdit() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const storedUserId = localStorage.getItem('userid');
      setUserId(storedUserId);
    }
  }, [isAuthenticated]);

  const handleUpdateUsername = () => {
    axios.put('/user/update/username', { userid: userId, username: username })
      .then(response => {
        setMessage('Username updated successfully.');
      })
      .catch(error => {
        console.error('Error updating username:', error);
        setMessage('Failed to update username.');
      });
  };

  const handleUpdateEmail = () => {
    axios.put('/user/update/email', { userid: userId, email: email })
      .then(response => {
        setMessage('Email updated successfully.');
      })
      .catch(error => {
        console.error('Error updating email:', error);
        setMessage('Failed to update email.');
      });
  };

  const handleUpdatePhoneNumber = () => {
    axios.put('/user/update/phoneNumber', { userid: userId, phoneNumber: phoneNumber })
      .then(response => {
        setMessage('Phone number updated successfully.');
      })
      .catch(error => {
        console.error('Error updating phone number:', error);
        setMessage('Failed to update phone number.');
      });
  };

  const handleUpdatePassword = () => {
    axios.put('/user/update/password', { userid: userId, password: password })
      .then(response => {
        setMessage('Password updated successfully.');
      })
      .catch(error => {
        console.error('Error updating password:', error);
        setMessage('Failed to update password.');
      });
  };

  return (
    <div>
      <h2>회원 정보 수정</h2>
      <p>사용자 ID: {userId}</p>
      <label>
        사용자 이름:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <button onClick={handleUpdateUsername}>사용자 이름 수정</button>
      <br />
      <label>
        이메일:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button onClick={handleUpdateEmail}>이메일 수정</button>
      <br />
      <label>
        전화번호:
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <button onClick={handleUpdatePhoneNumber}>전화번호 수정</button>
      <br />
      <label>
        비밀번호:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleUpdatePassword}>비밀번호 수정</button>
      <br />
      {message && <p>{message}</p>}
    </div>
  );
}

export default MypageEdit;
