package com.react.demo.Rank;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class MissionController {

    private static final Logger logger = LoggerFactory.getLogger(MissionController.class);

    @Autowired
    private MissionRepository missionRepository;

    // 모든 미션 목록 조회
    @GetMapping("/mission")
    public List<Mission> getAllMissions() {
        logger.info("GET /user/mission called");
        List<Mission> missions = missionRepository.findAll();
        return missions;
    }

    // 새로운 미션 추가
    @PostMapping("/mission")
    public Mission addMission(@RequestBody Mission mission) {
        logger.info("POST /user/mission called with mission: {}", mission);
        Mission savedMission = missionRepository.save(mission);
        logger.info("Mission saved with ID {}", savedMission.getId());
        return savedMission;
    }
}
