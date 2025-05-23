package com.sgtu.tester.common.mvc.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Group {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String code;

    private Integer course;

    @OneToMany(mappedBy = "group")
    @JsonManagedReference
    private List<GroupStudent> students = new ArrayList<>();

    @OneToMany(mappedBy = "group")
    @JsonManagedReference
    private List<GroupTeacher> teachers = new ArrayList<>();
}
