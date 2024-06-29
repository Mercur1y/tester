package com.sgtu.tester.common.consts;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum QuestionType {
    FORMULA(1, "Выражение"),
    TESTING(3, "Тест");

    private final int id;
    private final String name;
}
