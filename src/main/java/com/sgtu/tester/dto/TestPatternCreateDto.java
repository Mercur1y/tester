package com.sgtu.tester.dto;

import lombok.Data;

import java.util.Set;

@Data
public class TestPatternCreateDto {
    private String name;
    private Long sectionId;
    private Set<Long> formulaIds;
}
