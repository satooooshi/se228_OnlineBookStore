package com.ebookstore.reactspringrest;


import java.util.List;
import java.util.ArrayList;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.stream.Stream;



/*
@Component
public class DatabaseLoader implements CommandLineRunner {
    protected final Log logger = LogFactory.getLog(getClass());

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

    @Override
    public void run(String... args) throws Exception {
        logger.info("Welcome to the online book store System!");



    }



}
*/

//http://books.google.com/books/content?id=oqmBpk1EzvAC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE711QBNtaIUSwWq78rKS255V9UdZGGvCLPHFe71mqh1MU9KhM2TmFFpSYInEoAmDyH43DB7HlgMn2RQD5Ui6zQNPIyNcyEAdDJmGcaBifZjypTM97qrD1I0Mcvq_U2_QW8VW_23J&source=gbs_api