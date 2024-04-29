// Navbar.js
import React from 'react';
//import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown, Form, Row, Col, Button } from 'react-bootstrap';

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary border-bottom">
      <Container fluid>
        <Navbar.Brand href="#home">산악인</Navbar.Brand>
        <Nav className="me-auto">
          <Form inline>
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
            <Nav.Link href="#home">로그인</Nav.Link>
            <Nav.Link href="#link">회원가입</Nav.Link>
            <NavDropdown title="마이페이지" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">회원 수정</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">회원 탈퇴</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">로그아웃</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;