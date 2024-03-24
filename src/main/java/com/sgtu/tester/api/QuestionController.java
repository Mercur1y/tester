package com.sgtu.tester.api;

import com.sgtu.tester.common.mvc.DefaultController;
import com.sgtu.tester.common.mvc.domain.QuestionPattern;
import com.sgtu.tester.common.mvc.service.QuestionPatternService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/v1/question")
public class QuestionController extends DefaultController<QuestionPattern, QuestionPatternService> {

    @Autowired
    public QuestionController(QuestionPatternService service) {
        super(service);
    }
}
