package com.sgtu.tester.api;

import com.sgtu.tester.common.mvc.DefaultController;
import com.sgtu.tester.common.mvc.domain.FormulaPattern;
import com.sgtu.tester.common.mvc.domain.TestPattern;
import com.sgtu.tester.common.mvc.repository.FormulaPatternRepository;
import com.sgtu.tester.common.mvc.service.FormulaPatternService;
import com.sgtu.tester.common.mvc.service.TestPatternService;
import com.sgtu.tester.dto.TestPatternCreateDto;
import com.sgtu.tester.security.SecurityUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@RestController
@Slf4j
@RequestMapping("/api/v1/test-pattern")
public class TestPatternController extends DefaultController<TestPattern, TestPatternService> {

    private final FormulaPatternRepository formulaPatternRepository;

    public TestPatternController(TestPatternService service, FormulaPatternRepository formulaPatternRepository) {
        super(service);
        this.formulaPatternRepository = formulaPatternRepository;
    }

    @PostMapping("saveWithFormulas")
    public ResponseEntity<TestPattern> saveWithFormulas(@RequestBody TestPatternCreateDto dto) {
        TestPattern pattern = new TestPattern();
        pattern.setName(dto.getName());
        pattern.setSectionId(dto.getSectionId());
        pattern.setUserId(SecurityUtils.getCurrentUserId());
        pattern.setCreateDate(LocalDateTime.now());
        pattern.setUpdateDate(LocalDateTime.now());

        Set<FormulaPattern> formulas = new HashSet<>(formulaPatternRepository.findAllById(dto.getFormulaIds()));
        pattern.setFormulas(formulas);
        return super.save(pattern);
    }
}
