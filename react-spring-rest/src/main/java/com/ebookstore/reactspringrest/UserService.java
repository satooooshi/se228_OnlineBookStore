package com.ebookstore.reactspringrest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findOneByUserId(Long id) { return userRepository.findOneById(id); }

    public User findOneByEmail(String email) { return userRepository.findOneByEmail(email); }

    public User create(User user) { return userRepository.save(user); }

    public void deleteByUserId(Long id) {
        userRepository.deleteById(id);
    }

    public User update(User user) {
        return userRepository.save(user);
    }
}