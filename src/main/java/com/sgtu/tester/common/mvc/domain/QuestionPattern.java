package com.sgtu.tester.common.mvc.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionPattern {

    @Id
    @GeneratedValue
    private Long id;

    private Integer typeId;

    @Lob
    private String formula;

    @Lob
    private String question;

    @ElementCollection
    private HashMap<String, Integer> options;

    @OneToMany(mappedBy = "questionPattern", cascade = CascadeType.ALL)
    private List<VariableInfo> variables;

    @ManyToMany(mappedBy = "questions")
    private Set<TestPattern> testPatterns = new HashSet<>();
}
