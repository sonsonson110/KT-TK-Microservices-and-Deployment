package com.example.ProductService.model;

import jakarta.persistence.Column;

import java.math.BigDecimal;

public class SupplierStat extends Supplier {
    @Column(name = "product_amount")
    private Integer productAmount;

    protected SupplierStat() {
    }

    public SupplierStat(Integer id, String name, String description, BigDecimal productAmount) {
        this.setId(id);
        this.setName(name);
        this.setDescription(description);
        this.setProductAmount(productAmount.intValue());
    }

    public Integer getProductAmount() {
        return productAmount;
    }

    public void setProductAmount(int productAmount) {
        this.productAmount = productAmount;
    }
}
