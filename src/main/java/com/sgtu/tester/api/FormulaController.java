package com.sgtu.tester.api;

import com.sgtu.tester.common.mvc.DefaultController;
import com.sgtu.tester.common.mvc.domain.FormulaPattern;
import com.sgtu.tester.common.mvc.service.FormulaPatternService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/formula")
public class FormulaController extends DefaultController<FormulaPattern, FormulaPatternService> {

    public FormulaController(FormulaPatternService service) {
        super(service);
    }

    @Override
    @PostMapping
    public ResponseEntity<FormulaPattern> save(@RequestBody FormulaPattern entity) {
        return super.save(entity);
    }

    @GetMapping("/filter/section")
    public ResponseEntity<List<FormulaPattern>> getFormulasBySection(@RequestParam Long sectionId) {
        return ResponseEntity.ok(getService().getFormulasBySection(sectionId));
    }
}
