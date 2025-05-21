package com.sgtu.tester.common.mvc;

import com.sgtu.tester.common.exception.DefaultException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

public abstract class DefaultController<E, S extends DefaultService<E, ? extends JpaRepository<E, Long>>> {

    private final S service;

    protected S getService() {
        return service;
    }

    public DefaultController(S service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<E> save(@RequestBody E entity) {
        return service.save(entity)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new DefaultException(
                        String.format("Failed to save entity: %s", entity.toString())
                ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<E> getById(@PathVariable Long id) {
        Optional<E> entity = service.findById(id);
        return entity.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<E>> getAll() {
        List<E> entities = service.findAll();
        return new ResponseEntity<>(entities, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
