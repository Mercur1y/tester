package com.sgtu.tester.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StudentTestListDto {
    private Long studentTestId;
    private String testName;
    private String content;
    private Integer rate;
    private LocalDateTime deadline;
    private String teacherName;
    private String teacherSurname;
    private boolean isFinished;
}
