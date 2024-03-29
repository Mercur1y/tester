package com.sgtu.tester.common.mvc.service;

import com.sgtu.tester.common.mvc.DefaultService;
import com.sgtu.tester.common.mvc.domain.QuestionPattern;
import com.sgtu.tester.common.mvc.repository.QuestionPatternRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionPatternService extends DefaultService<QuestionPattern, QuestionPatternRepository> {

    public QuestionPatternService(QuestionPatternRepository repository) {
        super(repository);
    }

}
