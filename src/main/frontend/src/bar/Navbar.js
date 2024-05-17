import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // React Router의 Link를 가져옵니다.
import axios from 'axios';

import '../css/App.css';

function NavbarComponent() {

  // Navbar의 toggle을 닫는 함수
  const closeNavbar = () => {
    const navbarToggle = document.querySelector('.navbar-toggler');
    if (navbarToggle) {
      navbarToggle.click(); // Navbar의 toggle 클릭
    }
  };

   const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
    const [username, setUsername] = useState('');


    useEffect(() => {
        if (isAuthenticated) {
          const storedUsername = localStorage.getItem('username');
          setUsername(storedUsername);
        }
      }, [isAuthenticated]);
    // 로그아웃 함수
    const handleLogout = () => {
      axios.get('/user/logout')
        .then(response => {
          // 로그아웃 성공 시 페이지 새로 고침
          console.log(response);
          // 로그아웃 성공 시 isAuthenticated 상태를 false로 설정 및 로컬 스토리지에서 제거
          setIsAuthenticated(false);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userid');
          localStorage.removeItem('username');
          window.location.reload();
        })
        .catch(error => {
          // 로그아웃 실패 시 처리할 코드
          console.error('Logout failed:', error);
        });
    };

  return (
    <div className='header'>
      <Navbar expand="lg" className="bg-body-tertiary border-bottom">
        <Container fluid>
          <Navbar.Brand href="/">봉우리 원정대</Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
              {isAuthenticated  ? (
                  <>
                    <Link to="/user/weather" className="nav-link" onClick={closeNavbar}>날씨</Link>
                    <Link to="/user/rank" className="nav-link" onClick={closeNavbar}>랭킹</Link>
                    <Link to="/user/missions" className="nav-link" onClick={closeNavbar}>미션</Link>
                    <NavDropdown title={username} id="basic-nav-dropdown">
                        <Link to="/mypage" className="dropdown-item" onClick={closeNavbar}>회원 수정</Link>
                        <Link to="/mypagedelete" className="dropdown-item" onClick={closeNavbar}>회원 탈퇴</Link>
                        <NavDropdown.Divider/>
                        <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
                    </NavDropdown>
                  </>
              ) : (
                  <>
                    <Link to="/user/weather" className="nav-link" onClick={closeNavbar}>날씨</Link>
                    <Link to="/user/rank" className="nav-link" onClick={closeNavbar}>랭킹</Link>
                    <Link to="/user/logins" className="nav-link" onClick={closeNavbar}>로그인</Link>
                  <Link to="/user/signups" className="nav-link" onClick={closeNavbar}>회원가입</Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
