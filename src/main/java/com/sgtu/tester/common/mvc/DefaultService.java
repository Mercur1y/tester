package com.sgtu.tester.common.mvc;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public abstract class DefaultService<E, R extends JpaRepository<E, Long>> {

    protected final R repository;

    public DefaultService(R repository) {
        this.repository = repository;
    }

    public Optional<E> save(E entity) {
        return Optional.of(repository.save(entity));
    }

    public Optional<E> findById(Long id) {
        return repository.findById(id);
    }

    public List<E> findAll() {
        return repository.findAll();
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
