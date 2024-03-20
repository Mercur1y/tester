package com.sgtu.tester.common.mvc.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class VariableInfo {
    @Id
    @GeneratedValue
    private Long id;
    private String name;

    private BigDecimal startValue;
    private BigDecimal endValue;
    private int precision;

    @ManyToOne
    @JoinColumn(name = "question_pattern_id")
    private QuestionPattern questionPattern;

}
