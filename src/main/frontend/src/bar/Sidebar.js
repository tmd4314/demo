import React from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Sidebar() {
  return (
    <div className="border-end bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom bg-light">메뉴</div>
      <div className="list-group list-group-flush">
        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/user/forecast">화제 및 날씨 예보</a>
        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">화제 다발 구역</a>
        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/user/mountain">산정보</a>
        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/user/statfire">산불 통계</a>
        <div className="list-group-item list-group-item-action list-group-item-light p-3">
          <div className="d-inline-block">
            <NavDropdown title="찜목록" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">item 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">item 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">item 1</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
