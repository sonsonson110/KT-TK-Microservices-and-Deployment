package com.example.userservice.service;

import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User authenticateUser(String username, String password) {
        List<User> users = repository.findUserByUsernameAndPassword(username, password);
        if (users.size() == 1)
            return users.get(0);
        return null;
    }

    public User getUserById(int userId) {
        return repository.findById(userId).orElse(null);
    }
}
