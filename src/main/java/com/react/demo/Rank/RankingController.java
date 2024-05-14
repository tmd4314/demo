package com.react.demo.Rank;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class RankingController {

    private static final Logger logger = LoggerFactory.getLogger(RankingController.class);

    @Autowired
    private RankingRepository rankingRepository;

    // 모든 순위 목록 조회
    @GetMapping("/rank")
    public List<Ranking> getAllRanking() {
        logger.info("GET /user/rank called");
        List<Ranking> ranking = rankingRepository.findAll();
        return ranking;
    }

    // 새로운 순위 추가
    @PostMapping("/rank")
    public Ranking addRanking(@RequestBody Ranking ranking) {
        logger.info("POST /user/rank called with ranking: {}", ranking);
        Ranking savedRanking = rankingRepository.save(ranking);
        return savedRanking;
    }
}
