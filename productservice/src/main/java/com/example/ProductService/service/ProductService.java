package com.example.ProductService.service;

import com.example.ProductService.model.Product;
import com.example.ProductService.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getAllProductByIds(List<Integer> ids) {
        return productRepository.findAllById(ids);
    }
}
