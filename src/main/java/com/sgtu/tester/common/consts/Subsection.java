package com.sgtu.tester.common.consts;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Subsection {
    ALGEBRA_GROUP_SIMILAR("11", "Группировать подобные члены"),
    ALGEBRA_FIND_VARIABLE("12", "Найти переменную"),
    ALGEBRA_MULTIPLIER("13", "Множитель"),
    ALGEBRA_DECOMPOSE("14", "Разложить"),
    ALGEBRA_FRACTION_CALCULATIONS("15", "Вычисления с дробями"),
    ALGEBRA_LINEAR_EQUATIONS("16", "Линейные уравнения"),
    ALGEBRA_QUADRATIC_EQUATIONS("17", "Квадратные уравнения"),
    ALGEBRA_INEQUALITIES("18", "Неравенства"),
    ALGEBRA_SYSTEM_OF_EQUATIONS("19", "Системы уравнений"),
    ALGEBRA_MATRICES("110", "Матрицы"),

    TRIGONOMETRY_SIMPLIFY_EQUATION("21", "Сократить уравнение"),
    TRIGONOMETRY_FIND_NUMERICAL_VALUE("22", "Найти численное значение"),
    TRIGONOMETRY_GRAPHS("23", "Графики"),
    TRIGONOMETRY_SOLVE_EQUATIONS("24", "Решить уравнения"),

    CALCULUS_DERIVATIVES("31", "Производные"),
    CALCULUS_INTEGRALS("32", "Интегралы"),
    CALCULUS_LIMITS("33", "Пределы функции");

    private final String id;
    private final String name;

    public static Subsection fromId(String id) {
        for (Subsection subsection : values()) {
            if (subsection.id.equals(id)) {
                return subsection;
            }
        }
        throw new IllegalArgumentException("No subsection with id " + id);
    }
}
