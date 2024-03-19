package com.sgtu.tester.common.mvc.service;

import com.sgtu.tester.common.mvc.DefaultService;
import com.sgtu.tester.common.mvc.domain.Category;
import com.sgtu.tester.common.mvc.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService extends DefaultService<Category, CategoryRepository> {

    public CategoryService(CategoryRepository repository) {
        super(repository);
    }
}
