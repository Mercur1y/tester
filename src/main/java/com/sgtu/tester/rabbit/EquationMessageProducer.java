package com.sgtu.tester.rabbit;

import com.sgtu.tester.common.consts.Subsection;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.sgtu.tester.rabbit.RabbitConfig.EXCHANGE_EQUATION_REQUEST;

@Component
@RequiredArgsConstructor
public class EquationMessageProducer {

    private final RabbitTemplate rabbitTemplate;

    public void send(Long sectionId, Long studentTestInfoId, List<String> formulas) {
        Subsection subsection = Subsection.fromId(sectionId)
                .orElseThrow(() -> new IllegalArgumentException("Неизвестный subsectionId: " + sectionId));

        if (subsection.getRoutingKey() == null) {
            throw new IllegalStateException("Для subsection " + subsection.name() + " не задан routingKey");
        }

        Map<String, Object> payload = new HashMap<>();
        payload.put("testId", studentTestInfoId);
        payload.put("formulas", formulas.stream().map(f -> Map.of("formula", f)).toList());

        rabbitTemplate.convertAndSend(EXCHANGE_EQUATION_REQUEST, subsection.getRoutingKey(), payload);
    }
}
