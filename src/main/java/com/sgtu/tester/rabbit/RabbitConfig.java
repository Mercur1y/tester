package com.sgtu.tester.rabbit;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.RabbitListenerContainerFactory;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class RabbitConfig {

    @Value("${spring.rabbitmq.host}")
    private String host;
    @Value("${spring.rabbitmq.port}")
    private Integer port;
    @Value("${spring.rabbitmq.username}")
    private String username;
    @Value("${spring.rabbitmq.password}")
    private String password;

    // Exchange для отправки питону на решение
    public static final String EXCHANGE_EQUATION_REQUEST = "ru.ex.equation.request";

    // Exchange для получения решения
    public static final String EXCHANGE_EQUATION_RESPONSE = "ru.ex.equation.response";

    public static final String EXCHANGE_EXPRESSION_CHECK_RESPONSE = "ru.ex.expression.check.response";

    // Унифицированная очередь для получения ответа
    public static final String QUEUE_EQUATION_RESPONSE = "ru.qu.equation.response";
    public static final String QUEUE_EXPRESSION_CHECK_RESPONSE = "ru.qu.expression.check.response";

    // Производная
    public static final String ROUTING_KEY_EQUATION_DIFFERENTIAL_REQUEST = "ru.key.equation.differential.request";
    public static final String QUEUE_EQUATION_DIFFERENTIAL_REQUEST = "ru.qu.equation.differential.request";

    // Интеграл
    public static final String ROUTING_KEY_EQUATION_INTEGRAL_REQUEST = "ru.key.equation.integral.request";
    public static final String QUEUE_EQUATION_INTEGRAL_REQUEST = "ru.qu.equation.integral.request";

    // Упрощение выражения
    public static final String ROUTING_KEY_SIMPLIFICATION_REQUEST = "ru.key.simplification.request";
    public static final String QUEUE_SIMPLIFICATION_REQUEST = "ru.qu.simplification.request";

    // Проверка
    public static final String ROUTING_KEY_EXPRESSION_CHECK = "ru.key.expression.check";
    public static final String QUEUE_EXPRESSION_CHECK = "ru.qu.expression.check";

    @Bean
    public CachingConnectionFactory rabbitConnectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setHost(host);
        connectionFactory.setPort(port);
        connectionFactory.setUsername(username);
        connectionFactory.setPassword(password);
        return connectionFactory;
    }

    @Bean
    public AmqpAdmin amqpAdmin(CachingConnectionFactory connectionFactory) {
        return new RabbitAdmin(connectionFactory);
    }

    @Bean
    public RabbitTemplate rabbitTemplate(CachingConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }

    @Bean
    public RabbitListenerContainerFactory<?> rabbitListenerContainerFactory(CachingConnectionFactory connectionFactory) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(jsonMessageConverter());
        return factory;
    }

    public MessageConverter jsonMessageConverter() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        return new Jackson2JsonMessageConverter(mapper, "UTF-8");
    }
}
