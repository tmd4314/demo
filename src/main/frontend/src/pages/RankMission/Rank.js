import React, { useState, useEffect } from 'react';
import axios from 'axios';


const RankingBoard = () => {
  const [Ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const response = await axios.get('/user/ranking');
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
            <th>Rank</th>
            <th>userId</th>
            <th>TotalPoint</th>
          </tr>
        </thead>
        <tbody>
          {Ranking.map((Ranking, index) => (
            <tr key={Ranking.no}>
              <td>{index + 1}</td> {/* 랭킹을 순서대로 표시 */}
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
