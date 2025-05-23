package com.sgtu.tester.common.mvc.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class FormulaValueGenerator {

    private static final Random RANDOM = new Random();

    @SuppressWarnings("unchecked")
    public static Map<String, String> generateValues(Map<String, Object> parameters) {
        Map<String, String> result = new HashMap<>();

        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            String var = entry.getKey();
            Map<String, Object> config = (Map<String, Object>) entry.getValue();

            List<String> values = (List<String>) config.get("values");
            if (values != null && !values.isEmpty()) {
                result.put(var, values.get(RANDOM.nextInt(values.size())));
            } else {
                Number min = toNumber(config.get("min"), -100);
                Number max = toNumber(config.get("max"), 100);
                int round = toInt(config.get("round"));
                double random = min.doubleValue() + (max.doubleValue() - min.doubleValue()) * RANDOM.nextDouble();
                BigDecimal rounded = new BigDecimal(random).setScale(round, RoundingMode.HALF_UP);
                result.put(var, rounded.toPlainString());
            }
        }

        return result;
    }

    public static String substituteFormula(String formula, Map<String, String> values) {
        String result = formula;
        for (Map.Entry<String, String> entry : values.entrySet()) {
            result = result.replaceAll("#" + entry.getKey(), entry.getValue());
        }
        return result;
    }

    private static Number toNumber(Object val, Number def) {
        if (val == null) return def;
        try { return Double.parseDouble(val.toString()); } catch (Exception e) { return def; }
    }

    private static int toInt(Object val) {
        if (val == null) return 0;
        try { return Integer.parseInt(val.toString()); } catch (Exception e) { return 0; }
    }
}
