import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
    // 입력한 지점을 저장할 상태
    const [stnIds, setStnIds] = useState('');
    // API로부터 받은 데이터를 저장할 상태
    const [jsonData, setJsonData] = useState(null);
    // API 호출 중인지 여부를 나타내는 상태
    const [loading, setLoading] = useState(false);
    // 에러 발생 여부를 나타내는 상태
    const [error, setError] = useState(null);

    // 입력 필드 변경 핸들러
    const handleChange = (event) => {
        setStnIds(event.target.value);
    };

    // API 호출 함수
    const fetchData = async () => {
        try {
            // API 호출 중 플래그 설정
            setLoading(true);
            // API 호출
            const response = await axios.get(`http://apis.data.go.kr/1360000/AsosHourlyInfoService/getWthrDataList`, {
                params: {
                    serviceKey: '+rjPlspLDATUPFxhEJF1VV7y793cI5CJKC9dPXTGIVLzpvYzxUTpoOUshFXdLNaHDdTQC7I8ftzGwD3qrHFliA==',
                    pageNo: 1,
                    numOfRows: 10,
                    dataType: 'JSON',
                    dataCd: 'ASOS',
                    dateCd: 'HR',
                    startDt: '20240426', //테스트 일자.(추후 변경 사항)
                    startHh: '01',
                    endDt: '20240427',
                    endHh: '01',
                    stnIds: stnIds
                }
            });
            // 받은 데이터를 상태에 저장
            setJsonData(response.data);
        } catch (error) {
            // 오류 발생 시 에러 상태 업데이트
            setError(error);
        } finally {
            // API 호출 중 플래그 해제
            setLoading(false);
        }
    };

    // 폼 제출 핸들러
    const handleSubmit = (event) => {
        event.preventDefault();
        // API 호출 함수 실행
        fetchData();
    };

    // 로딩 중이면 로딩 표시를 보여줌
    if (loading) return <p>Loading...</p>;
    // 에러가 발생하면 에러 메시지를 보여줌
    if (error) return <p>Error: {error.message}</p>;

    // 데이터가 있으면 화면에 출력
    return (
        <div>
            <h1>Search for Weather</h1>
            {/* 폼을 추가하여 사용자가 지점을 입력할 수 있도록 함 */}
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Station Number:
                    <input type="text" value={stnIds} onChange={handleChange} />
                </label>
                <button type="submit">Search</button>
            </form>
            {/* 받은 데이터를 출력 */}
            {jsonData && (
                <div>
                    <h2>JSON Data:</h2>
                    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Weather;
