import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm, WiFog } from 'weather-icons-react';
import '../css/weather.css';

function Weather() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartContainer = useRef(null);
  const chartRef = useRef(null); // Add a reference for the chart

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=33.360949&lon=126.529803&appid=f5cee2776b05720a81722527b6bf4a4e&lang=kr&units=metric');
        const temp = response.data;
        console.log('현재 날씨', temp);
        const weather = [];

        for (let i = 0; i < temp.cnt; i++) {
          const date = new Date(temp.list[i].dt_txt);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
          const time = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
          const timestamp = `${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} (${dayOfWeek}) ${time}`;
          const ith = {
            timestamp,
            temperature: temp.list[i].main.temp,
            minTemperature: temp.list[i].main.temp_min,
            maxTemperature: temp.list[i].main.temp_max,
            humidity: temp.list[i].main.humidity,
            weather: temp.list[i].weather[0].main,
            rainfall: temp.list[i].rain ? temp.list[i].rain['3h'] : 0,
            pressure: temp.list[i].main.pressure,
            feelsLike: temp.list[i].main.feels_like,
          };
          weather.push(ith);
        }
        setWeatherData(weather);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (weatherData.length && chartContainer.current) {
      // Destroy previous chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      drawChart();
    }
  }, [weatherData]);

  // Function to draw the chart
  const drawChart = () => {
    const ctx = chartContainer.current.getContext('2d');

    // Extracting hourly temperature data
    const hourlyTemperatures = weatherData.map(data => ({
      time: data.timestamp,
      temperature: data.temperature
    }));

    // Extracting time labels and temperature values
    const labels = hourlyTemperatures.map(data => data.time);
    const temperatures = hourlyTemperatures.map(data => data.temperature);

    // Create a new chart and store its reference
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '한라산 정상 날씨',
          data: temperatures,
          borderColor: '#007bff',
          fill: false,
          tension: 0.1,
        }]
      },
      options: {
        maintainAspectRatio: false, // Make chart responsive
        scales: {
          x: {
            display: true,
            title: {
              display: true,
           }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: '온도 (°C)'
            }
          }
        }
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!weatherData.length) return null;

  return (
    <div className="container-fluid">
      <h1 className="mt-4">홈페이지</h1>
      <h3>한라산 날씨</h3>
      <div className="chart-section">
        <canvas id="weather-chart" ref={chartContainer}></canvas>
      </div>
      <div className="weather-section">
        <div className="weather-container">
          {weatherData.map((data, index) => (
            <div key={index} className="weather-data">
              <p>시간: <br />{data.timestamp}</p>
              <p>온도: {data.temperature}℃</p>
              <p>최저 기온: {data.minTemperature}℃</p>
              <p>최고 기온: {data.maxTemperature}℃</p>
              <p>습도: {data.humidity}%</p>
              <p>날씨: {data.weather}
                {data.weather === "Clear" && <WiDaySunny size={65} color='#f00' />}
                {data.weather === "Rain" && <WiRain size={65} color='#0080ff' />}
                {data.weather === "Snow" && <WiSnow size={65} color='#0080ff' />}
                {data.weather === "Clouds" && <WiCloudy size={65} color='#0080ff' />}
                {data.weather === "Thunderstorm" && <WiThunderstorm size={65} color='#0080ff' />}
                {data.weather === "Mist" && <WiFog size={65} color='#0080ff' />}
                {data.weather === "Fog" && <WiFog size={65} color='#0080ff' />} </p>
              <p>강수량: {data.rainfall}</p>
              <p>기압: {data.pressure}</p>
              <p>체감 온도: {data.feelsLike}℃</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Weather;
