package com.example.SupplierService.service;

import com.example.SupplierService.model.Supplier;
import com.example.SupplierService.model.custom.ISupplierStat;
import com.example.SupplierService.model.custom.SupplierStat;
import com.example.SupplierService.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    public List<Supplier> getAllSuppliers() {
        List<Supplier> suppliers = supplierRepository.findAll();
        return suppliers;
    }

    public List<SupplierStat> getSupplierStatByDate(Long startDate, Long endDate) {
        List<SupplierStat> supplierStats = supplierRepository.getSupplierStatByProductAmount(startDate, endDate)
                .stream()
                .map((e) -> new SupplierStat(e.getId(), e.getName(), e.getDescription(), e.getProductAmount()))
                .toList();
        return supplierStats;
    }

}
