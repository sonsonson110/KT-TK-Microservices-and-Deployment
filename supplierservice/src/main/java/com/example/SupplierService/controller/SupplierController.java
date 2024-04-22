package com.example.SupplierService.controller;

import com.example.SupplierService.model.ImportOrder;
import com.example.SupplierService.model.Supplier;
import com.example.SupplierService.model.custom.SupplierStat;
import com.example.SupplierService.service.ImportOrderService;
import com.example.SupplierService.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @Autowired
    private ImportOrderService importOrderService;

    @GetMapping
    public ResponseEntity<List<Supplier>> getAllSuppliers() {
        List<Supplier> suppliers = supplierService.getAllSuppliers();
        return ResponseEntity.ok(suppliers);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<ImportOrder>> getAllImportOrders() {
        List<ImportOrder> importOrders = importOrderService.getAllImportOrders();
        return ResponseEntity.ok(importOrders);
    }

    @GetMapping("/{supplierId}/orders")
    public ResponseEntity<List<ImportOrder>> getSupplierImportOrdersByDate(
            @PathVariable Integer supplierId,
            @RequestParam Long startDate, @RequestParam Long endDate) {
        List<ImportOrder> importOrders = importOrderService.getSupplierImportOrdersByDate(supplierId, startDate, endDate);
        return ResponseEntity.ok(importOrders);
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<?> getImportOrderById(@PathVariable Integer id) {
        ImportOrder importOrder = importOrderService.getImportOrderById(id);
        if (importOrder == null) return ResponseEntity.badRequest().body("No such id");
        return ResponseEntity.ok(importOrder);
    }

    @GetMapping("/stat")
    public ResponseEntity<List<SupplierStat>> getSupplierStatsByDate(@RequestParam Long startDate, @RequestParam Long endDate) {
        List<SupplierStat> supplierStats = supplierService.getSupplierStatByDate(startDate, endDate);
        return ResponseEntity.ok(supplierStats);
    }
}
