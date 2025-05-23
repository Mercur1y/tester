package com.sgtu.tester.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestGenerateDto {
    private String name;
    private LocalDateTime deadline;
    private Long groupId;
    private Long patternId;
}
