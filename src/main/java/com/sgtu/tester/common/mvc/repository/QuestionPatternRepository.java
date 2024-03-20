package com.sgtu.tester.common.mvc.repository;

import com.sgtu.tester.common.mvc.domain.QuestionPattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionPatternRepository extends JpaRepository<QuestionPattern, Long> {
    List<QuestionPattern> findByTypeId(Integer typeId);
}
