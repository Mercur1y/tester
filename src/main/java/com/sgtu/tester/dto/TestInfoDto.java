package com.sgtu.tester.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TestInfoDto {
    private Long id;
    private String name;
    private LocalDateTime createDate;
    private LocalDateTime deadline;
    private String groupCode;
    private String groupName;
    private List<StudentTestInfoDto> students;
}
