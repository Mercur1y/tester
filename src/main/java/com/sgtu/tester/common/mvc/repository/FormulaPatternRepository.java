package com.sgtu.tester.common.mvc.repository;

import com.sgtu.tester.common.mvc.domain.FormulaPattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormulaPatternRepository extends JpaRepository<FormulaPattern, Long> {
}
