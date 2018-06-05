package com.ebookstore.reactspringrest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//@RepositoryRestResource(collectionResourceRel = "books", path = "books")
@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    public OrderItem findOneById(Long id);
    public List<OrderItem> findByUserId(Long id);
    public void deleteById(Long id);

}
