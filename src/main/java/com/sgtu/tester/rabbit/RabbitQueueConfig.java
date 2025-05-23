package com.sgtu.tester.rabbit;

import jakarta.annotation.PostConstruct;
import org.springframework.amqp.core.*;
import org.springframework.stereotype.Component;

import static com.sgtu.tester.rabbit.RabbitConfig.*;

@Component
public class RabbitQueueConfig {

    private final AmqpAdmin amqpAdmin;

    public RabbitQueueConfig(AmqpAdmin amqpAdmin) {
        this.amqpAdmin = amqpAdmin;
    }

    @PostConstruct
    public void createQueues() {
        DirectExchange exchangeEquationRequest = new DirectExchange(EXCHANGE_EQUATION_REQUEST);
        amqpAdmin.declareExchange(exchangeEquationRequest);
        buildDirectAmpq(exchangeEquationRequest, ROUTING_KEY_EQUATION_DIFFERENTIAL_REQUEST, QUEUE_EQUATION_DIFFERENTIAL_REQUEST);
        buildDirectAmpq(exchangeEquationRequest, ROUTING_KEY_EQUATION_INTEGRAL_REQUEST, QUEUE_EQUATION_INTEGRAL_REQUEST);
        buildDirectAmpq(exchangeEquationRequest, ROUTING_KEY_SIMPLIFICATION_REQUEST, QUEUE_SIMPLIFICATION_REQUEST);
        buildDirectAmpq(exchangeEquationRequest, ROUTING_KEY_EXPRESSION_CHECK, QUEUE_EXPRESSION_CHECK);

        buildFanoutAmpq(EXCHANGE_EXPRESSION_CHECK_RESPONSE, QUEUE_EXPRESSION_CHECK_RESPONSE);
        buildFanoutAmpq(EXCHANGE_EQUATION_RESPONSE, QUEUE_EQUATION_RESPONSE);
    }

    /**
     * Создание Queue и связывание Queue с Exchange
     */
    private void buildDirectAmpq(DirectExchange exchangeRequest, String keyName, String queueName) {
        Queue queue = new Queue(queueName, true);
        amqpAdmin.declareQueue(queue);
        amqpAdmin.declareBinding(BindingBuilder.bind(queue).to(exchangeRequest).with(keyName));
    }

    /**
     * Создание Exchange, Queue и связи между ними
     */
    private void buildFanoutAmpq(String fanoutExchangeName, String queueName) {
        FanoutExchange fanoutExchange = new FanoutExchange(fanoutExchangeName);
        amqpAdmin.declareExchange(fanoutExchange);
        Queue queue = new Queue(queueName, true);
        amqpAdmin.declareQueue(queue);
        amqpAdmin.declareBinding(BindingBuilder.bind(queue).to(fanoutExchange));
    }
}
