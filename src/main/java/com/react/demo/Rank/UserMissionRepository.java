package com.react.demo.Rank;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserMissionRepository extends JpaRepository<UserMission, Long> {
    List<UserMission> findByUserIdAndMissionIdAndEarnedPoints(String userId, String missionId, int earnedPoints);
}