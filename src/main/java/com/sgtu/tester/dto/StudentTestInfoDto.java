package com.sgtu.tester.dto;

import lombok.Data;

@Data
public class StudentTestInfoDto {
    private String name;
    private String surname;
    private boolean isFinished;
    private Integer rate;
}
