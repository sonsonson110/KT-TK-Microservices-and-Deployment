package com.example.ProductService.controller;

import com.example.ProductService.model.Product;
import com.example.ProductService.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

//    @GetMapping
//    ResponseEntity<List<Product>> getAllProducts() {
//        return ResponseEntity.ok(productService.getAllProducts());
//    }

    @GetMapping("/{productIds}")
    ResponseEntity<List<Product>> getAllProductsByIds(@PathVariable List<Integer> productIds) {
        System.out.println(productIds);
        List<Product> products = productService.getAllProductByIds(productIds);
        return ResponseEntity.ok(products);
    }
}
