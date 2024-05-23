import React, { useState, useEffect } from "react";
import '../css/Home.css';
import 기초 from '../img/기초.png';
import 어리목탐방로 from '../img/어리목탐방로.png';
import 영실탐방로 from '../img/영실탐방로.png';
import 성판악탐방로 from '../img/성판악탐방로.png';
import 어승생악탐방로 from '../img/어승생악탐방로.png';
import 돈내코탐방로 from '../img/돈내코탐방로.png';
import 석굴암탐방로 from '../img/석굴암탐방로.png';
import 관음사탐방로 from '../img/관음사탐방로.png';
import logo from '../img/logo.png';
import banner1 from '../img/메인배너1.jpg';
import banner2 from '../img/메인배너2.jpg';
import banner3 from '../img/메인배너3.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm, WiFog, WiCloud} from 'weather-icons-react';
import Carousel from 'react-bootstrap/Carousel';
import Layout from '../Layout';

function HomePage() {
  const [currentPhoto, setCurrentPhoto] = useState(기초);
  const [weatherInfo, setWeatherInfo] = useState('');
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate();
//  제주 날시
  const [otherWeatherInfo, setOtherWeatherInfo] = useState('');
  const [otherCurrentTime, setOtherCurrentTime] = useState('');

  const handleMouseOver = (photo) => {
    setCurrentPhoto(photo);
  };

  const handleMouseOut = () => {
    setCurrentPhoto(기초);
  };

  const getWeatherInfo = async () => {
      try {
        // GET 요청 보내기
       const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=33.360949&lon=126.529803&appid=5f5fe71124b23c5deb3f48c70c686d1c&lang=kr&units=metric');

       const timeResponse = await axios.get(
               'http://worldtimeapi.org/api/timezone/Asia/Seoul'
             );
       const dateTime = new Date(timeResponse.data.datetime);
        // 받은 데이터 설정
        const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const formattedTime = `${dateTime.getMonth() + 1}월-${dateTime.getDate()}일 (${days[dateTime.getDay()]})
                                        \n${dateTime.getHours()}시-${dateTime.getMinutes()}분`;

        setCurrentTime(formattedTime);
        setWeatherInfo(response.data);
        console.log(response.data);
    } catch (error) {
      console.error('Error while fetching weather data:', error);
    }
  };

  const getOtherWeatherInfo = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=33.499157&lon=126.531138&appid=5f5fe71124b23c5deb3f48c70c686d1c&lang=kr&units=metric');
        const timeResponse = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Seoul');
        const dateTime = new Date(timeResponse.data.datetime);
        const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const formattedTime = `${dateTime.getMonth() + 1}월-${dateTime.getDate()}일 (${days[dateTime.getDay()]})
                                \n${dateTime.getHours()}시-${dateTime.getMinutes()}분`;
        setOtherCurrentTime(formattedTime);
        setOtherWeatherInfo(response.data);
      } catch (error) {
        console.error('Error while fetching other weather data:', error);
      }
    };

  useEffect(() => {
    getWeatherInfo();
    getOtherWeatherInfo();
  }, []);

  return (
    <Layout>
      {/* 상단 배너 */}
      <div className="carousel-container">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={banner1} alt="First slide" />
            <Carousel.Caption>
              <h3>윗세오름</h3>
              <p>봉우리 원정대</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={banner2} alt="Second slide" />
            <Carousel.Caption>
              <h3>송악산 둘레길</h3>
              <p>봉우리 원정대</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={banner3} alt="Third slide" />
            <Carousel.Caption>
              <h3>한라산 겨울</h3>
              <p>봉우리 원정대</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="sample-trail">
        <div className="trail-name-box">
          <p>등산로</p>
          <div className="trail-name">
            <Link to="/user/ar">
              <button id="road1" onMouseOver={() => handleMouseOver(어리목탐방로)} onMouseOut={handleMouseOut}>어리목탐방로</button>
            </Link>
            <Link to="/user/ys">
              <button id="road2" onMouseOver={() => handleMouseOver(영실탐방로)} onMouseOut={handleMouseOut}>영실탐방로</button>
            </Link>
            <Link to="/user/sp">
              <button id="road3" onMouseOver={() => handleMouseOver(성판악탐방로)} onMouseOut={handleMouseOut}>성판악탐방로</button>
            </Link>
            <Link to="/user/as">
              <button id="road4" onMouseOver={() => handleMouseOver(어승생악탐방로)} onMouseOut={handleMouseOut}>어승생악탐방로</button>
            </Link>
            <Link to="/user/dn">
              <button id="road5" onMouseOver={() => handleMouseOver(돈내코탐방로)} onMouseOut={handleMouseOut}>돈내코탐방로</button>
            </Link>
            <Link to="/user/sg">
              <button id="road6" onMouseOver={() => handleMouseOver(석굴암탐방로)} onMouseOut={handleMouseOut}>석굴암탐방로</button>
            </Link>
            <Link to="/user/gs">
              <button id="road7" onMouseOver={() => handleMouseOver(관음사탐방로)} onMouseOut={handleMouseOut}>관음사탐방로</button>
            </Link>
          </div>
          <img src={logo} alt="logo" id="logo" />
          <p id='notion'>상세페이지를 보시려면 등산로 이름을 눌러주세요</p>
        </div>
        <div className="trail-photo-box">
          <div className="trail-photo">
            <img src={currentPhoto} alt="등산로 지도" className="trail" id="base" />
          </div>
        </div>
      </div>

  <div className="weather" onClick={() => navigate('/user/weather')}>
    <div className="weather-box" id="left-weather">
      <div className="weather-icon">
        {weatherInfo ? (
          <>
            {weatherInfo.weather[0].description === "맑음" && <WiDaySunny size={185} color='#f00' />}
            {weatherInfo.weather[0].description === "Rain" && <WiRain size={185} color='#0080ff' />}
            {weatherInfo.weather[0].description === "Snow" && <WiSnow size={185} color='#0080ff' />}
            {weatherInfo.weather[0].description === "온흐림" && <WiCloudy size={185} color='#0080ff' />}
            {weatherInfo.weather[0].description === "튼구름" && <WiCloudy size={185} color='#0080ff' />}
            {weatherInfo.weather[0].description === "약간의 구름이 낀 하늘" && <WiCloud size={185} color='#0080ff' />}
            {weatherInfo.weather[0].description === "Thunderstorm" && <WiThunderstorm size={185} color='#0080ff' />}
            {weatherInfo.weather[0].description === "박무" && <WiFog size={185} color='#0080ff' />}
            {weatherInfo.weather[0].description === "안개" && <WiFog size={185} color='#0080ff' />}
          </>
        ) : (
          <p>정보 불러오는 중...</p>
        )}
      </div>
        <div className="weather-details">
        <p style={{ fontSize: '80px' }}> {weatherInfo && weatherInfo.main.temp}°C</p>
          <p>지역: 한라산 정상</p>
          <p>현재 시간: {currentTime}</p>
        </div>
    </div>
    <div className="weather-box" id="right-weather">
      {otherWeatherInfo ? (
        <>
          <div className="weather-icon">
              {weatherInfo ? (
                <>
                  {weatherInfo.weather[0].description === "맑음" && <WiDaySunny size={185} color='#f00' />}
                  {weatherInfo.weather[0].description === "Rain" && <WiRain size={185} color='#0080ff' />}
                  {weatherInfo.weather[0].description === "Snow" && <WiSnow size={185} color='#0080ff' />}
                  {weatherInfo.weather[0].description === "튼구름" && <WiCloudy size={185} color='#0080ff' />}
                  {weatherInfo.weather[0].description === "온흐림" && <WiCloudy size={185} color='#0080ff' />}
                  {weatherInfo.weather[0].description === "약간의 구름이 낀 하늘" && <WiCloud size={185} color='#0080ff' />}
                  {weatherInfo.weather[0].description === "Thunderstorm" && <WiThunderstorm size={185} color='#0080ff' />}
                  {weatherInfo.weather[0].description === "박무" && <WiFog size={185} color='#0080ff' />}
                  {weatherInfo.weather[0].description === "안개" && <WiFog size={185} color='#0080ff' />}
                </>
              ) : (
                <p>정보 불러오는 중...</p>
              )}
          </div>


            <div className="weather-details">
            <p style={{ fontSize: '80px' }}> {otherWeatherInfo && otherWeatherInfo.main.temp}°C</p>
              <p>지역: 제주도</p>
              <p>현재 시간: {otherCurrentTime}</p>
            </div>

        </>
      ) : (
        <p>정보 불러오는 중...</p>
      )}
        </div>
  </div>
    </Layout>
  );
}

export default HomePage;
