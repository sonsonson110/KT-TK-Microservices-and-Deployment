package com.example.resellerservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class ExportProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "export_price")
    private Double exportPrice;

    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "export_order_id")
    @JsonBackReference
    private ExportOrder exportOrder;

    protected ExportProduct() {
    }

    public ExportProduct(Integer id, Integer productId, Double exportPrice, Integer quantity, ExportOrder exportOrder) {
        this.id = id;
        this.productId = productId;
        this.exportPrice = exportPrice;
        this.quantity = quantity;
        this.exportOrder = exportOrder;
    }

    @Override
    public String toString() {
        return "ExportProduct{" +
                "id=" + id +
                ", productId=" + productId +
                ", exportPrice=" + exportPrice +
                ", quantity=" + quantity +
                '}';
    }

    public ExportOrder getExportOrder() {
        return exportOrder;
    }

    public void setExportOrder(ExportOrder exportOrder) {
        this.exportOrder = exportOrder;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Double getExportPrice() {
        return exportPrice;
    }

    public void setExportPrice(Double exportPrice) {
        this.exportPrice = exportPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
