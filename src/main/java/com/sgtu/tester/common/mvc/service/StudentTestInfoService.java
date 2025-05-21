package com.sgtu.tester.common.mvc.service;

import com.sgtu.tester.common.mvc.DefaultService;
import com.sgtu.tester.common.mvc.domain.StudentTestInfo;
import com.sgtu.tester.common.mvc.repository.StudentTestInfoRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentTestInfoService extends DefaultService<StudentTestInfo, StudentTestInfoRepository> {

    public StudentTestInfoService(StudentTestInfoRepository repository) {
        super(repository);
    }

}
