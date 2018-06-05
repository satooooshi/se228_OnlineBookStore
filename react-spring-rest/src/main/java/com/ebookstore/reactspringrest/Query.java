package com.ebookstore.reactspringrest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
//component below leads parse error of http
//@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Query {


    private List<String> category;
    private String language;
    private String orderBy;
    private String searchValue;


}

