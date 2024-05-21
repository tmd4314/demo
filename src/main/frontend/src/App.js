// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import { Container } from 'react-bootstrap';
import Navbar from './bar/Navbar';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Weather from './pages/Weather';
import AR from './pages/road/AR';
import YS from './pages/road/YS';
import SP from './pages/road/SP';
import AS from './pages/road/AS';
import GS from './pages/road/GS';
import SG from './pages/road/SG';
import DN from './pages/road/DN';
import Mission from './pages/rankmission/Mission';
import Rank from './pages/rankmission/Rank';
import MissionDetail from './pages/rankmission/MissionDetail';
import CCTV1 from './pages/cctv/CCTV1';
import CCTV2 from './pages/cctv/CCTV2';
import CCTV3 from './pages/cctv/CCTV3';
import CCTV4 from './pages/cctv/CCTV4';
import Mypage from './pages/Mypage';



function App() {
  return (
    <Router>
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">
          <Navbar />
          <Container>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/user/logins" element={<Login />} />
              <Route exact path="/user/weather" element={<Weather />} />
              <Route exact path="/user/signups" element={<Signup />} />
              <Route exact path="/user/ar" element={<AR />} />
              <Route exact path="/user/ys" element={<YS />} />
              <Route exact path="/user/sp" element={<SP />} />
              <Route exact path="/user/gs" element={<GS />} />
              <Route exact path="/user/sg" element={<SG />} />
              <Route exact path="/user/dn" element={<DN />} />
              <Route exact path="/user/as" element={<AS />} />
              <Route exact path="/user/missions" element={<Mission />}/>
              <Route exact path="/user/rank" element={<Rank />}/>
              <Route exact path="/user/missions/:missionId" element={<MissionDetail />}/> {/* mission id 값까지 같이 넘겨줌 */}
              <Route exact path="/user/cctv1" element={<CCTV1 />}/>
              <Route exact path="/user/cctv2" element={<CCTV2 />}/>
              <Route exact path="/user/cctv3" element={<CCTV3 />}/>
              <Route exact path="/user/cctv4" element={<CCTV4 />}/>
              <Route exact path="/mypage" element={<Mypage />}/>
            </Routes>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
