// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import { Container } from 'react-bootstrap';
import Sidebar from './bar/Sidebar';
import Navbar from './bar/Navbar';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forecast from './pages/Forecast';
import StatFire from './pages/StatFire';
import Mountain from './pages/Mountain';
import Weather from './pages/Weather';

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
              <Route exact path="/user/login" element={<Login />} />
              <Route exact path="/user/forecast" element={<Forecast />} />
              <Route exact path="/user/signup" element={<Signup />} />
              <Route exact path="/user/statfire" element={<StatFire />} />
              <Route exact path="/user/mountain" element={<Mountain />} />
              <Route exact path="/user/weather" element={<Weather/>} />
            </Routes>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
