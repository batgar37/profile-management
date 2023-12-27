package com.bgarrido.profilemanagement.service;

import com.bgarrido.profilemanagement.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    List<User> findAll();
    User findById(int id);
    User save(User user);
    User deleteById(int id);
}
