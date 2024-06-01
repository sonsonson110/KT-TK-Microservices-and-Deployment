package com.example.resellerservice.service;

import com.example.resellerservice.model.ShippingMethod;
import com.example.resellerservice.shipping.FastShipping;
import com.example.resellerservice.shipping.ShippingStrategy;
import com.example.resellerservice.shipping.StandardShipping;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShippingMethodService {
    public List<ShippingMethod> getAllShippingMethods(double weight, String city) {
        List<ShippingMethod> shippingMethods = new ArrayList<>();
        ShippingStrategy shippingStrategy;
        // fast
        shippingStrategy = new FastShipping();
        shippingMethods.add(new ShippingMethod(
                "fast",
                shippingStrategy.getShippingCost(weight, city),
                shippingStrategy.getDescription()
        ));
        // standard
        shippingStrategy = new StandardShipping();
        shippingMethods.add(new ShippingMethod(
                "standard",
                shippingStrategy.getShippingCost(weight, city),
                shippingStrategy.getDescription()
        ));
        return shippingMethods;
    }
}
