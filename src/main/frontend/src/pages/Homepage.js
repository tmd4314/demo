import React, { useState } from "react";
import '../css/Home.css';
import 기초  from '../img/기초.png';
import 어리목탐방로  from '../img/어리목탐방로.png';
import 영실탐방로  from '../img/영실탐방로.png';
import 성판악탐방로  from '../img/성판악탐방로.png';
import 어승생악탐방로  from '../img/어승생악탐방로.png';
import 돈내코탐방로  from '../img/돈내코탐방로.png';
import 석굴암탐방로  from '../img/석굴암탐방로.png';
import 관음사탐방로  from '../img/관음사탐방로.png';
import logo from '../img/logo.png';

function HomePage() {
  const [currentPhoto, setCurrentPhoto] = useState(기초); // 초기값으로 기초 이미지 설정

  // 버튼에 마우스를 가져가면 해당 버튼의 이미지를 표시하는 함수
  const handleMouseOver = (photo) => {
    setCurrentPhoto(photo);
  };

  // 버튼에서 마우스를 떼면 초기 이미지로 변경하는 함수
  const handleMouseOut = () => {
    setCurrentPhoto(기초);
  };

  return (
    <>
      <div className="sample-trail">
        <div className="trail-name-box">
          <p>등산로</p>
          <div className="trail-name">
            <button id="road1" onMouseOver={() => handleMouseOver(어리목탐방로)} onMouseOut={handleMouseOut}>어리목탐방로</button>
            <button id="road2" onMouseOver={() => handleMouseOver(영실탐방로)} onMouseOut={handleMouseOut}>영실탐방로</button>
            <button id="road3" onMouseOver={() => handleMouseOver(성판악탐방로)} onMouseOut={handleMouseOut}>성판악탐방로</button>
            <button id="road4" onMouseOver={() => handleMouseOver(어승생악탐방로)} onMouseOut={handleMouseOut}>어승생악탐방로</button>
            <button id="road5" onMouseOver={() => handleMouseOver(돈내코탐방로)} onMouseOut={handleMouseOut}>돈내코탐방로</button>
            <button id="road6" onMouseOver={() => handleMouseOver(석굴암탐방로)} onMouseOut={handleMouseOut}>석굴암탐방로</button>
            <button id="road7" onMouseOver={() => handleMouseOver(관음사탐방로)} onMouseOut={handleMouseOut}>관음사탐방로</button>
          </div>
          <img src={logo} alt="logo" id="logo" />
        </div>
        <div className="trail-photo-box">
          <div className="trail-photo">
            <img src={currentPhoto} alt="등산로 지도" className="trail" id="base"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

