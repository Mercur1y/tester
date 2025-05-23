package com.sgtu.tester.common.consts;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.sgtu.tester.rabbit.RabbitConfig.*;

@Getter
@RequiredArgsConstructor
public enum Subsection {
    // Алгебра
    ALGEBRA_GROUP_SIMILAR(11L, "Группировать подобные члены", null),
    ALGEBRA_FIND_VARIABLE(12L, "Найти переменную", null),
    ALGEBRA_MULTIPLIER(13L, "Множитель", null),
    ALGEBRA_DECOMPOSE(14L, "Разложить", null),
    ALGEBRA_FRACTION_CALCULATIONS(15L, "Вычисления с дробями", null),
    ALGEBRA_LINEAR_EQUATIONS(16L, "Линейные уравнения", null),
    ALGEBRA_QUADRATIC_EQUATIONS(17L, "Квадратные уравнения", null),
    ALGEBRA_INEQUALITIES(18L, "Неравенства", null),
    ALGEBRA_SYSTEM_OF_EQUATIONS(19L, "Системы уравнений", null),
    ALGEBRA_MATRICES(110L, "Матрицы", null),

    // Тригонометрия
    TRIGONOMETRY_SIMPLIFY_EQUATION(21L, "Сократить уравнение", ROUTING_KEY_SIMPLIFICATION_REQUEST),
    TRIGONOMETRY_FIND_NUMERICAL_VALUE(22L, "Найти численное значение", null),
    TRIGONOMETRY_GRAPHS(23L, "Графики", null),
    TRIGONOMETRY_SOLVE_EQUATIONS(24L, "Решить уравнения", null),

    // Математический анализ
    CALCULUS_DERIVATIVES(31L, "Производные", ROUTING_KEY_EQUATION_DIFFERENTIAL_REQUEST),
    CALCULUS_INTEGRALS(32L, "Интегралы", ROUTING_KEY_EQUATION_INTEGRAL_REQUEST),
    CALCULUS_LIMITS(33L, "Пределы функции", null);

    private final Long id;
    private final String title;
    private final String routingKey;

    private static final Map<Long, Subsection> BY_ID = new HashMap<>();

    static {
        for (Subsection s : values()) {
            BY_ID.put(s.id, s);
        }
    }

    public static Optional<Subsection> fromId(Long id) {
        return Optional.ofNullable(BY_ID.get(id));
    }
}

