package com.sgtu.tester.common.mvc.repository;

import com.sgtu.tester.common.mvc.domain.FormulaPattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface FormulaPatternRepository extends JpaRepository<FormulaPattern, Long> {
    List<FormulaPattern> findAllBySectionId(Long sectionId);
    List<FormulaPattern> findAllByIdIn(Set<Long> ids);
}
