package com.sgtu.tester.security.repository;

import java.util.Optional;

import com.sgtu.tester.security.model.ERole;
import com.sgtu.tester.security.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
