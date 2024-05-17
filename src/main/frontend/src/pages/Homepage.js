import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm, WiFog } from 'weather-icons-react';

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
  //날씨
  const [weatherInfo, setWeatherInfo] = useState('');
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  const getWeatherInfo = async () => {
    try {
      // GET 요청 보내기
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=33.360949&lon=126.529803&appid=5f5fe71124b23c5deb3f48c70c686d1c&lang=kr&units=metric');
      const timeResponse = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Seoul');
      // 받은 데이터 설정
      setWeatherInfo(response.data);
      setCurrentTime(timeResponse.data.datetime);
    } catch (error) {
      console.error('Error while fetching weather data:', error);
    }
  };

    // 페이지 로드 시 Weather 정보 가져오기
  useEffect(() => {
    getWeatherInfo();
  }, []);

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
                <Link to="/user/ar"><button id="road1" onMouseOver={() => handleMouseOver(어리목탐방로)} onMouseOut={handleMouseOut}>어리목탐방로</button></Link>
                <Link to="/user/ys"><button id="road2" onMouseOver={() => handleMouseOver(영실탐방로)} onMouseOut={handleMouseOut}>영실탐방로</button></Link>
                <Link to="/user/sp"><button id="road3" onMouseOver={() => handleMouseOver(성판악탐방로)} onMouseOut={handleMouseOut}>성판악탐방로</button></Link>
                <Link to="/user/as"><button id="road4" onMouseOver={() => handleMouseOver(어승생악탐방로)} onMouseOut={handleMouseOut}>어승생악탐방로</button></Link>
                <Link to="/user/dn"><button id="road5" onMouseOver={() => handleMouseOver(돈내코탐방로)} onMouseOut={handleMouseOut}>돈내코탐방로</button></Link>
                <Link to="/user/sg"><button id="road6" onMouseOver={() => handleMouseOver(석굴암탐방로)} onMouseOut={handleMouseOut}>석굴암탐방로</button></Link>
                <Link to="/user/gs"><button id="road7" onMouseOver={() => handleMouseOver(관음사탐방로)} onMouseOut={handleMouseOut}>관음사탐방로</button></Link>
              </div>
          <img src={logo} alt="logo" id="logo" />
        </div>
        <div className="trail-photo-box">
          <div className="trail-photo">
            <img src={currentPhoto} alt="등산로 지도" className="trail" id="base"/>
          </div>
        </div>
      </div>

      <div className="weather-box">
        {error && <p>{error}</p>}
        {weatherInfo ? (
          <div>
            <p>날씨 정보:</p>
              <p>지역: {weatherInfo.name}</p>
              <p>현재 온도: {weatherInfo.main.temp}°C</p>
              <p>날씨:  {weatherInfo.weather[0].description === "맑음" && <WiDaySunny size={65} color='#f00' />}
                        {weatherInfo.weather[0].description === "Rain" && <WiRain size={65} color='#0080ff' />}
                        {weatherInfo.weather[0].description === "Snow" && <WiSnow size={65} color='#0080ff' />}
                        {weatherInfo.weather[0].description === "Clouds" && <WiCloudy size={65} color='#0080ff' />}
                        {weatherInfo.weather[0].description === "Thunderstorm" && <WiThunderstorm size={65} color='#0080ff'/>}
                        {weatherInfo.weather[0].description === "Mist" && <WiFog size={65} color='#0080ff' />}
                        {weatherInfo.weather[0].description === "Fog" && <WiFog size={65} color='#0080ff' />} </p>
              <p>처저 기온: {weatherInfo.main.temp_min}°C</p>
              <p>최고 기온: {weatherInfo.main.temp_max}°C</p>
              <p>현재 시간: {currentTime}</p>
          </div>
        ) : (
          <p>날씨 정보를 불러오는 중...</p>
        )}
      </div>
    </>
  );

}

export default HomePage;

