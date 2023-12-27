package com.bgarrido.profilemanagement.service;

import com.bgarrido.profilemanagement.entity.User;
import com.bgarrido.profilemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(int id) {
        Optional<User> result = userRepository.findById(id);
        User user = null;
        if (result.isPresent()) {
            user = result.get();
        }
        return user;
    }

    @Override
    public User save(User user) {
        System.err.println();

        return userRepository.save(user);
    }

    @Override
    public User deleteById(int id) {
        Optional<User> user = userRepository.findById(id);
        userRepository.deleteById(id);
        return user.get();
    }
}
