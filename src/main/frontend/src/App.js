// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import { Container } from 'react-bootstrap';
import Sidebar from './bar/Sidebar';
import Navbar from './bar/Navbar';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import Join from './pages/Join';
import Forecast from './pages/Forecast';

function App() {
  return (
    <Router>
      <div className="d-flex" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
          <Navbar />
          <Container>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/forecast" element={<Forecast />} />
              <Route exact path="/join" element={<Join />} />
            </Routes>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
