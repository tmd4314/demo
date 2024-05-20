// HomePage.js (or any other page component that needs axios)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/weather.css';
import  '../css/weather.css';
import Layout from '../Layout';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm, WiFog } from 'weather-icons-react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Weather = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [selectedDay, setSelectedDay] = useState('today');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [selectedDetail, setSelectedDetail] = useState('temperature'); // 'temperature', 'precipitation', 'humidity'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=33.360949&lon=126.529803&appid=f5cee2776b05720a81722527b6bf4a4e&lang=kr&units=metric');
                const temp = response.data;
                setWeatherData(temp.list);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (weatherData.length > 0) {
            const now = new Date();
            const closestData = weatherData.find(data => new Date(data.dt_txt) >= now);
            setCurrentWeather(closestData);
        }
    }, [weatherData]);

    const handleDayChange = (day) => {
        setSelectedDay(day);
    };

    const handleDetailChange = (detail) => {
        setSelectedDetail(detail);
    };

    const renderWeatherIcon = (weather) => {
        switch (weather) {
            case "Clear": return <WiDaySunny size={65} color='#f00' />;
            case "Rain": return <WiRain size={65} color='#0080ff' />;
            case "Snow": return <WiSnow size={65} color='#0080ff' />;
            case "Clouds": return <WiCloudy size={65} color='#0080ff' />;
            case "Thunderstorm": return <WiThunderstorm size={65} color='#0080ff' />;
            case "Mist": return <WiFog size={65} color='#0080ff' />;
            case "Fog": return <WiFog size={65} color='#0080ff' />;
            default: return null;
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!currentWeather) return null;

    const filteredWeatherData = weatherData.filter(data => {
        const date = new Date(data.dt_txt);
        const now = new Date();
        if (selectedDay === 'today') {
            return date.getDate() === now.getDate();
        } else if (selectedDay === 'tomorrow') {
            return date.getDate() === (now.getDate() + 1);
        } else {
            return date.getDate() === (now.getDate() + 2);
        }
    });

    const generateChartData = () => {
        const labels = filteredWeatherData.map(data => new Date(data.dt_txt).getHours() + ":00");
        const data = filteredWeatherData.map(data => {
            if (selectedDetail === 'temperature') return data.main.temp;
            if (selectedDetail === 'precipitation') return data.pop * 100;
            if (selectedDetail === 'humidity') return data.main.humidity;
            return 0;
        });

        return {
            labels,
            datasets: [
                {
                    label: selectedDetail === 'temperature' ? 'Temperature (°C)' : selectedDetail === 'precipitation' ? 'Precipitation (%)' : 'Humidity (%)',
                    data,
                    backgroundColor: selectedDetail === 'temperature' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(54, 162, 235, 0.2)',
                    borderColor: selectedDetail === 'temperature' ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    fill: false,
                },
            ],
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false, // X축 숨기기
                grid: {
                    display: false, // X축 그리드 숨기기
                },
            },
            y: {
                display: false, // Y축 숨기기
                grid: {
                    display: false, // Y축 그리드 숨기기
                },
            },
        },
        plugins: {
            legend: {
                display: false, // 범례 숨기기
            },
        },
    };

    return (
        <Layout>
        <div>
            <h1 className="my-4">제주도 날씨</h1>
            <div className="day-buttons">
                <button onClick={() => handleDayChange('today')}>오늘</button>
                <button onClick={() => handleDayChange('tomorrow')}>내일</button>
                <button onClick={() => handleDayChange('dayAfterTomorrow')}>모레</button>
            </div>
            <div className="current-weather">
                <div>
                    {renderWeatherIcon(currentWeather.weather[0].main)}
                    <p>현재 온도: {currentWeather.main.temp}℃</p>
                </div>
                <div>
                    <p>체감 온도: {currentWeather.main.feels_like}℃</p>
                    <p>습도: {currentWeather.main.humidity}%</p>
                </div>
            </div>
            <div className="detail-buttons">
                <button onClick={() => handleDetailChange('temperature')}>날씨</button>
                <button onClick={() => handleDetailChange('precipitation')}>강수 확률</button>
                <button onClick={() => handleDetailChange('humidity')}>습도</button>
            </div>
            <div className="future-weather">
                {selectedDetail === 'temperature' && (
                    <div>
                        <div className="chart-container">
                            <Line data={generateChartData()} options={chartOptions} />
                        </div>
                        <div className="weather-details">
                            {filteredWeatherData.map((data, index) => (
                                <div key={index} className="weather-detail">
                                    <p>{data.main.temp}℃</p>
                                    {renderWeatherIcon(data.weather[0].main)}
                                    <p>{new Date(data.dt_txt).getHours()}:00</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {selectedDetail === 'precipitation' && (
                    <div>
                        <div className="chart-container">
                            <Bar data={generateChartData()} options={chartOptions} />
                        </div>
                        <div className="weather-details">
                            {filteredWeatherData.map((data, index) => (
                                <div key={index} className="weather-detail">
                                    <p>{data.pop * 100}%</p>
                                    <div className="bar" style={{ height: `${data.pop * 100}%` }}></div>
                                    <p>{new Date(data.dt_txt).getHours()}:00</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {selectedDetail === 'humidity' && (
                    <div>
                        <div className="chart-container">
                            <Bar data={generateChartData()} options={chartOptions} />
                        </div>
                        <div className="weather-details">
                            {filteredWeatherData.map((data, index) => (
                                <div key={index} className="weather-detail">
                                    <p>{data.main.humidity}%</p>
                                    <p>{new Date(data.dt_txt).getHours()}:00</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
        </Layout>
    );
};


export default Weather;