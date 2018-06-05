package com.ebookstore.reactspringrest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@Configuration
public class JsonFormatter {
    @Bean
    ObjectMapper objectMapper(){
        return Jackson2ObjectMapperBuilder.json()
                .indentOutput(true)
                .build();
    }
}