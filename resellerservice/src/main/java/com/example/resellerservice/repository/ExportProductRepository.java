package com.example.resellerservice.repository;

import com.example.resellerservice.model.ExportProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExportProductRepository extends JpaRepository<ExportProduct, Integer> {
}
