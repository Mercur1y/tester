package com.sgtu.tester.common.mvc.repository;

import com.sgtu.tester.common.mvc.domain.StudentTestInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentTestInfoRepository extends JpaRepository<StudentTestInfo, Long> {
}
