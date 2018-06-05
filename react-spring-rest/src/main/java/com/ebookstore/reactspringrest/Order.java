package com.ebookstore.reactspringrest;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.List;


@Entity
@Data
@Table(name = "order")
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)//For Long
    private Long id;
    @Column(name="ordered_date")
    private String orderedDate;
    @Column(name="user_id")
    private String userId;

    public Order(String orderedDate, String userId){

        this.orderedDate = orderedDate;
        this.userId = userId;
    }

}
