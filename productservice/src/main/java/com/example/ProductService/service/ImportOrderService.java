package com.example.ProductService.service;

import com.example.ProductService.model.ImportOrder;
import com.example.ProductService.repository.ImportOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class ImportOrderService {
    private final ImportOrderRepository importOrderRepository;

    @Autowired
    public ImportOrderService(ImportOrderRepository importOrderRepository) {
        this.importOrderRepository = importOrderRepository;
    }

    public List<ImportOrder> getSupplierImportOrderList(int supplierId) {
        return importOrderRepository.findAllBySupplierId(supplierId);
    }

    public List<ImportOrder> getSupplierImportOrderListBetweenDates(String startDate, String endDate, int supplierId) {
        return importOrderRepository.findByImportDateBetweenAndSupplierId(Timestamp.valueOf(startDate), Timestamp.valueOf(endDate), supplierId);
    }

    public ImportOrder getImportOrderById(int id) {
        return importOrderRepository.findById(id).orElse(null);
    }
}
