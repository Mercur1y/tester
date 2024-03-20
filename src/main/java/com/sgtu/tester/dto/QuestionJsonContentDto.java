package com.sgtu.tester.dto;

import com.sgtu.tester.common.mvc.domain.QuestionPattern;
import com.sgtu.tester.common.mvc.domain.VariableInfo;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Data
public class QuestionJsonContentDto {
    private Integer number;
    private Integer typeId;
    private String formula;
    private String question;
    private HashMap<String, Integer> options;

    private List<VariableInfo> variables;

    public QuestionJsonContentDto(QuestionPattern questionPattern) {
        this.typeId = questionPattern.getTypeId();
        this.formula = questionPattern.getFormula();
        this.question = questionPattern.getQuestion();
        this.options = questionPattern.getOptions();
    }
}
