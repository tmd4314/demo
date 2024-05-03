import React, { useState } from 'react';
import axios from 'axios';

function MyPageUpdate() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateUser = () => {
    axios.put('/api/user/update', userInfo)
      .then(response => {
        console.log('수정 성공!');
      })
      .catch(error => {
        console.error('수정에 실패하였습니다.', error);
      });
  };

  return (
    <div>
      <h2>회원 정보 수정</h2>
      <label>Username:</label>
      <input type="text" name="username" value={userInfo.username} onChange={handleInputChange} />
      <label>Email:</label>
      <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
      <label>Password:</label>
      <input type="password" name="password" value={userInfo.password} onChange={handleInputChange} />
      <label>Phone:</label>
      <input type="text" name="phone" value={userInfo.phone} onChange={handleInputChange} />
      <button onClick={handleUpdateUser}>저장</button>
    </div>
  );
}

export default MyPageUpdate;
