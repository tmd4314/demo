package com.react.demo.Rank;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RankingRepository extends JpaRepository<Ranking, Long> {
    Optional<Ranking> findByUserId(String userId);
    List<Ranking> findAllByOrderByTotalPointDesc();
    // 유저 아이디를 이용한 검색 기능 추가
    Page<Ranking> findByUserIdContainingIgnoreCase(String userId, Pageable pageable);
}