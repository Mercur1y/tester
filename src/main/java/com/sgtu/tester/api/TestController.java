package com.sgtu.tester.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sgtu.tester.common.consts.Subsection;
import com.sgtu.tester.common.mvc.domain.*;
import com.sgtu.tester.common.mvc.repository.*;
import com.sgtu.tester.common.mvc.service.FormulaValueGenerator;
import com.sgtu.tester.dto.*;
import com.sgtu.tester.rabbit.EquationMessageProducer;
import com.sgtu.tester.rabbit.ExpressionCheckProducer;
import com.sgtu.tester.security.SecurityUtils;
import com.sgtu.tester.security.model.User;
import com.sgtu.tester.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
public class TestController {

    private final TestInfoRepository testInfoRepository;
    private final StudentTestInfoRepository studentTestInfoRepository;
    private final TestPatternRepository testPatternRepository;
    private final GroupStudentRepository groupStudentRepository;
    private final EquationMessageProducer equationMessageProducer;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final ExpressionCheckProducer expressionCheckProducer;

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

    @GetMapping("assigned")
    public ResponseEntity<List<TestInfoDto>> getAllTestInfo() {
        List<TestInfo> testInfos = testInfoRepository.findAll();
        List<TestInfoDto> list = testInfos.stream().map(test -> {
            TestInfoDto dto = new TestInfoDto();
            dto.setId(test.getId());
            dto.setName(test.getName());
            dto.setCreateDate(test.getCreateDate());
            dto.setDeadline(test.getDeadline());

            groupRepository.findById(test.getGroupId()).ifPresent(group -> {
                dto.setGroupCode(group.getCode());
                dto.setGroupName(group.getCourse() + " курс - " + group.getName());
            });

            List<StudentTestInfoDto> students = test.getStudentTests().stream().map(sti -> {
                StudentTestInfoDto s = new StudentTestInfoDto();
                User user = userRepository.findById(Long.valueOf(sti.getUserId())).orElse(null);
                if (user != null) {
                    s.setName(user.getName());
                    s.setSurname(user.getSurname());
                }
                s.setRate(sti.getRate());
                s.setFinished(sti.isFinished());
                return s;
            }).toList();

            dto.setStudents(students);
            return dto;
        }).toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("byStudent")
    public ResponseEntity<List<StudentTestListDto>> getStudentTests() {
        Long userId = SecurityUtils.getCurrentUserId();
        List<StudentTestInfo> studentTests = studentTestInfoRepository.findAllByUserId(userId.toString());

        List<StudentTestListDto> list = studentTests.stream().map(info -> {
            TestInfo test = info.getTestInfo();
            User teacher = userRepository.findById(test.getUserId()).orElse(null);

            StudentTestListDto dto = new StudentTestListDto();
            dto.setStudentTestId(info.getId());
            dto.setTestName(test.getName());
            dto.setDeadline(test.getDeadline());
            dto.setFinished(info.isFinished());
            dto.setContent(info.getContent());
            dto.setRate(info.getRate());
            if (teacher != null) {
                dto.setTeacherName(teacher.getName());
                dto.setTeacherSurname(teacher.getSurname());
            }

            return dto;
        }).toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentTestSolveDto> getStudentTest(@PathVariable Long id) {
        StudentTestInfo info = studentTestInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Тест не найден"));

        TestInfo test = info.getTestInfo();

        StudentTestSolveDto dto = new StudentTestSolveDto();
        dto.setId(info.getId());
        dto.setTestName(test.getName());
        try {
            dto.setContent(objectMapper.readValue(info.getContent(), new TypeReference<>() {}));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<Void> submitTest(@PathVariable Long id, @RequestBody TestSubmitRequestDto dto) {
        expressionCheckProducer.send(id, dto.getFormulas());
        return ResponseEntity.ok().build();
    }
}
