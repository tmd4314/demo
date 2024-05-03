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
    import Mypage from './pages/Mypage';
    import MypageDelete from './pages/MypageDelete';
    import ConfirmationModal from './ConfirmationModal';


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
                  <Route exact path="/api/login" element={<Login />} />
                  <Route exact path="/forecast" element={<Forecast />} />
                  <Route exact path="/api/signup" element={<Signup />} />
                  <Route exact path="/mypage" element={<Mypage />} />
                  <Route exact path="/mypagedelete" element={<MypageDelete />} />
                  <Route exact path="/confirmation" element={<ConfirmationModal />} />
                </Routes>
              </Container>
            </div>
          </div>
        </Router>
      );
    }

    export default App;
