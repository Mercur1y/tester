package com.sgtu.tester.common.mvc.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionPattern {

    @Id
    @GeneratedValue
    private Long id;

    private boolean isText;

    @Lob
    private String formula;

    @Lob
    private String question;

    @ElementCollection
    private HashMap<String, Integer> options;

    private String correctAnswer;

    @ManyToMany(mappedBy = "questions")
    private Set<TestPattern> testPatterns = new HashSet<>();
}
