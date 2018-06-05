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
public class VolumeInfo {

    private String title;
    private String subtitle;
    private List<String> authors;
    private String publisher;
    private String publishedDate;
    private String description;
    private Integer pageCount;
    private List<String> categories;
    private Float averageRating;
    private ImageLinks imageLinks;
    private String language;


    public String getFirstAuthor(){
        if(getAuthors()==null)
            return "John Hancock";
        //System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+authors.get(0));
        return getAuthors().get(0);
    }

    public String getFirstCategory(){
        if(getCategories()==null)
            return "Business & Economics";
        //System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+categories.get(0));
        return getCategories().get(0);
    }

    public String getFirstImageLinks(){
        if(getImageLinks()==null)
            return "";
        return getImageLinks().getSmallThumbnail();
    }

}
//https://creww.me/assets/placeholders/noimage-453ee38e793526a1829c47d79e6f781e59b52c2357d3e4932cae4b4557608ac9.png