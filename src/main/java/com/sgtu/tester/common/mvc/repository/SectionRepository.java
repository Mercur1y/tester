package com.sgtu.tester.common.mvc.repository;

import com.sgtu.tester.common.mvc.domain.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionRepository extends JpaRepository<Section, Long> {
}
