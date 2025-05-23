package com.sgtu.tester.common.mvc.repository;

import com.sgtu.tester.common.mvc.domain.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
}
