package com.sgtu.tester.common.mvc.repository;

import com.sgtu.tester.common.mvc.domain.OwnEquation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnEquationRepository extends JpaRepository<OwnEquation, Long> {
}
