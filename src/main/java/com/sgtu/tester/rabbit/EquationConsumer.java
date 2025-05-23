package com.sgtu.tester.rabbit;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sgtu.tester.common.mvc.repository.StudentTestInfoRepository;
import com.sgtu.tester.dto.EquationResponsePayload;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import static com.sgtu.tester.rabbit.RabbitConfig.QUEUE_EQUATION_RESPONSE;

@Component
@RequiredArgsConstructor
public class EquationConsumer {

    private final ObjectMapper objectMapper;
    private final StudentTestInfoRepository studentTestInfoRepository;

    @SneakyThrows
    @RabbitListener(queues = QUEUE_EQUATION_RESPONSE)
    public void equationResponseConsumer(Message message) {
        String payload = message.getBody() == null ? "" : new String(message.getBody(), StandardCharsets.UTF_8);
        EquationResponsePayload dto = objectMapper.readValue(payload, EquationResponsePayload.class);

        AtomicInteger counter = new AtomicInteger(1);

        List<Map<String, Object>> structuredFormulas = dto.getFormulas().stream()
                .map(f -> {
                    Map<String, Object> map = new LinkedHashMap<>();
                    map.put("id", counter.getAndIncrement());
                    map.put("formula", f.getFormula());
                    map.put("rightAnswer", f.getRightAnswer());
                    map.put("answer", "");
                    return map;
                })
                .toList();

        String jsonContent = objectMapper.writeValueAsString(structuredFormulas);

        studentTestInfoRepository.findById(dto.getTestId())
                .ifPresent(studentTestInfo -> {
                    studentTestInfo.setContent(jsonContent);
                    studentTestInfoRepository.save(studentTestInfo);
                });
    }
}
