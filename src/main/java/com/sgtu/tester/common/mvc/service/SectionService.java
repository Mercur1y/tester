package com.sgtu.tester.common.mvc.service;

import com.sgtu.tester.common.mvc.DefaultService;
import com.sgtu.tester.common.mvc.domain.Section;
import com.sgtu.tester.common.mvc.repository.SectionRepository;
import org.springframework.stereotype.Service;

@Service
public class SectionService extends DefaultService<Section, SectionRepository> {

    public SectionService(SectionRepository repository) {
        super(repository);
    }
}
