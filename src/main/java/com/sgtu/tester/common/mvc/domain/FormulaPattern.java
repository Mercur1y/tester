package com.sgtu.tester.common.mvc.domain;

import com.sgtu.tester.util.ParametersConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class FormulaPattern {
    @Id
    @GeneratedValue
    private Long id;

    private Integer divisionId;

    private Long sectionId;

    @Lob
    private String formula;

    @Lob
    @Convert(converter = ParametersConverter.class)
    private Map<String, Object> parameters;

    private LocalDateTime createdAt;

    @ManyToMany(mappedBy = "formulas")
    private Set<TestPattern> testPatterns = new HashSet<>();
}
