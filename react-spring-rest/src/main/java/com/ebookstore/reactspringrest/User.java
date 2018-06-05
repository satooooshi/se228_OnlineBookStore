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
@Table(name = "user")
//component below leads parse error of http
//@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)//For Long
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String avatar;
    private String role;
    private String password;

    public User( String username, String firstname, String lastname, String email,String avatar, String role,String password){

        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.avatar = avatar;
        this.role=role;
        this.password=password;
    }

    public User( String username,String email,String password){
        this.username = username;
        this.email=email;
        this.password=password;
    }

    public User( String username,String email,String avatar,String role,String password){
        this.username = username;
        this.email = email;
        this.avatar = avatar;
        this.role = role;
        this.password = password;
    }

}
