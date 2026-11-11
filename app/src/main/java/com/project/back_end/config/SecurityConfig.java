package com.project.back_end.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable()) // 1. Desactivar CSRF si estás usando JWT
            .authorizeHttpRequests(auth -> auth // 2. Configurar reglas de autorización
                .requestMatchers("/", "/index.html").permitAll()
                .requestMatchers("/v1/auth/**").permitAll()
                .anyRequest().permitAll()
            );
        // Aquí usualmente añades tu .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        return http.build();
    }
    
    // Apartado 2: Optimización - Ignorar la seguridad para Todo lo estático
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
            // 1. Esto incluye las carpetas por defecto de Spring (static, public, resources)
            .requestMatchers(PathRequest.toStaticResources().atCommonLocations())
            // 2. Esto incluye tus carpetas personalizadas de Feature-Sliced Design y las antiguas
            .requestMatchers(
                "/index-contents/**",
                "/assets/**",
                "/js/**",
                "/page-templates/**",
                "/favicon.ico",
                "/common-contents/**",
                "/auth-contents/**",
                "/admin-contents/**",
                "/patient-contents/**",
                "/doctor-contents/**",
                "/infrastructure/**"
            );
    }
    
    // 3. Definición de la política CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Permite los orígenes desde los que estás accediendo
        configuration.setAllowedOrigins(List.of("http://localhost:8080", "http://smartclinic.com:8080"));
        
        // Permite los métodos HTTP que vas a usar
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Permite las cabeceras estándar y las de tu JWT (como Authorization)
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cache-Control"));
        
        // Permite el envío de cookies o credenciales si fuera necesario
        configuration.setAllowCredentials(true);
        
        // Aplica esta configuración a todas las rutas de la aplicación
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
