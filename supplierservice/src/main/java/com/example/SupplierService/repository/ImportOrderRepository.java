package com.example.SupplierService.repository;

import com.example.SupplierService.model.ImportOrder;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

public interface ImportOrderRepository extends JpaRepository<ImportOrder, Integer> {
    @Query(value = """
                SELECT io.*, s.name, s.description
                FROM import_order io
                INNER JOIN supplier s ON io.supplier_id = s.id
                WHERE s.id = :supplierId AND (io.import_date BETWEEN FROM_UNIXTIME(:startDate) AND FROM_UNIXTIME(:endDate))
            """, nativeQuery = true)
    List<ImportOrder> getImportOrdersBySupplierIdAndDate(
            @Param("supplierId") Integer supplierId,
            @Param("startDate") Long startDate,
            @Param("endDate") Long endDate
    );
}
