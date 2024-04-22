package com.example.SupplierService.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class ImportProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonBackReference
    private ImportOrder importOrder;

    @Column(name="product_id")
    private Integer productId;

    @Column(name="import_price")
    private Double importPrice;
    private Integer quantity;

    protected ImportProduct() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ImportOrder getImportOrder() {
        return importOrder;
    }

    public void setImportOrder(ImportOrder importOrder) {
        this.importOrder = importOrder;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Double getImportPrice() {
        return importPrice;
    }

    public void setImportPrice(Double importPrice) {
        this.importPrice = importPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
