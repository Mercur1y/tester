package com.sgtu.tester.common.mvc.service;

import com.sgtu.tester.common.mvc.DefaultService;
import com.sgtu.tester.common.mvc.domain.TestPattern;
import com.sgtu.tester.common.mvc.repository.TestPatternRepository;
import org.springframework.stereotype.Service;

@Service
public class TestPatternService extends DefaultService<TestPattern, TestPatternRepository> {

    public TestPatternService(TestPatternRepository repository) {
        super(repository);
    }
}
