package com.sgtu.tester.rabbit;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ExpressionCheckProducer {
    private final RabbitTemplate rabbitTemplate;

    public void send(Long testId, List<Map<String, String>> formulas) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("testId", testId);
        payload.put("formulas", formulas);
        rabbitTemplate.convertAndSend(
                RabbitConfig.EXCHANGE_EQUATION_REQUEST,
                RabbitConfig.ROUTING_KEY_EXPRESSION_CHECK,
                payload
        );
    }
}
