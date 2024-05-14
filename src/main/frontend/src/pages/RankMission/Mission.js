import React, { useState, useEffect } from 'react';
import axios from 'axios';


const MissionBoard = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await axios.get('/user/mission');
        setMissions(response.data);
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };

    fetchMissions();
  }, []);

  const handleChallengeClick = (mission) => {
    console.log('Challenging mission:', mission);
    // 여기에 도전하기 버튼이 클릭되었을 때 수행할 동작 추가
  };

  return (
    <div className="container">
      <h1 className="my-4">미션 게시판</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Route</th>
            <th>Point</th>
            <th>Action</th> {/* 도전하기 버튼을 추가하는 열 */}
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.id}>
              <td>{mission.route}</td>
              <td>{mission.point}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleChallengeClick(mission)}
                >
                  도전하기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MissionBoard;
