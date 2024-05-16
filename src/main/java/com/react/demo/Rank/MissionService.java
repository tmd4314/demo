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
    public String startMission(Long missionId, Long userid, String startPassword) {
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
    public String completeMission(Long missionId, Long userid, String endPassword) {
        User user = userRepository.findByUserid(String.valueOf(userid)).orElseThrow(() -> new RuntimeException("User not found"));
        Mission mission = missionRepository.findById(missionId).orElseThrow(() -> new RuntimeException("Mission not found"));

        UserMission userMission = userMissionRepository.findByUserIdAndMissionId(user.getUserid(), mission.getId().toString())
                .orElseThrow(() -> new RuntimeException("Mission not started"));

        if (!mission.getEndPassword().equals(endPassword)) {
            throw new RuntimeException("Invalid end password");
        }

        int points = Integer.parseInt(mission.getPoint());
        userMission.setEarnedPoints(points);
        userMissionRepository.save(userMission);

        updateRanking(user.getUserid(), points);

        return "Mission completed with " + points + " points";
    }

    private void updateRanking(String userId, int points) {
        Ranking ranking = rankingRepository.findByUserId(userId).orElse(new Ranking());
        ranking.setUserId(userId);
        ranking.setTotalPoint(ranking.getTotalPoint() + points);
        rankingRepository.save(ranking);

        List<Ranking> allRankings = rankingRepository.findAllByOrderByTotalPointDesc();

        int rank = 1;
        for (Ranking r : allRankings) {
            r.setNo((long) rank++);
            rankingRepository.save(r);
        }
    }
}
