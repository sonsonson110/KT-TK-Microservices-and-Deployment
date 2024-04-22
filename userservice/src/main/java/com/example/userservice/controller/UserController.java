package com.example.userservice.controller;

import com.example.userservice.dto.LoginFormDto;
import com.example.userservice.model.User;
import com.example.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;

//    @GetMapping()
//    public ResponseEntity<List<User>> getAllUsers() {
//        return ResponseEntity
//                .ok()
//                .body(userService.getAll());
//    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Integer userId) {
        User user = userService.getUserById(userId);
        if (user == null)
            return ResponseEntity.badRequest().body("No such Id");
        return ResponseEntity.ok(user);
    }

    @PostMapping("/auth")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginFormDto loginFormDto) {
        User user = userService.authenticateUser(loginFormDto.getUsername(), loginFormDto.getPassword());
        System.out.println(loginFormDto);
        if (user == null)
            return ResponseEntity
                    .badRequest()
                    .body("Wrong username or password");
        return ResponseEntity
                .ok()
                .body(user);
    }
}
