package com.example.resellerservice.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.List;

@Entity
public class ExportOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "reseller_id")
    private Reseller reseller;

    @Column(name = "employee_id")
    private Integer employeeId;

    @Column(name = "order_status")
    private String orderStatus;

    @Column(name = "order_date")
    private Timestamp orderDate;

    @Column(name = "export_date")
    private Timestamp exportDate;

    @Column(name = "shipping_cost")
    private Double shippingCost;

    @Column(name = "shipping_code")
    private String shippingCode;

    @OneToMany(mappedBy = "exportOrder")
    @JsonManagedReference
    private List<ExportProduct> exportProducts;

    protected ExportOrder() {
    }

    public Timestamp getExportDate() {
        return exportDate;
    }

    public void setExportDate(Timestamp exportDate) {
        this.exportDate = exportDate;
    }

    public List<ExportProduct> getExportProducts() {
        return exportProducts;
    }

    public void setExportProducts(List<ExportProduct> exportProducts) {
        this.exportProducts = exportProducts;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Reseller getReseller() {
        return reseller;
    }

    public void setReseller(Reseller reseller) {
        this.reseller = reseller;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Timestamp getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }

    public Double getShippingCost() {
        return shippingCost;
    }

    public void setShippingCost(Double shippingCost) {
        this.shippingCost = shippingCost;
    }

    public String getShippingCode() {
        return shippingCode;
    }

    public void setShippingCode(String shippingCode) {
        this.shippingCode = shippingCode;
    }
}
