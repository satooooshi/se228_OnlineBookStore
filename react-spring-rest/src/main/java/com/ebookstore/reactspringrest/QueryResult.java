package com.ebookstore.reactspringrest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QueryResult {

    private String kind;
    private List<Items> items;

    public void showList(){
        for(Items item:items){
            System.out.println(item.getId());
        }

    }

    public List<Items> getItemsList(){
        return items;
    }


}
