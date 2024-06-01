package com.example.resellerservice.shipping;

public interface ShippingStrategy {
    double getShippingCost(double weight, String city);
    String getDescription();
}
