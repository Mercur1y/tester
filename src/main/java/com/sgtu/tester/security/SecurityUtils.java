package com.sgtu.tester.security;

import com.sgtu.tester.security.services.UserDetailsImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    /**
     * Возвращает объект текущего авторизованного пользователя
     */
    public static UserDetailsImpl getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserDetailsImpl) authentication.getPrincipal();
    }

    /**
     * Возвращает ID текущего пользователя
     */
    public static Long getCurrentUserId() {
        return getCurrentUser().getId();
    }

    /**
     * Возвращает username текущего пользователя
     */
    public static String getCurrentUsername() {
        return getCurrentUser().getUsername();
    }

    /**
     * Возвращает email текущего пользователя
     */
    public static String getCurrentUserEmail() {
        return getCurrentUser().getEmail();
    }
}
