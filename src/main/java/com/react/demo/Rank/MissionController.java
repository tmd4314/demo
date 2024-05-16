package com.react.demo.Rank;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class MissionController {

    private static final Logger logger = LoggerFactory.getLogger(MissionController.class);

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private MissionService missionService;

    // 모든 미션 목록 조회
    @GetMapping("/mission")
    public List<Mission> getAllMissions() {
        logger.info("GET /user/mission called");
        List<Mission> mission = missionRepository.findAll();
        return mission;
    }

    @GetMapping("/mission/{missionId}")
    public Mission getMissionById(@PathVariable Long missionId) {
        logger.info("GET /user/mission/{} called", missionId);
        return missionRepository.findById(missionId)
                .orElseThrow(() -> new RuntimeException("Mission not found"));
    }

    @GetMapping("/mission/{missionId}/startpassword")
    public ResponseEntity<String> getStartPassword(@PathVariable Long missionId) {
        String startPassword = missionRepository.getStartPasswordFromDB(missionId);
        return ResponseEntity.ok(startPassword);
    }

    @GetMapping("/mission/{missionId}/endpassword")
    public ResponseEntity<String> getEndPassword(@PathVariable Long missionId) {
        String endPassword = missionRepository.getEndPasswordFromDB(missionId);
        return ResponseEntity.ok(endPassword);
    }


    // 미션 시작하기
    @PostMapping("/mission/{missionId}/start")
    public ResponseEntity<String> startMission(@PathVariable Long missionId, @RequestBody Map<String, Object> payload) {
        logger.info("POST /user/mission/{}/start called with payload: {}", missionId, payload);
        Long userId = Long.valueOf(payload.get("userId").toString());
        String startPassword = payload.get("startPassword").toString();
        String response = missionService.startMission(missionId, userId, startPassword);
        return ResponseEntity.ok(response);
    }

    // 미션 완료하기
    @PostMapping("/mission/{missionId}/complete")
    public ResponseEntity<String> completeMission(@PathVariable Long missionId, @RequestBody Map<String, Object> payload) {
        logger.info("POST /user/mission/{}/complete called with payload: {}", missionId, payload);
        Long userId = Long.valueOf(payload.get("userId").toString());
        String endPassword = payload.get("endPassword").toString();
        String response = missionService.completeMission(missionId, userId, endPassword);
        return ResponseEntity.ok(response);
    }
}
