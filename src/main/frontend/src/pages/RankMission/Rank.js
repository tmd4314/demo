import React, { useState, useEffect } from 'react';
import axios from 'axios';


const RankingBoard = () => {
  const [Ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const response = await axios.get('/user/Ranking');
        setRanking(response.data);
      } catch (error) {
        console.error('Error fetching Rank:', error);
      }
    };

    fetchRank();
  }, []);


  return (
    <div className="container">
      <h1 className="my-4">랭킹 게시판</h1>
      <table className="table">
        <thead>
          <tr>
            <th>userId</th>
            <th>TotalPoint</th>
          </tr>
        </thead>
        <tbody>
          {Ranking.map((Ranking) => (
            <tr key={Ranking.no}>
              <td>{Ranking.userId}</td>
              <td>{Ranking.totalPoint}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingBoard;
