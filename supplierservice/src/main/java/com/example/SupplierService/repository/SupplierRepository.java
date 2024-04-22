package com.example.SupplierService.repository;

import com.example.SupplierService.model.Supplier;
import com.example.SupplierService.model.custom.ISupplierStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
@Query(value = """
        SELECT
        	s.id, s.name, s.description, SUM(ip.quantity) as productAmount
        FROM supplier AS s
        	INNER JOIN import_order AS io ON io.supplier_id = s.id
            INNER JOIN import_product AS ip ON ip.import_order_id = io.id
        WHERE io.import_date BETWEEN FROM_UNIXTIME(:startDate) AND FROM_UNIXTIME(:endDate)
        GROUP BY s.id, s.name, s.description
        ORDER BY productAmount DESC
        """, nativeQuery = true)
    List<ISupplierStat> getSupplierStatByProductAmount(@Param("startDate") Long startDate, @Param("endDate") Long endDate);

}
