package com.sgtu.tester.dto;

import lombok.Data;

import java.util.List;

@Data
public class EquationResponsePayload {
    private Long testId;
    private List<EquationItem> formulas;

    @Data
    public static class EquationItem {
        private String formula;
        private String rightAnswer;
    }
}
