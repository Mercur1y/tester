package com.sgtu.tester.dto;

import lombok.Data;

import java.util.List;

@Data
public class GroupWithStudentsDto {
    private Long id;
    private String name;
    private String code;
    private Integer course;
    private List<UserDto> students;
}
