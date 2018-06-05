package com.ebookstore.reactspringrest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_item")
public class OrderItem {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)//For Long
    private Long id;
    @Column(name="user_id")
    private Long userId;
    @Column(name="book_id")
    private Long bookId;
    @Column(name="count")
    private Integer count;


    public OrderItem(Long userId, Long bookId, Integer count){
        this.userId=userId;
        this.bookId = bookId;
        this.count = count;
    }

}
