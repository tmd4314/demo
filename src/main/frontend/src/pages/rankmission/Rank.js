import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RankingBoard = () => {
  const [ranking, setRanking] = useState([]);
  const [showAlert, setShowAlert] = useState(true); // 알림 메시지 표시 여부를 위한 상태 추가.
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
  const [page, setPage] = useState(0); // 현재 페이지 번호 (0부터 시작)
  const [pageSize, setPageSize] = useState(10); // 페이지당 아이템 수

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const response = await axios.get(`/user/ranking?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`);
        const sortedRanking = response.data.content.sort((a, b) => b.totalPoint - a.totalPoint); // 총점수가 높은 순으로 정렬
        setRanking(sortedRanking); // 정렬된 데이터를 설정
      } catch (error) {
        console.error('Error fetching Rank:', error);
      }
    };

    fetchRank();
  }, [page, pageSize, searchTerm]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSearch = () => {
    setPage(0); // 검색어가 변경될 때 페이지를 초기화하여 첫 페이지부터 검색 결과를 보여줌
  };

  return (
    <div>
      <h1 className="my-4">랭킹 게시판</h1>
      {showAlert && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>
            알림: 추후 랭킹 포인트를 이용한 등산용품 할인 마켓을 오픈할 예정이오니 많은 참여 부탁드립니다.
          </strong>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAlert}></button>
        </div>
      )}
      <div className="mb-3 input-group">
        <input
          type="text"
          className="form-control"
          placeholder="유저 아이디 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>순위</th>
            <th>아이디</th>
            <th>총점수</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((rank, index) => (
            <tr key={rank.no}>
              <td>{index + 1 + page * pageSize}</td> {/* 페이지 넘버링에 맞게 수정 */}
              <td>{rank.userId}</td>
              <td>{rank.totalPoint}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingBoard;
