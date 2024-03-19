package com.sgtu.tester.dto;

import com.sgtu.tester.common.mvc.domain.QuestionPattern;
import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class FormulaQuestionDto extends QuestionJsonContentDto {
    private String formula;

    public FormulaQuestionDto(QuestionPattern questionPattern) {
    }
}
