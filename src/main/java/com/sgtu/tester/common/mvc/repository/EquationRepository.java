package com.sgtu.tester.common.mvc.repository;

import com.sgtu.tester.common.mvc.domain.Equation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquationRepository extends JpaRepository<Equation, Long> {
}
