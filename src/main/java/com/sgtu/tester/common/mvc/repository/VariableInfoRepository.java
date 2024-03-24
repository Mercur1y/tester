package com.sgtu.tester.common.mvc.repository;

import com.sgtu.tester.common.mvc.domain.VariableInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VariableInfoRepository extends JpaRepository<VariableInfo, Long> {
}
