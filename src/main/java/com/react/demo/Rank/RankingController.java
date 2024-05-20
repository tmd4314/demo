package com.react.demo.Rank;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class RankingController {

    @Autowired
    private RankingRepository rankingRepository;

    // 페이징된 순위 목록 조회
    @GetMapping("/ranking")
    public Page<Ranking> getRankingWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String searchTerm) {

        if (searchTerm != null && !searchTerm.isEmpty()) {
            // 유저 아이디를 이용한 검색
            return rankingRepository.findByUserIdContainingIgnoreCase(searchTerm, PageRequest.of(page, pageSize));
        } else {
            // 페이징된 모든 순위 목록 조회
            return rankingRepository.findAll(PageRequest.of(page, pageSize));
        }
    }

    // 새로운 순위 추가
    @PostMapping("/ranking")
    public Ranking addRanking(@RequestBody Ranking ranking) {
        Ranking savedRanking = rankingRepository.save(ranking);
        return savedRanking;
    }
}
