package com.react.demo.Rank;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class RankingController {

    @Autowired
    private RankingRepository rankingRepository;

    // 모든 순위 목록 조회
    @GetMapping("/ranking")
    public List<Ranking> getAllRanking() {
        List<Ranking> ranking = rankingRepository.findAll();
        return ranking;
    }

    // 새로운 순위 추가
    @PostMapping("/ranking")
    public Ranking addRanking(@RequestBody Ranking ranking) {
        Ranking savedRanking = rankingRepository.save(ranking);
        return savedRanking;
    }
}
