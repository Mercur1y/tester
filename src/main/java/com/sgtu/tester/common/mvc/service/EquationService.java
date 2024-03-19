package com.sgtu.tester.common.mvc.service;

import com.sgtu.tester.common.mvc.DefaultService;
import com.sgtu.tester.common.mvc.domain.Equation;
import com.sgtu.tester.common.mvc.repository.EquationRepository;
import org.springframework.stereotype.Service;

@Service
public class EquationService extends DefaultService<Equation, EquationRepository> {

    public EquationService(EquationRepository repository) {
        super(repository);
    }
}
