package com.react.demo.Rank;

import com.react.demo.User.User;
import com.react.demo.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MissionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private UserMissionRepository userMissionRepository;

    @Autowired
    private RankingRepository rankingRepository;

    @Transactional
    public String startMission(Long missionId, String userid, String startPassword) {
        User user = userRepository.findByUserid(String.valueOf(userid)).orElseThrow(() -> new RuntimeException("User not found"));
        Mission mission = missionRepository.findById(missionId).orElseThrow(() -> new RuntimeException("Mission not found"));

        if (!mission.getStartPassword().equals(startPassword)) {
            throw new RuntimeException("Invalid start password");
        }

        UserMission userMission = new UserMission();
        userMission.setUserId(user.getUserid());
        userMission.setMissionId(mission.getId().toString());
        userMission.setEarnedPoints(0); // 미션 시작 시 점수는 0
        userMissionRepository.save(userMission);

        return "Mission started";
    }

    @Transactional
    public String completeMission(Long missionId, String userid, String endPassword) {
        // 사용자와 미션 조회
        User user = userRepository.findByUserid(userid)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new RuntimeException("Mission not found"));
        if (!mission.getEndPassword().equals(endPassword)) {
            throw new RuntimeException("Invalid end password");
        }

        // 사용자 미션 조회
        List<UserMission> userMissions = userMissionRepository.findByUserIdAndMissionIdAndEarnedPoints(user.getUserid(), mission.getId().toString(), 0);

        // 미션 완료 처리
        if (userMissions.isEmpty()) {
            throw new RuntimeException("Mission not started");
        } else {
            int points = Integer.parseInt(mission.getPoint());
            for (UserMission userMission : userMissions) {
                userMission.setEarnedPoints(points);
                userMissionRepository.save(userMission);
                updateRanking(userMission.getUserId(), points);
            }
        }

        return "Mission completed with " + mission.getPoint() + " points";
    }


    private void updateRanking(String userId, int points) {
        Ranking ranking = rankingRepository.findByUserId(userId).orElse(new Ranking());
        ranking.setUserId(userId);
        ranking.setTotalPoint(ranking.getTotalPoint() + points);
        ranking = rankingRepository.save(ranking); // 엔티티를 저장하고 반환된 엔티티를 사용

        // 순위를 다시 계산하고 저장할 필요가 없음
    }

}
