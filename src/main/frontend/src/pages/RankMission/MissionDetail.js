import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MissionDetail = () => {
  const { missionId } = useParams();
  const [mission, setMission] = useState();
  const [startPassword, setStartPassword] = useState('');
  const [endPassword, setEndPassword] = useState('');

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const response = await axios.get(`/user/mission/${missionId}`);
        setMission(response.data);
      } catch (error) {
        console.error('Error fetching mission:', error);
      }
    };

    if (missionId) {
      fetchMission();
    }
  }, [missionId]);

  useEffect(() => {
    const fetchStartPassword = async () => {
      if (mission && mission.id) {
        try {
          const response = await axios.get(`/user/mission/${mission.id}/startpassword`);
          setStartPassword(response.data);
        } catch (error) {
          console.error('Error fetching start password:', error);
        }
      }
    };

    fetchStartPassword();
  }, [mission]);

  useEffect(() => {
    const fetchEndPassword = async () => {
      if (mission && mission.id) {
        try {
          const response = await axios.get(`/user/mission/${mission.id}/endpassword`);
          setEndPassword(response.data);
        } catch (error) {
          console.error('Error fetching end password:', error);
        }
      }
    };

    fetchEndPassword();
  }, [mission]);

  // 미션 완료를 위한 함수
  const handleCompleteMission = async () => {
    try {
      if (endPassword) {
        // 미션 완료 API 호출
        await axios.post(`/user/mission/${mission.id}/complete`, { userId: '사용자 ID', endPassword: endPassword });
        console.log('Mission completed successfully!');
      } else {
        console.error('End password is not set.');
      }
    } catch (error) {
      console.error('Error completing mission:', error);
    }
  };

if (mission) {
  console.log('Mission data.');
  return <div>Loading...</div>;
}
// mission이 null인 경우에는 데이터를 콘솔에 출력
console.log('Mission data is null:', mission);

  return (
    <div className="container">
      <h1 className="my-4">미션 상세페이지</h1>
      <div>
        <h2>Route: {mission.route}</h2>
        <p>Point: {mission.point}</p>
        <p>Start Password: {startPassword}</p>
        <p>End Password: {endPassword}</p>
        {/* 미션 완료하기 버튼 */}
        <button className="btn btn-primary" onClick={handleCompleteMission}>미션 완료하기</button>
      </div>
    </div>
  );
};

export default MissionDetail;
