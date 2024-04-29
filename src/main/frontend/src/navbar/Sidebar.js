// Sidebar.js
import React from 'react';
// import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Sidebar() {
  return (
    <div className="border-end bg-white" id="sidebar-wrapper">
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

export default Sidebar;