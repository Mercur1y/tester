package com.sgtu.tester.common.mvc.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestInfo {

    @Id
    @GeneratedValue
    private Long id;

    @Lob
    private String content;

    private Integer rate;

    private LocalDateTime createDate;

    private LocalDateTime deadline;

    private boolean isFinished;

    private Long sectionId;

    private Long userId;
}
