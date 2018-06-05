package com.ebookstore.reactspringrest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListPrice {
    private Float amount;
    private String currencyCode;

    public Float getAmount() {
        return this.amount*0.05f;//convert to usd
    }
}
//https://creww.me/assets/placeholders/noimage-453ee38e793526a1829c47d79e6f781e59b52c2357d3e4932cae4b4557608ac9.png