import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherInfo, setWeatherInfo] = useState('');

  const handleGetWeather = () => {
    fetch(`/weather?latitude=${latitude}&longitude=${longitude}`)
      .then(response => response.text())
      .then(data => setWeatherInfo(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>날씨 정보 조회</h1>
      <div>
        <label>위도: </label>
        <input type="text" value={latitude} onChange={e => setLatitude(e.target.value)} />
      </div>
      <div>
        <label>경도: </label>
        <input type="text" value={longitude} onChange={e => setLongitude(e.target.value)} />
      </div>
      <button onClick={handleGetWeather}>날씨 조회</button>
      <div>
        {weatherInfo && (
          <div>
            <h2>날씨 정보</h2>
            <pre>{weatherInfo}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
