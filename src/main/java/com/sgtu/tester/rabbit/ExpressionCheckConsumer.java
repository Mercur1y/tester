package com.sgtu.tester.rabbit;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sgtu.tester.common.mvc.repository.StudentTestInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class ExpressionCheckConsumer {

    private final StudentTestInfoRepository studentTestInfoRepository;
    private final ObjectMapper objectMapper;

    @SneakyThrows
    @RabbitListener(queues = RabbitConfig.QUEUE_EXPRESSION_CHECK_RESPONSE)
    public void onResponse(Message message) {
        String payload = new String(message.getBody(), StandardCharsets.UTF_8);
        JsonNode dto = objectMapper.readTree(payload);

        Long testId = dto.get("testId").asLong();
        JsonNode formulas = dto.get("formulas");

        int total = formulas.size();
        int correct = 0;

        for (JsonNode formula : formulas) {
            if (formula.get("correct").asBoolean()) correct++;
        }

        int rate = Math.round(((float) correct / total) * 100);

        studentTestInfoRepository.findById(testId).ifPresent(info -> {
            try {
                info.setRate(rate);
                info.setFinished(true);
                info.setContent(objectMapper.writeValueAsString(formulas));
                studentTestInfoRepository.save(info);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }
}

