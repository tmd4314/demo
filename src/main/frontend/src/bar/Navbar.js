import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // React Router의 Link를 가져옵니다.
import axios from 'axios';

function NavbarComponent() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true' // 저장된 인증 상태 가져오기
      );

      // 로그아웃 함수
      const handleLogout = () => {
        axios.get('/user/logout')
          .then(response => {
            // 로그아웃 성공 시 페이지 새로 고침
            console.log(response);
            // 로그아웃 성공 시 isAuthenticated 상태를 false로 설정 및 로컬 스토리지에서 제거
            setIsAuthenticated(false);
            localStorage.removeItem('isAuthenticated');
            window.location.reload();
          })
          .catch(error => {
            // 로그아웃 실패 시 처리할 코드
            console.error('Logout failed:', error);
          });
      };

  return (

    <Navbar expand="lg" className="bg-body-tertiary border-bottom">
      <Container fluid>
        <Navbar.Brand href="/">산악인</Navbar.Brand>
        <Nav className="me-auto">
          <Form>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">검색</Button>
              </Col>
            </Row>
          </Form>
        </Nav>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {isAuthenticated  ? (
              <>
                <NavDropdown title="마이페이지" id="basic-nav-dropdown">
                  <Link to="/mypage" className="dropdown-item">회원 수정</Link>
                  <Link to="/mypagedelete" className="dropdown-item">회원 탈퇴</Link>
                  <NavDropdown.Divider />
                  <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
                </NavDropdown>
              </>
            ) : (
              <>
                <Link to="/user/login" className="nav-link">로그인</Link>
                <Link to="/user/signup" className="nav-link">회원가입</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
