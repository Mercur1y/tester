package com.sgtu.tester.dto;

import lombok.Data;

@Data
public abstract class QuestionJsonContentDto {
    private Integer number;
    private boolean isText;
    private String correctAnswer;
}
