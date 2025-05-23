package com.sgtu.tester.api;

import com.sgtu.tester.common.consts.Subsection;
import com.sgtu.tester.common.mvc.domain.*;
import com.sgtu.tester.common.mvc.repository.GroupStudentRepository;
import com.sgtu.tester.common.mvc.repository.TestInfoRepository;
import com.sgtu.tester.common.mvc.repository.TestPatternRepository;
import com.sgtu.tester.common.mvc.service.FormulaValueGenerator;
import com.sgtu.tester.dto.TestGenerateDto;
import com.sgtu.tester.rabbit.EquationMessageProducer;
import com.sgtu.tester.security.SecurityUtils;
import com.sgtu.tester.security.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
public class TestController {

    private final TestInfoRepository testInfoRepository;
    private final TestPatternRepository testPatternRepository;
    private final GroupStudentRepository groupStudentRepository;
    private final EquationMessageProducer equationMessageProducer;

    @PostMapping("generate")
    public ResponseEntity<TestInfo> generate(@RequestBody TestGenerateDto dto) {
        TestInfo test = new TestInfo();
        test.setName(dto.getName());
        test.setDeadline(dto.getDeadline());
        test.setGroupId(dto.getGroupId());
        test.setUserId(SecurityUtils.getCurrentUserId());
        test.setCreateDate(LocalDateTime.now());

        // Получаем студентов
        List<User> students = groupStudentRepository.findAllByGroup_Id(dto.getGroupId()).stream()
                .map(GroupStudent::getUser)
                .toList();

        // Получаем шаблон и секцию
        TestPattern pattern = testPatternRepository.findById(dto.getPatternId())
                .orElseThrow(() -> new RuntimeException("Шаблон не найден"));

        Subsection.fromId(pattern.getSectionId())
                .orElseThrow(() -> new RuntimeException("Subsection не найден: " + pattern.getSectionId()));

        List<FormulaPattern> formulas = new ArrayList<>(pattern.getFormulas());

        // создаём StudentTestInfo и отправляем задачи в очередь
        for (User student : students) {
            StudentTestInfo info = new StudentTestInfo();
            info.setUserId(student.getId().toString());
            info.setFinished(false);
            info.setTestInfo(test);

            test.getStudentTests().add(info);
        }

        test = testInfoRepository.save(test);

        // Отправляем задачи в очередь
        for (StudentTestInfo info : test.getStudentTests()) {
            List<String> renderedFormulas = formulas.stream()
                    .map(f -> {
                        Map<String, String> values = FormulaValueGenerator.generateValues(f.getParameters());
                        return FormulaValueGenerator.substituteFormula(f.getFormula(), values);
                    })
                    .toList();

            equationMessageProducer.send(pattern.getSectionId(), info.getId(), renderedFormulas);
        }

        return ResponseEntity.ok(test);
    }
}
