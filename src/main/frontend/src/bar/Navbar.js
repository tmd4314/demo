import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmationModal from '../ConfirmationModal';

import '../css/App.css';

function NavbarComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userid'));
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const closeNavbar = () => {
    const navbarToggle = document.querySelector('.navbar-toggler');
    if (navbarToggle) {
      navbarToggle.click();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);
      const storedUserId = localStorage.getItem('userid');
      setUserId(storedUserId);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    axios.get('/user/logout')
      .then(response => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };

  const handleDeleteClick = () => {
    setShowModal(true); // 모달을 열기 위해 상태 변경
  };

  const handleCloseModal = () => {
    setShowModal(false); // 모달을 닫기 위해 상태 변경
  };

  const handleConfirmDelete = () => {
    axios.post('/user/delete', { userid: userId })
      .then(response => {
        setMessage(response.data);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        window.location.href = '/';
      })
      .catch(error => {
        setMessage('회원 탈퇴에 실패했습니다.');
        console.error('Error deleting user:', error);
      });
    handleCloseModal(); // 모달을 닫기 위해 handleCloseModal 함수 호출
  };

  return (
    <div className='header'>
      <Navbar expand="lg" className="bg-body-tertiary border-bottom">
        <Container fluid>
          <Navbar.Brand href="/">봉우리 원정대</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              {isAuthenticated ? (
                <>
                  <Link to="/user/weather" className="nav-link" onClick={closeNavbar}>날씨</Link>
                  <Link to="/user/cctv1" className="nav-link" onClick={closeNavbar}>CCTV</Link>
                  <Link to="/user/rank" className="nav-link" onClick={closeNavbar}>랭킹</Link>
                  <Link to="/user/missions" className="nav-link" onClick={closeNavbar}>미션</Link>
                  <NavDropdown title={username} id="basic-nav-dropdown">
                    <Link to="/mypage" className="dropdown-item" onClick={closeNavbar}>회원 수정</Link>
                    <NavDropdown.Item onClick={handleDeleteClick}>회원 탈퇴</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
                  </NavDropdown>
                </>
              ) : (
                  <>
                    <Link to="/user/weather" className="nav-link" onClick={closeNavbar}>날씨</Link>
                    <Link to="/user/cctv1" className="nav-link" onClick={closeNavbar}>CCTV</Link>
                    <Link to="/user/rank" className="nav-link" onClick={closeNavbar}>랭킹</Link>
                    <Link to="/user/logins" className="nav-link" onClick={closeNavbar}>로그인</Link>
                  <Link to="/user/signups" className="nav-link" onClick={closeNavbar}>회원가입</Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* 회원 탈퇴 확인 모달 */}
          <ConfirmationModal
            show={showModal}
            handleClose={handleCloseModal}
            handleConfirm={handleConfirmDelete}
          />

          {/* 회원 탈퇴 결과 메시지 */}
          {message && <p>{message}</p>}
        </div>
      );
    }

export default NavbarComponent;
