package com.sgtu.tester.common.mvc.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Equation {

    @Id
    @GeneratedValue
    private Long id;

    @Lob
    private String content;

    private String sampleSolution;

    private String guid;
    
    private Long categoryId;
    
    private Long sectionId;

    private Long userId;
}
