// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routes와 Route로 변경
import './css/App.css';
import Container from 'react-bootstrap/Container';
import Sidebar from './bar/Sidebar';
import Navbar from './bar/Navbar';
import HomePage from './pages/Homepage';

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
            </Routes>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
