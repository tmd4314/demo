import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

import '../css/App.css';

function Sidebar() {
  return (
    <div className="border-end bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom bg-light">
        봉우리원정대
      </div>
      <div className="list-group list-group-flush">
        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/">홈</a>
        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="forecast">날씨 예보</a>
        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="!#">나중에 기획</a>
        <div className="list-group-item list-group-item-action list-group-item-light p-3">
          <div className="d-inline-block">
            <NavDropdown title="찜목록" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">item 1</NavDropdown.Item>
              <NavDropdown.Item href="#">item 1</NavDropdown.Item>
              <NavDropdown.Item href="#">item 1</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
