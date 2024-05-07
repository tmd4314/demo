import React, { useState } from 'react';
import axios from 'axios';

function StatFire() {
    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

     const fetchData = async (apiUrl, params) => {
        try {
            setLoading(true);
            const response = await axios.get(apiUrl, { params });
            console.log(response.data);
            setJsonData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let apiUrl, params;
        if (event.target.name === 'fireForm') {
            apiUrl = '/statfireApi/getfirestatsservice';
            params = {
                serviceKey: 'kHEcrvzQARuT/Kl/lkC3PTZUUh8W0j5e4H5PPDoqatZy2/PKtFaR5hy+p6+0DXUp8RK/gf/zWMR6k19rA2Q96Q==',
                numOfRows: 10,
                pageNo: 1,
                searchStDt: 20160101,
                searchEdDt: 20160825
            };
        }
        fetchData(apiUrl, params);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <div>
                <h1>Search for Local Areas</h1>
                <form onSubmit={handleSubmit} name="fireForm">
                    <button type="submit">Search</button>
                </form>
            </div>
            {jsonData && (
                <div>
                    <h2>JSON Data:</h2>
                    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default StatFire;
