package com.sgtu.tester.common.mvc.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Calendar;

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

    private Calendar createDate;

    private Calendar deadline;

    private boolean isFinished;

    private Long categoryId;

    private Long userId;
}
