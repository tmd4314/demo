import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // react-router-dom의 Link 사용
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
                <Link to={`/user/mission/${mission.id}`}>
                  <button className="btn btn-primary">
                    도전하기
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MissionBoard;
