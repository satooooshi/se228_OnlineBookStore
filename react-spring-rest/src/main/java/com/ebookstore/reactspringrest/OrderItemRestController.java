package com.ebookstore.reactspringrest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/api/cart")
public class OrderItemRestController {

    @Autowired
    OrderItemService orderItemService;

    @Autowired
    VolumeService volumeService;

    @GetMapping
    public List<OrderItem> getAll() {
        List<OrderItem> items = orderItemService.findAll();
        return items;
    }

    @GetMapping(path="/ofId/{id}")
    public OrderItem getOrderItemById(@PathVariable Long id) {
        OrderItem item = orderItemService.findOneById(id);
        return item;
    }

    @GetMapping(path = "/ofUserId/{userId}")
    public List<OrderItem> getOrderItemsByUserId(@PathVariable Long userId) {
        return orderItemService.findByUserId(userId);
    }

    //
    //String to Volume
    //
    @GetMapping(path = "/ofUserIdOfVolumeDetail/{userId}")
    public List<Volume> getCartOfUserIdOfVolume(@PathVariable Long userId) {
        List<OrderItem>items=orderItemService.findByUserId(userId);
        List<Volume>volumes=new ArrayList<>();
        for(OrderItem item:items){
            volumes.add(volumeService.findOneById(item.getBookId()));
        }
        return volumes;
    }

    //
    //id can be generated automatically
    //
    @PostMapping("/addCartOfUserId")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public OrderItem postCartOfUserIdWith(@RequestBody OrderItem item) {
            orderItemService.create(new OrderItem(item.getUserId(),item.getBookId(),item.getCount()));
        return item;
    }

    @PostMapping(path = "/removeItemsOfUserId/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Long deleteCartItems(@PathVariable Long userId, @RequestBody Long bookId) {
        List<OrderItem>items=orderItemService.findByUserId(userId);
        for(OrderItem item:items){
                if(bookId==item.getBookId()){
                    orderItemService.deleteById(item.getId());
                }
            }
            return bookId;
    }


    //curl http://localhost:8080/api/cart/putCount -i -XPUT -H "Content-Type: application/json" -d "{\"id\":\"1\",\"userId\":\"1\",\"bookId\":\"63\",\"count\":\"100\"}"
    @PutMapping(path = "/putCount")
    public OrderItem putCartItem(@RequestBody OrderItem item) {
        return orderItemService.update(item);
    }


}

//curl http://localhost:8080/api/cart/addCart -i -XPOST -H "Content-Type: application/json" -d "{\"username\":\"snow boll boy\",\"firstname\":\"tores\",\"lastname\":\"louis\",\"username\":\"snow boll boy\",\"email\":\"vvsx@qq.com\",\"imgLink\":\"snow.jpg\"}"

//curl http://localhost:8080/api/cart/addCartOfUserId -i -XPOST -H "Content-Type: application/json" -d "{\"userId\":\"1\",\"bookId\":\"1\",\"count\":\"2\"}"

//curl http://localhost:8080/api/cart/ofId/{id} -i -XDELETE

//curl http://localhost:8080/api/cart/ofId/6 -i -XPUT -H "Content-Type: application/json" -d "{\"id\":6,\"bookId\":2,\"title\":\"harry potter\",\"userId\":33,\"username\":\"Andre Hansen\",\"date\":\"2018/04/11\"}"

