package com.example.ProductService.repository;

import com.example.ProductService.model.Supplier;
import com.example.ProductService.model.SupplierStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
    @Query(value = """
        SELECT
        	s.id, s.name, s.description, SUM(ip.quantity) as product_amount
        FROM supplier AS s
        	INNER JOIN import_order AS io ON io.supplier_id = s.id
            INNER JOIN import_product AS ip ON ip.import_order_id = io.id
        WHERE io.import_date BETWEEN :startDate AND :endDate
        GROUP BY s.id, s.name, s.description
        ORDER BY product_amount DESC
        """, nativeQuery = true)
    List<SupplierStat> getSupplierStatByProductAmountList(@Param("startDate") String startDate, @Param("endDate") String endDate);
}
