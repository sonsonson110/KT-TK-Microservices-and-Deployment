package com.example.ProductService.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
public class ImportOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @Column(name = "employee_id")
    private Integer employeeId;

    @Column(name = "import_date")
    private Timestamp importDate;

    @Column(name = "shipping_cost")
    private Double shippingCost;

    @OneToMany(mappedBy = "importOrder")
    @JsonManagedReference
    List<ImportProduct> importProducts;

    protected ImportOrder() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public Timestamp getImportDate() {
        return importDate;
    }

    public void setImportDate(Timestamp importDate) {
        this.importDate = importDate;
    }

    public Double getShippingCost() {
        return shippingCost;
    }

    public void setShippingCost(Double shippingCost) {
        this.shippingCost = shippingCost;
    }

    public List<ImportProduct> getImportProducts() {
        return importProducts;
    }

    public void setImportProducts(List<ImportProduct> importProducts) {
        this.importProducts = importProducts;
    }
}
