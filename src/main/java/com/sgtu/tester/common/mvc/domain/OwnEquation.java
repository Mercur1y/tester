package com.sgtu.tester.common.mvc.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class OwnEquation extends Equation {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "user_id")
    private Long userId;
}
