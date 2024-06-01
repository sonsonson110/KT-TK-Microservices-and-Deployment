package com.example.resellerservice.service;

import com.example.resellerservice.model.ExportOrder;
import com.example.resellerservice.model.ExportProduct;
import com.example.resellerservice.repository.ExportOrderRepository;
import com.example.resellerservice.repository.ExportProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExportOrderService {

    private final ExportOrderRepository exportOrderRepository;
    private final ExportProductRepository exportProductRepository;

    @Autowired
    public ExportOrderService(ExportOrderRepository exportOrderRepository, ExportProductRepository exportProductRepository) {
        this.exportOrderRepository = exportOrderRepository;
        this.exportProductRepository = exportProductRepository;
    }

    public List<ExportOrder> getAll() {
        return exportOrderRepository.findAllByOrderByOrderDateDesc();
    }

    public ExportOrder getById(Integer id) {
        return exportOrderRepository.findById(id).orElse(null);
    }

    @Transactional
    public void createExportOrder(ExportOrder exportOrder) {
        exportOrderRepository.save(exportOrder);

        List<ExportProduct> exportProducts = exportOrder.getExportProducts();
        for (ExportProduct exportProduct : exportProducts) {
            exportProduct.setExportOrder(exportOrder);
        }
        exportProductRepository.saveAll(exportProducts);
    }

    public void updateExportOrder(ExportOrder exportOrder) {
        exportOrderRepository.save(exportOrder);
    }
}
