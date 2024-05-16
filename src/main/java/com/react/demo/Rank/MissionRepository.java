package com.react.demo.Rank;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MissionRepository extends JpaRepository<Mission, Long> {
    @Query("SELECT m.startPassword FROM Mission m WHERE m.id = :missionId")
    String getStartPasswordFromDB(@Param("missionId") Long missionId);

    @Query("SELECT m.endPassword FROM Mission m WHERE m.id = :missionId")
    String getEndPasswordFromDB(@Param("missionId") Long missionId);
}