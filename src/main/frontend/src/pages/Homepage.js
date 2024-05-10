// HomePage.js (or any other page component that needs axios)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
      const [weatherData, setWeatherData] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
       useEffect(() => {
           const fetchData = async () => {
               try {
                   const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=33.360949&lon=126.529803&appid=f5cee2776b05720a81722527b6bf4a4e&lang=kr&units=metric');
                   const temp = response.data;

                   const weather = [];
                   for (let i = 0; i < temp.cnt; i++) {
                       const ith = {
                           timestamp: temp.list[i].dt_txt,
                           temperature: temp.list[i].main.temp,
                           minTemperature: temp.list[i].main.temp_min,
                           maxTemperature: temp.list[i].main.temp_max,
                           humidity: temp.list[i].main.humidity,
                           weather: temp.list[i].weather[0].main,
                           rainfall: temp.list[i].rain ? temp.list[i].rain['3h'] : 0
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

       if (loading) return <div>Loading...</div>;
       if (error) return <div>Error: {error.message}</div>;
       if (!weatherData) return null;

  return (
    <div className="container-fluid">
      <h1 className="mt-4">홈페이지</h1>
         <div>
             {weatherData.map((data, index) => (
                          <div key={index}>
                              <p>시간: {data.timestamp}</p>
                              <p>온도: {data.temperature}</p>
                              <p>최저 기온: {data.minTemperature}</p>
                              <p>최고 기온: {data.maxTemperature}</p>
                              <p>습도: {data.humidity}</p>
                              <p>날씨: {data.weather}</p>
                              <p>강수량: {data.rainfall}</p>
                          </div>
                      ))}
        </div>
      <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
      <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#sidebarToggle</code> ID which will toggle the menu when clicked.</p>
    </div>

  );
}

export default HomePage;

