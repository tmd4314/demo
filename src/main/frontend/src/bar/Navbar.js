// Navbar.js
import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // React Router의 Link를 가져옵니다.

function NavbarComponent() {

      const isAuthenticated = true; // 로그인 상태 여부에 따라 값 설정

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
                {isAuthenticated ? (
                  <>
                    <NavDropdown title="마이페이지" id="basic-nav-dropdown">
                        <Link to="/mypage" className="dropdown-item">회원 수정</Link>
                        <Link to="/mypagedelete" className="dropdown-item">회원 탈퇴</Link>
                        <NavDropdown.Divider />
                        <Link to="/user/logout" className="nav-link">로그아웃</Link>
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
