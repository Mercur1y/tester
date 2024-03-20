package com.sgtu.tester.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sgtu.tester.common.mvc.domain.QuestionType;
import com.sgtu.tester.common.mvc.domain.TestPattern;
import com.sgtu.tester.common.mvc.domain.VariableInfo;
import com.sgtu.tester.dto.QuestionJsonContentDto;
import com.sgtu.tester.dto.TestJsonContentDto;
import com.sgtu.tester.util.DtoConverterUtil;
import com.sgtu.tester.util.JsonConverter;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class TestCreationProcessingService {

    public String getContent(TestPattern testPattern) throws JsonProcessingException {
        return JsonConverter.toJson(getReplacedTestDto(testPattern));
    }

    public TestJsonContentDto getReplacedTestDto(TestPattern testPattern) {
        TestJsonContentDto testDto = DtoConverterUtil.mapToTestJsonContentDto(testPattern);

        for (QuestionJsonContentDto question : testDto.getQuestions()) {
            if (question.getTypeId() != QuestionType.TESTING.getId()) {
                question.setFormula(replaceVariables(question.getFormula(), generateVariables(question.getVariables())));
            }
        }

        return testDto;

    }

    private String replaceVariables(String formula, Map<String, String> variables) {
        for (Map.Entry<String, String> entry : variables.entrySet()) {
            String variable = entry.getKey();
            String value = entry.getValue();
            formula = formula.replaceAll("\\{" + variable + "}", value);
        }
        return formula;
    }

    private Map<String, String> generateVariables(List<VariableInfo> variables) {
        Map<String, String> generatedVariables = new HashMap<>();
        Random random = new Random();

        for (VariableInfo variableInfo : variables) {
            double range = variableInfo.getEndValue().subtract(variableInfo.getStartValue()).doubleValue();
            double value = variableInfo.getStartValue().doubleValue() + range * random.nextDouble();
            String formattedValue = formatValue(value, variableInfo.getPrecision());
            generatedVariables.put(variableInfo.getName(), formattedValue);
        }

        return generatedVariables;
    }

    private String formatValue(double value, int precision) {
        if (precision == 0) {
            return Integer.toString((int) Math.round(value));
        } else {
            return BigDecimal.valueOf(value)
                    .setScale(precision, RoundingMode.HALF_UP)
                    .toString();
        }
    }

}
