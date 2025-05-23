package com.sgtu.tester.common.mvc.repository;

import com.sgtu.tester.common.mvc.domain.StudentTestInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentTestInfoRepository extends JpaRepository<StudentTestInfo, Long> {
    List<StudentTestInfo> findAllByUserId(String userId);
}
