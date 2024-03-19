package com.sgtu.tester.common.mvc;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface DefaultRepository<E extends DefaultEntity> extends JpaRepository<E, Long> {
}
