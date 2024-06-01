package com.example.ProductService.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class ImportProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "import_order_id")
    @JsonBackReference
    private ImportOrder importOrder;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name="import_price")
    private Double importPrice;

    private Integer quantity;

    protected ImportProduct() {
    }

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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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
