package com.example.SupplierService.service;

import com.example.SupplierService.model.ImportOrder;
import com.example.SupplierService.repository.ImportOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class ImportOrderService {
    @Autowired
    private ImportOrderRepository importOrderRepository;

    public List<ImportOrder> getAllImportOrders() {
        return importOrderRepository.findAll();
    }

    public List<ImportOrder> getSupplierImportOrdersByDate(int supplierId, Long startDate, Long endDate) {
        return importOrderRepository.getImportOrdersBySupplierIdAndDate(supplierId, startDate, endDate);
    }

    public ImportOrder getImportOrderById(int importOrderId) {
        return importOrderRepository.findById(importOrderId).orElse(null);
    }
}
