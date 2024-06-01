package com.example.resellerservice.shipping;

public class FastShipping implements ShippingStrategy {
    @Override
    public double getShippingCost(double weight, String city) {
        if (city.equalsIgnoreCase("Hà Nội")) {
            if (weight > 2) return 70000.0;
            return 55000.0;
        }

        if (weight > 2) return 100000.0;
        return 85000.0;
    }

    @Override
    public String getDescription() {
        return "Giao hang hoa toc trong 1-3 ngay lam viec";
    }
}
