import React, { useState } from 'react';
import axios from 'axios';

function Forecast() {
    const [localAreas, setLocalAreas] = useState('');
    const [stnIds, setStnIds] = useState('');
    const [localAreasJson, setLocalAreasJson] = useState(null);
    const [weatherJson, setWeatherJson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'localAreas') {
            setLocalAreas(value);
        } else if (name === 'stnIds') {
            setStnIds(value);
        }
    };

    const fetchData = async (apiUrl, params) => {
        try {
            setLoading(true);
            const response = await axios.get(apiUrl, { params });
            return response.data;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let apiUrl, params;
        if (event.target.name === 'fireForm') {
            apiUrl = 'http://apis.data.go.kr/1400377/forestPoint/forestPointListSidoSearch';
            params = {
                serviceKey: '+rjPlspLDATUPFxhEJF1VV7y793cI5CJKC9dPXTGIVLzpvYzxUTpoOUshFXdLNaHDdTQC7I8ftzGwD3qrHFliA==',
                pageNo: 1,
                numOfRows: 10,
                _type: 'json',
                localAreas: localAreas,
                excludeForecast: 0
            };
            const data = await fetchData(apiUrl, params);
            setLocalAreasJson(data);
        } else if (event.target.name === 'weatherForm') {
            apiUrl = 'http://apis.data.go.kr/1360000/AsosHourlyInfoService/getWthrDataList';
            params = {
                serviceKey: '+rjPlspLDATUPFxhEJF1VV7y793cI5CJKC9dPXTGIVLzpvYzxUTpoOUshFXdLNaHDdTQC7I8ftzGwD3qrHFliA==',
                pageNo: 1,
                numOfRows: 10,
                dataType: 'JSON',
                dataCd: 'ASOS',
                dateCd: 'HR',
                startDt: '20240426',
                startHh: '01',
                endDt: '20240427',
                endHh: '01',
                stnIds: stnIds
            };
            const data = await fetchData(apiUrl, params);
            setWeatherJson(data);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '20px' }}>
                    <h1>Search for Local Areas</h1>
                    <form onSubmit={handleSubmit} name="fireForm">
                        <label>
                            Enter Local Areas (e.g., 01,02):
                            <input type="text" name="localAreas" value={localAreas} onChange={handleChange} />
                        </label>
                        <button type="submit">Search</button>
                    </form>
                    {localAreasJson && (
                        <div>
                            <h2>Local Areas JSON Data:</h2>
                            <pre>{JSON.stringify(localAreasJson, null, 2)}</pre>
                        </div>
                    )}
                </div>
                <div>
                    <h1>Search for Weather</h1>
                    <form onSubmit={handleSubmit} name="weatherForm">
                        <label>
                            Enter Station Number:
                            <input type="text" name="stnIds" value={stnIds} onChange={handleChange} />
                        </label>
                        <button type="submit">Search</button>
                    </form>
                    {weatherJson && (
                        <div>
                            <h2>Weather JSON Data:</h2>
                            <pre>{JSON.stringify(weatherJson, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Forecast;
