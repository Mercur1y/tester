package com.sgtu.tester.common.mvc.repository;

import com.sgtu.tester.common.mvc.domain.TestInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestInfoRepository extends JpaRepository<TestInfo, Long> {
}
