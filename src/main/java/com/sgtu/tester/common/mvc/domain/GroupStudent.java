package com.sgtu.tester.common.mvc.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sgtu.tester.security.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupStudent {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "group_id")
    private Group group;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

