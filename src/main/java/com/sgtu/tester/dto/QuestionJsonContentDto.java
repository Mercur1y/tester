package com.sgtu.tester.dto;

import com.sgtu.tester.common.mvc.domain.QuestionPattern;
import lombok.Data;

@Data
public class QuestionJsonContentDto {
    private Integer number;
    private Integer typeId;
    private String question;

    public QuestionJsonContentDto(QuestionPattern questionPattern) {
        this.typeId = questionPattern.getTypeId();
        this.question = questionPattern.getQuestion();
    }
}
