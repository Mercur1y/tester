package com.sgtu.tester.common.mvc.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentTestInfo {

    @Id
    @GeneratedValue
    private Long id;

    @Lob
    private String content;

    private Integer rate;

    private boolean isFinished  = false;

    private String userId;

    @ManyToOne
    @JoinColumn(name = "test_info_id", nullable = false)
    private TestInfo testInfo;
}
