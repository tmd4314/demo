import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const history =  useNavigate();

  const handleLogout = () => {
    axios.post('/api/user/logout')
      .then(response => {
        console.log('Logout successful');
        // 로그아웃 후 홈 페이지로 이동
        history.push('/');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <NavDropdown.Item onClick={handleLogout}>로그아웃</NavDropdown.Item>
  );
};

export default Logout;
