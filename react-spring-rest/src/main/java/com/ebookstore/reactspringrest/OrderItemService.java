package com.ebookstore.reactspringrest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {
    @Autowired
    OrderItemRepository orderItemRepository;

    public List<OrderItem> findAll() {
        return orderItemRepository.findAll();
    }


    public OrderItem findOneById(Long id) { return orderItemRepository.findOneById(id); }

    public List<OrderItem> findByUserId(Long id) { return orderItemRepository.findByUserId(id); }

    public OrderItem create(OrderItem item) { return orderItemRepository.save(item); }

    public void deleteById(Long id) {

        orderItemRepository.deleteById(id);
    }

    public OrderItem update(OrderItem item) {
        return orderItemRepository.save(item);
    }
}