package com.sgtu.tester.common.mvc.service;

import com.sgtu.tester.common.mvc.DefaultService;
import com.sgtu.tester.common.mvc.domain.FormulaPattern;
import com.sgtu.tester.common.mvc.repository.FormulaPatternRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormulaPatternService extends DefaultService<FormulaPattern, FormulaPatternRepository> {

    public FormulaPatternService(FormulaPatternRepository repository) {
        super(repository);
    }

    public List<FormulaPattern> getFormulasBySection(Long sectionId) {
        return repository.findAllBySectionId(sectionId);
    }
}
