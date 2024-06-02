package com.example.ProductService.service;

import com.example.ProductService.model.SupplierStat;
import com.example.ProductService.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {
    private final SupplierRepository supplierRepository;

    @Autowired
    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public List<SupplierStat> getSupplierStatList(String startDate, String endDate) {
        return supplierRepository.getSupplierStatByProductAmountList(startDate, endDate);
    }
}
