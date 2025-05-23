package com.sgtu.tester.common.mvc.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestPattern {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;

    @ManyToMany (fetch = FetchType.LAZY)
    @JoinTable(name = "test_questions",
            joinColumns = @JoinColumn(name = "test_id"),
            inverseJoinColumns = @JoinColumn(name = "question_id")
    )
    private Set<QuestionPattern> questions = new HashSet<>();

    @ManyToMany (fetch = FetchType.LAZY)
    @JoinTable(name = "test_formulas",
            joinColumns = @JoinColumn(name = "test_id"),
            inverseJoinColumns = @JoinColumn(name = "formula_id")
    )
    private Set<FormulaPattern> formulas = new HashSet<>();

    private Long sectionId;

    private Long userId;
}
