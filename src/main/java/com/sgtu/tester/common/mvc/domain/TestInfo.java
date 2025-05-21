package com.sgtu.tester.common.mvc.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestInfo {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private LocalDateTime createDate;

    private LocalDateTime deadline;

    private Long groupId;

    private Long userId;

    @OneToMany(mappedBy = "testInfo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentTestInfo> studentTests = new ArrayList<>();
}
