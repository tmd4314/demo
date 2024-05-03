import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    try {
      // 서버에 로그인 요청
      const response = await axios.post('/user/login', { username, password });
      // 로그인 성공 시 토큰 저장
      localStorage.setItem('authToken', response.data.token);
      // 여기서 로그인 성공 후 처리를 추가할 수 있음 (예: 페이지 전환)
      console.log('로그인 성공!');
    } catch (error) {
      // 로그인 실패 시 오류 메시지 설정
      if (error.response) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError('로그인 요청에 실패했습니다.');
      }
      console.log('로그인 실패:', loginError);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">사용자 이름:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </div>
  );
}

export default Login;
