package com.example.SupplierService.model.custom;

public class SupplierStat {
    private Integer id;
    private String name;
    private String description;
    private Integer productAmount;

    public SupplierStat(Integer id, String name, String description, Integer productAmount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.productAmount = productAmount;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getProductAmount() {
        return productAmount;
    }

    public void setProductAmount(Integer productAmount) {
        this.productAmount = productAmount;
    }
}
