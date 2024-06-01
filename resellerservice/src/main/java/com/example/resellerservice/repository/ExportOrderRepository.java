package com.example.resellerservice.repository;

import com.example.resellerservice.model.ExportOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExportOrderRepository extends JpaRepository<ExportOrder, Integer> {
    List<ExportOrder> findAllByOrderByOrderDateDesc();
}
