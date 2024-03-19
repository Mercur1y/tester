package com.sgtu.tester.common.mvc.service;

import com.sgtu.tester.common.mvc.DefaultService;
import com.sgtu.tester.common.mvc.domain.QuestionPattern;
import com.sgtu.tester.common.mvc.repository.QuestionPatternRepository;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;

@Service
public class QuestionPatternService extends DefaultService<QuestionPattern, QuestionPatternRepository> {

    public QuestionPatternService(QuestionPatternRepository repository) {
        super(repository);
    }

    public QuestionPattern createTextQuestion(String question, HashMap<String, Integer> options, String correctAnswer) {
        QuestionPattern questionPattern = new QuestionPattern();
        questionPattern.setText(true);
        questionPattern.setQuestion(question);
        questionPattern.setOptions(options);
        questionPattern.setCorrectAnswer(correctAnswer);
        return repository.save(questionPattern);
    }

    public QuestionPattern createFormulaTask(String formula) {
        QuestionPattern questionPattern = new QuestionPattern();
        questionPattern.setText(false);
        questionPattern.setFormula(formula);
        return repository.save(questionPattern);
    }

}
