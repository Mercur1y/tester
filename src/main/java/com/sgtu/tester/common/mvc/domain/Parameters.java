package com.sgtu.tester.common.mvc.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Parameters {
    private Map<String, ParameterDetail> parameters;

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ParameterDetail {
        private double min;
        private double max;
        private int round;
        private List<Double> values;
    }
}
