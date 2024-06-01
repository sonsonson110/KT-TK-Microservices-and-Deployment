package com.example.ProductService.repository;

import com.example.ProductService.model.ImportOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface ImportOrderRepository extends JpaRepository<ImportOrder, Integer> {
    List<ImportOrder> findAllBySupplierId(int supplierId);
    List<ImportOrder> findByImportDateBetweenAndSupplierId(Timestamp startDate, Timestamp endDate, int supplierId);
}
