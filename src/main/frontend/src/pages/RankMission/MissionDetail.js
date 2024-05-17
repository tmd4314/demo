import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MissionDetail = () => {
  const { missionId } = useParams();
  const [mission, setMission] = useState(null);
  const [startPassword, setStartPassword] = useState('');
  const [endPassword, setEndPassword] = useState('');
  const [error, setError] = useState('');
  const [inputStartPassword, setInputStartPassword] = useState('');
  const [inputEndPassword, setInputEndPassword] = useState('');
  const [missionStarted, setMissionStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const response = await axios.get(`/user/mission/${missionId}`);
       // console.log('Mission data:', response.data); // 미션 데이터 콘솔에 출력
        setMission(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching mission:', error);
      }
    };

    fetchMission();
  }, [missionId]);

  const handleStartMission = async () => {
    try {
      const response = await axios.get(`/user/mission/${missionId}/startpassword`);
      const fetchedStartPassword = response.data;

      if (Number(fetchedStartPassword) === Number(inputStartPassword)) {
        console.log('Mission started successfully!');
        setMissionStarted(true);
        setStartPassword(fetchedStartPassword);
      } else {
        setError('시작 비밀번호가 다릅니다. 다시 입력해주시요');
      }
    } catch (error) {
      console.error('Error starting mission:', error);
    }
  };

  const handleCompleteMission = async () => {
    try {
      const response = await axios.post(`/user/mission/${missionId}/complete`, {
        userId: '사용자 ID',
        endPassword: inputEndPassword
      });
      console.log('Mission completed successfully!');
      // 여기에 랭킹 시스템 업데이트 로직 추가 가능
    } catch (error) {
      console.error('Error completing mission:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="my-4">미션 상세페이지</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {mission ? (
        <div>
          <h2>Route: {mission.route}</h2>
          <p>Point: {mission.point}</p>
          {missionStarted ? (
            <div>
              <p>End Password:</p>
              <input
                type="text"
                value={inputEndPassword}
                onChange={(e) => setInputEndPassword(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleCompleteMission}>미션 완료하기</button>
            </div>
          ) : (
            <div>
              <p>Start Password:</p>
              <input
                type="text"
                value={inputStartPassword}
                onChange={(e) => setInputStartPassword(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleStartMission}>미션 시작하기</button>
            </div>
          )}
        </div>
      ) : (
        <div>Mission not found</div>
      )}
    </div>
  );
};

export default MissionDetail;
