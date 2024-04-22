package com.example.userservice.dto;

public class LoginFormDto {
    private String username;
    private String password;

    public LoginFormDto() {
    }

    public LoginFormDto(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Override
    public String toString() {
        return "LoginFormDto{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
