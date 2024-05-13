import React from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Sidebar() {
  return (
    <div className="border-end bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom bg-light">메뉴</div>
      <div className="list-group list-group-flush">
        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/user/weather">날씨 예보</a>
        <div className="list-group-item list-group-item-action list-group-item-light p-3">
          <div className="d-inline-block">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
