package com.sgtu.tester.common.mvc.service;

import com.sgtu.tester.common.mvc.DefaultService;
import com.sgtu.tester.common.mvc.domain.OwnEquation;
import com.sgtu.tester.common.mvc.repository.OwnEquationRepository;
import org.springframework.stereotype.Service;

@Service
public class OwnEquationService extends DefaultService<OwnEquation, OwnEquationRepository> {

    public OwnEquationService(OwnEquationRepository repository) {
        super(repository);
    }
}
