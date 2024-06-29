package com.sgtu.tester.util;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

@Component
public class RequestLoggingFilterConfig extends CommonsRequestLoggingFilter {

    private static final Logger logger = LoggerFactory.getLogger(RequestLoggingFilterConfig.class);

    public RequestLoggingFilterConfig() {
        super();
        setIncludeClientInfo(true);
        setIncludeQueryString(true);
        setIncludePayload(true);
        setIncludeHeaders(true);
        setMaxPayloadLength(10000);
    }

    @Override
    protected void beforeRequest(HttpServletRequest request, String message) {
        logger.info("Request data: {}", message);
    }

    @Override
    protected void afterRequest(HttpServletRequest request, String message) {
        logger.info("Response data: {}", message);
    }
}

