package com.sgtu.tester.dto;

import com.sgtu.tester.common.mvc.domain.QuestionPattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class TextQuestionDto extends QuestionJsonContentDto {
    private String question;
    private HashMap<String, Integer> options;

    public TextQuestionDto(QuestionPattern questionPattern) {
    }
}
