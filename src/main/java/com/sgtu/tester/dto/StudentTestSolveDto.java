package com.sgtu.tester.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class StudentTestSolveDto {
    private Long id;
    private String testName;
    private List<Map<String, Object>> content;
}
