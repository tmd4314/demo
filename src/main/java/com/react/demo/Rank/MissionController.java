package com.react.demo.Rank;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class MissionController {

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private MissionService missionService;

    // 모든 미션 목록 조회
    @GetMapping("/mission")
    public ResponseEntity<List<Mission>> getAllMissions() {
        List<Mission> missions = missionRepository.findAll();
        return ResponseEntity.ok(missions);
    }

    @GetMapping("/mission/{missionId}")
    public ResponseEntity<?> getMissionById(@PathVariable Long missionId) {
        Mission mission = missionRepository.findById(missionId)
                .orElse(null); // orElse(null)을 사용하여 값이 없을 때 null 반환
        if (mission != null) {
            return ResponseEntity.ok(mission); // 200 OK와 함께 Mission 객체 반환
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mission not found"); // 404 Not Found 반환
        }
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
        String userid = payload.get("userid").toString();
        String startPassword = payload.get("startPassword").toString();
        String response = missionService.startMission(missionId, userid, startPassword);
        return ResponseEntity.ok(response);
    }

    // 미션 완료하기
    @PostMapping("/mission/{missionId}/complete")
    public ResponseEntity<String> completeMission(@PathVariable Long missionId, @RequestBody Map<String, Object> payload) {
        String userid = payload.get("userid").toString();
        String endPassword = payload.get("endPassword").toString();
        String response = missionService.completeMission(missionId,userid,endPassword);
        return ResponseEntity.ok(response);
    }
}
