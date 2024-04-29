import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Sidebar({ sidebarOpen }) {
  return (
    <div className={`border-end bg-white ${sidebarOpen ? 'show' : 'hide'}`} id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom bg-light">메뉴</div>
      <div className="list-group list-group-flush">
        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">날씨 및 화제 예보</a>
        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">화제 다발 구역</a>
        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">
          <NavDropdown title="찜목록" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">item 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">item 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">item 1</NavDropdown.Item>
          </NavDropdown>
        </a>
      </div>
    </div>
  );
}

function App() {
  const [hello, setHello] = useState('');
  const sidebarOpen = false; // 사이드바를 항상 닫은 상태로 고정합니다.

  useEffect(() => {
    axios.get('/api/hello')
      .then(response => setHello(response.data))
      .catch(error => console.log(error))
  }, []);

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div id="page-content-wrapper">
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
            </Navbar.Collapse>
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
          </Container>
        </Navbar>
        <div className="container-fluid">
          <h1 className="mt-4">Simple Sidebar</h1>
          <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
          <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#sidebarToggle</code> ID which will toggle the menu when clicked.</p>

        </div>
      </div>
    </div>
  );
}

export default App;