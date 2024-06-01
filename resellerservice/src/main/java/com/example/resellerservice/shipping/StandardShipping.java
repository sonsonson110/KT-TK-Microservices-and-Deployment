package com.example.resellerservice.shipping;

public class StandardShipping implements ShippingStrategy {
    @Override
    public double getShippingCost(double weight, String city) {
        if (city.equalsIgnoreCase("Hà Nội")) {
            if (weight > 2) return 50000.0;
            return 35000.0;
        }
        if (weight > 2) return 70000.0;
        return 55000.0;
    }

    @Override
    public String getDescription() {
        return "Giao hang tieu chuan, toi da 7 ngay lam viec";
    }
}
