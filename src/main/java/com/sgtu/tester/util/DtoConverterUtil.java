package com.sgtu.tester.util;

import com.sgtu.tester.common.mvc.domain.QuestionPattern;
import com.sgtu.tester.common.mvc.domain.TestPattern;
import com.sgtu.tester.dto.QuestionJsonContentDto;
import com.sgtu.tester.dto.TestJsonContentDto;

import java.util.Comparator;
import java.util.List;

public class DtoConverterUtil {

    public static TestJsonContentDto mapToTestJsonContentDto(TestPattern testPattern) {
        TestJsonContentDto contentDto = new TestJsonContentDto();
        contentDto.setName(testPattern.getName());

        List<QuestionJsonContentDto> questions = testPattern.getQuestions().stream()
                .map(DtoConverterUtil::mapToQuestionJsonContentDto).toList();

        int questionNumber = 1;
        for (QuestionJsonContentDto question : questions) {
            question.setNumber(questionNumber++);
            contentDto.getQuestions().add(question);
        }

        contentDto.getQuestions().sort(Comparator.comparingInt(QuestionJsonContentDto::getNumber));

        return contentDto;
    }

    private static QuestionJsonContentDto mapToQuestionJsonContentDto(QuestionPattern questionPattern) {
        return new QuestionJsonContentDto(questionPattern);
    }
}
