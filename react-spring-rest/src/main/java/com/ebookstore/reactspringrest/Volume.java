package com.ebookstore.reactspringrest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "volume")
public class Volume {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)//For Long
    private Long id;
    @Column(name="title")
    private String title;
    @Column(name="subtitle")
    private String subtitle;
    //private List<String> authors;
    @Column(name="author")
    private String author;
    @Column(name="publisher")
    private String publisher;
    @Column(name="published_date")
    private String publishedDate;
    @Column(name="description")
    private String description;
    @Column(name="page_count")
    private Integer pageCount;
    //private List<String> categories;
    @Column(name="category")
    private String category;
    @Column(name="average_rating")
    private Float averageRating;
    @Column(name="image_links" )
    private String imageLinks;
    @Column(name="language")
    private String language;
    @Column(name="price")
    private Float price;


    public Volume(String title, String subtitle, String author, String publisher, String publishedDate, String description,
                  Integer pageCount, String category, Float averageRating, String imageLinks, String language, Float price){

        this.title = title;
        this.subtitle=subtitle;
        this.author=author;
        this.publisher = publisher;
        this.publishedDate = publishedDate;
        this.description = description;
        this.pageCount = pageCount;
        this.category=category;
        this.averageRating = averageRating;
        this.imageLinks=imageLinks;
        this.language = language;
        this.price=price;
    }

}
