package com.sgtu.tester.api;

import com.sgtu.tester.common.mvc.repository.GroupRepository;
import com.sgtu.tester.dto.GroupWithStudentsDto;
import com.sgtu.tester.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/groups")
@RequiredArgsConstructor
public class GroupController {
    private final GroupRepository groupRepository;

    @GetMapping("/with-students")
    public ResponseEntity<List<GroupWithStudentsDto>> getGroupsWithStudents() {
        return ResponseEntity.ok(getAllGroupsWithStudents());
    }

    public List<GroupWithStudentsDto> getAllGroupsWithStudents() {
        return groupRepository.findAll().stream().map(group -> {
            GroupWithStudentsDto dto = new GroupWithStudentsDto();
            dto.setId(group.getId());
            dto.setName(group.getName());
            dto.setCode(group.getCode());
            dto.setCourse(group.getCourse());

            List<UserDto> users = group.getStudents().stream()
                    .map(link -> {
                        UserDto userDto = new UserDto();
                        userDto.setId(link.getUser().getId());
                        userDto.setName(link.getUser().getName());
                        userDto.setSurname(link.getUser().getSurname());
                        userDto.setEmail(link.getUser().getEmail());
                        return userDto;
                    })
                    .toList();

            dto.setStudents(users);
            return dto;
        }).toList();
    }
}
