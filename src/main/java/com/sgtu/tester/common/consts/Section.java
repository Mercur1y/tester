package com.sgtu.tester.common.consts;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public enum Section {
    ALGEBRA("1", "Алгебра", EnumSet.of(
            Subsection.ALGEBRA_GROUP_SIMILAR,
            Subsection.ALGEBRA_FIND_VARIABLE,
            Subsection.ALGEBRA_MULTIPLIER,
            Subsection.ALGEBRA_DECOMPOSE,
            Subsection.ALGEBRA_FRACTION_CALCULATIONS,
            Subsection.ALGEBRA_LINEAR_EQUATIONS,
            Subsection.ALGEBRA_QUADRATIC_EQUATIONS,
            Subsection.ALGEBRA_INEQUALITIES,
            Subsection.ALGEBRA_SYSTEM_OF_EQUATIONS,
            Subsection.ALGEBRA_MATRICES
    )),
    TRIGONOMETRY("2", "Тригонометрия", EnumSet.of(
            Subsection.TRIGONOMETRY_SIMPLIFY_EQUATION,
            Subsection.TRIGONOMETRY_FIND_NUMERICAL_VALUE,
            Subsection.TRIGONOMETRY_GRAPHS,
            Subsection.TRIGONOMETRY_SOLVE_EQUATIONS
    )),
    CALCULUS("3", "Математический анализ", EnumSet.of(
            Subsection.CALCULUS_DERIVATIVES,
            Subsection.CALCULUS_INTEGRALS,
            Subsection.CALCULUS_LIMITS
    ));

    private final String id;
    private final String name;
    private final EnumSet<Subsection> subsections;
    private static final Map<String, Section> SECTIONS_BY_ID = new HashMap<>();

    static {
        for (Section section : values()) {
            SECTIONS_BY_ID.put(section.id, section);
        }
    }

    public static Section fromId(String id) {
        Section section = SECTIONS_BY_ID.get(id);
        if (section == null) {
            throw new IllegalArgumentException("No section with id " + id);
        }
        return section;
    }
}
