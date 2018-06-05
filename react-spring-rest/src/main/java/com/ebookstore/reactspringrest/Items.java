package com.ebookstore.reactspringrest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Items {

    private String id;
    private VolumeInfo volumeInfo;
    private SaleInfo saleInfo;

    public Float getPriceAmount(){
        if(getSaleInfo()==null||
                getSaleInfo().getListPrice()==null||
                getSaleInfo().getListPrice().getAmount()==null) {
            return 14.50f;
        }else{
            return getSaleInfo().getListPrice().getAmount();
        }
    }
    public String getCurrencyCode(){
        if(getSaleInfo()==null||
                getSaleInfo().getListPrice()==null||
                getSaleInfo().getListPrice().getCurrencyCode()==null) {
            return "MXN";
        }else{
            return getSaleInfo().getListPrice().getCurrencyCode();
        }
    }

}
