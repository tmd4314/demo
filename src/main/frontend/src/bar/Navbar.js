// Navbar.js
import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // React Router의 Link를 가져옵니다.
import Logout from '../pages/Logout.js';
function NavbarComponent() {
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
            <Link to="/login" className="nav-link">로그인</Link> {/* 로그인 링크를 React Router의 Link로 변경 */}
            <Nav.Link href="/signup">회원가입</Nav.Link>
            <NavDropdown title="마이페이지" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">회원 수정</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">회원 탈퇴</NavDropdown.Item>
                <NavDropdown.Divider />
                <Logout />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
