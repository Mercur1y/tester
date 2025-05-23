package com.sgtu.tester.common.mvc.repository;

import com.sgtu.tester.common.mvc.domain.GroupStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupStudentRepository extends JpaRepository<GroupStudent, Long> {
    List<GroupStudent> findAllByGroup_Id(Long groupId);
}
