package com.sgtu.tester.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class TestSubmitRequestDto {
    private List<Map<String, String>> formulas;
}
