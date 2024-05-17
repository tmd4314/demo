import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/VerificationCodeInput.css';

const MissionDetail = () => {
  const { missionId } = useParams();
  const [mission, setMission] = useState(null);
  const [startPassword, setStartPassword] = useState('');
  const [endPassword, setEndPassword] = useState('');
  const [error, setError] = useState('');
  const [missionStarted, setMissionStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startValues, setStartValues] = useState(['', '', '']);
  const [endValues, setEndValues] = useState(['', '', '']);
  const startInputs = useRef([]);
  const endInputs = useRef([]);
  const [userid, setUserid] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
      setIsAuthenticated(storedIsAuthenticated === 'true');
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const storedUserid = localStorage.getItem('userid');
      setUserid(storedUserid);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const response = await axios.get(`/user/mission/${missionId}`);
        setMission(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching mission:', error);
      }
    };

    fetchMission();
  }, [missionId]);

  const handleStartMission = async () => {
    const inputStartPassword = startValues.join('');

    if (inputStartPassword.length < 3) {
      setError('Please enter the complete 3-digit code.');
      return;
    }

    try {
      const response = await axios.post(`/user/mission/${missionId}/start`, {
        userid: userid,
        startPassword: inputStartPassword
      });

      const fetchedStartPassword = response.data;
      setMissionStarted(true);
    } catch (error) {
      console.error('Error starting mission:', error);
      setError('패스워드가 틀렸다. 다시 시도해줘.');
    }
  };

  const handleCompleteMission = async () => {
    const inputEndPassword = endValues.join('');

    if (inputEndPassword.length < 3) {
      setError('Please enter the complete 3-digit code.');
      return;
    }

    try {
      const response = await axios.post(`/user/mission/${missionId}/complete`, {
        userid: userid,
        endPassword: inputEndPassword
      });
      window.alert("미션을 성공하셨습니다. !!!!!!")
      window.location.href = '/';
      // 여기에 랭킹 시스템 업데이트 로직 추가 가능
    } catch (error) {
      console.error('Error completing mission:', error);
      setError('패스워드가 틀렸다. 다시 시도해줘.');
    }
  };

  const handleChange = (e, index, setValues, values, inputs) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      if (value && index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index, inputs) => {
    if (e.key === 'Backspace' && !inputs.current[index].value && index > 0) {
      inputs.current[index - 1].focus();
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
              <div className="verification-code-input">
                {endValues.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(e, index, setEndValues, endValues, endInputs)}
                    onKeyDown={(e) => handleKeyDown(e, index, endInputs)}
                    ref={(el) => (endInputs.current[index] = el)}
                  />
                ))}
                <button className="btn btn-primary" onClick={handleCompleteMission}>미션 완료하기</button>
              </div>
            </div>
          ) : (
            <div>
              <p>Start Password:</p>
              <div className="verification-code-input">
                {startValues.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(e, index, setStartValues, startValues, startInputs)}
                    onKeyDown={(e) => handleKeyDown(e, index, startInputs)}
                    ref={(el) => (startInputs.current[index] = el)}
                  />
                ))}
                <button className="btn btn-primary" onClick={handleStartMission}>미션 시작하기</button>
              </div>
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
