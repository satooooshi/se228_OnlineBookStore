package com.ebookstore.reactspringrest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//@RepositoryRestResource(collectionResourceRel = "books", path = "books")
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User findOneById(Long id);
    public User findOneByEmail(String email);
    public void deleteById(Long id);

}
