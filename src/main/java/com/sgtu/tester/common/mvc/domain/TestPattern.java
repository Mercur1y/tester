package com.sgtu.tester.common.mvc.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Calendar;
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

    private Calendar createDate;

    private Calendar updateDate;

    @ManyToMany (fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "test_questions",
            joinColumns = @JoinColumn(name = "test_id"),
            inverseJoinColumns = @JoinColumn(name = "question_id")
    )
    private Set<QuestionPattern> questions = new HashSet<>();

    private Long categoryId;

    private Long userId;
}
