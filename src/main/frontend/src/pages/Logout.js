import React from 'react';
import axios from 'axios';

function Logout() {
  const handleLogout = () => {
    axios.post('/user/logout')
      .then(response => {
        // 로그아웃 성공 시 처리할 코드
//        window.alert('로그아웃 하였습니다.');
//        window.location.href = '/';
        console.log(response);
      })
      .catch(error => {
        // 로그아웃 실패 시 처리할 코드
        console.error('Logout failed:', error);
      });
  };

  return (
    <button onClick={handleLogout}>로그아웃</button>
  );
}

export default Logout;
