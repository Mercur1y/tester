package com.sgtu.tester.common.mvc.repository;

import com.sgtu.tester.common.mvc.domain.TestPattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestPatternRepository extends JpaRepository<TestPattern, Long> {
}
