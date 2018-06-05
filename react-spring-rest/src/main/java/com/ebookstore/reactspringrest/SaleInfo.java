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
public class SaleInfo {
    private ListPrice listPrice;
}
//https://creww.me/assets/placeholders/noimage-453ee38e793526a1829c47d79e6f781e59b52c2357d3e4932cae4b4557608ac9.png