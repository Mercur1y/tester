package com.sgtu.tester.common.mvc.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum QuestionType {
    SIMPLIFICATION(1, "Упрощение выражения"),
    COMPUTATION(2, "Вычисление значения"),
    TESTING(3, "Тестирование");

    private final int id;
    private final String name;
}
