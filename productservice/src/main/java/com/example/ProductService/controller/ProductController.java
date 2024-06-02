package com.example.ProductService.controller;

import com.example.ProductService.model.ImportOrder;
import com.example.ProductService.model.Product;
import com.example.ProductService.model.SupplierStat;
import com.example.ProductService.service.ImportOrderService;
import com.example.ProductService.service.ProductService;
import com.example.ProductService.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    private final SupplierService supplierService;
    private final ImportOrderService importOrderService;

    @Autowired
    public ProductController(ProductService productService, SupplierService supplierService, ImportOrderService importOrderService) {
        this.productService = productService;
        this.supplierService = supplierService;
        this.importOrderService = importOrderService;
    }

    @GetMapping
    ResponseEntity<List<Product>> getProducts(@RequestParam(required = false) List<Integer> productIds) {
        List<Product> products;
        if (productIds != null)
            products = productService.getAllProductByIds(productIds);
        else
            products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/suppliers/stat")
    ResponseEntity<List<SupplierStat>> getSupplierStatList(@RequestParam String startDate, @RequestParam String endDate) {
        List<SupplierStat> supplierStats = supplierService.getSupplierStatList(startDate, endDate);
        return ResponseEntity.ok(supplierStats);
    }

    @GetMapping("/suppliers/{supplierId}/importorders")
    ResponseEntity<?> getSupplierImportOrderList(@PathVariable int supplierId, @RequestParam(required = false) String startDate, @RequestParam(required = false) String endDate) {
        if ((startDate == null && endDate != null) || (startDate != null && endDate == null))
            return ResponseEntity.badRequest().build();
        List<ImportOrder> importOrders;
        if (startDate == null)
            importOrders = importOrderService.getSupplierImportOrderList(supplierId);
        else
            importOrders = importOrderService.getSupplierImportOrderListBetweenDates(startDate, endDate, supplierId);
        return ResponseEntity.ok(importOrders);
    }

    @GetMapping("/importorders/{importOrderId}")
    ResponseEntity<?> getImportOrderById(@PathVariable int importOrderId) {
        ImportOrder importOrder = importOrderService.getImportOrderById(importOrderId);
        if (importOrder == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(importOrder);
    }
}
