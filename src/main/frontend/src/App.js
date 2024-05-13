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
import AR from './pages/road/AR';
import YS from './pages/road/YS';
import SP from './pages/road/SP';
import AS from './pages/road/AS';
import GS from './pages/road/GS';
import SG from './pages/road/SG';
import DN from './pages/road/DN';


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
              <Route exact path="/user/ar" element={<AR />} />
              <Route exact path="/user/ys" element={<YS />} />
              <Route exact path="/user/sp" element={<SP />} />
              <Route exact path="/user/gs" element={<GS />} />
              <Route exact path="/user/sg" element={<SG />} />
              <Route exact path="/user/dn" element={<DN />} />
              <Route exact path="/user/as" element={<AS />} />

            </Routes>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
