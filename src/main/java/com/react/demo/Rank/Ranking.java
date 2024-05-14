package com.react.demo.Rank;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "ranking") // 테이블 이름을 복수형으로 변경
public class Ranking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long no;

    private String userId;

    private Long missionId; // MissionId를 missionId로 변경하고 숫자형으로 수정

    private int totalPoint; // totalPoint를 숫자형으로 변경
}
