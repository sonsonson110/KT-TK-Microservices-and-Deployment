package com.example.resellerservice.controller;

import com.example.resellerservice.model.ExportOrder;
import com.example.resellerservice.model.Reseller;
import com.example.resellerservice.model.ShippingMethod;
import com.example.resellerservice.service.ExportOrderService;
import com.example.resellerservice.service.ResellerService;
import com.example.resellerservice.service.ShippingMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resellers")
public class ResellerController {
    private final ResellerService resellerService;
    private final ExportOrderService exportOrderService;
    private final ShippingMethodService shippingMethodService;

    @Autowired
    public ResellerController(ResellerService resellerService, ExportOrderService exportOrderService, ShippingMethodService shippingMethodService) {
        this.resellerService = resellerService;
        this.exportOrderService = exportOrderService;
        this.shippingMethodService = shippingMethodService;
    }

    @GetMapping
    ResponseEntity<List<Reseller>> getAllResellers(@RequestParam(required = false) String query) {
        return ResponseEntity.ok(resellerService.getAll());
    }

    @GetMapping("/{resellerId}")
    ResponseEntity<?> getReseller(@PathVariable Integer resellerId) {
        Reseller reseller = resellerService.getResellerById(resellerId);
        if (reseller == null)
            return ResponseEntity.badRequest().body("No such resellerId");
        return ResponseEntity.ok().body(reseller);
    }

    @PostMapping
    ResponseEntity<Reseller> createReseller(@RequestBody Reseller reseller) {
        Reseller createdReseller = resellerService.createReseller(reseller);
        return ResponseEntity.ok().body(createdReseller);
    }

    @PutMapping
    ResponseEntity<Reseller> updateReseller(@RequestBody Reseller reseller) {
        Reseller updatedReseller = resellerService.updateReseller(reseller);
        return ResponseEntity.ok().body(updatedReseller);
    }

    @DeleteMapping("/{resellerId}")
    ResponseEntity<Integer> deleteReseller(@PathVariable Integer resellerId) {
        resellerService.deleteResellerById(resellerId);
        return ResponseEntity.ok().body(resellerId);
    }

    @GetMapping("/exportorders")
    ResponseEntity<List<ExportOrder>> getExportOrderList() {
        return ResponseEntity.ok(exportOrderService.getAll());
    }

    @GetMapping("/exportorders/{exportOrderId}")
    ResponseEntity<?> getExportOrder(@PathVariable Integer exportOrderId) {
        ExportOrder exportOrder = exportOrderService.getById(exportOrderId);
        if (exportOrder == null)
            return ResponseEntity.badRequest().body("No such exportOrderId");
        return ResponseEntity.ok(exportOrder);
    }

    @PostMapping("/exportorders")
    ResponseEntity<?> createExportOrder(@RequestBody ExportOrder exportOrder) {
        exportOrderService.createExportOrder(exportOrder);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/exportorders")
    ResponseEntity<?> updateExportOrder(@RequestBody ExportOrder exportOrder) {
        exportOrderService.updateExportOrder(exportOrder);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/exportorders/shipping")
    ResponseEntity<?> getShippingMethodList(@RequestParam Double weight, @RequestParam String city) {
        List<ShippingMethod> shippingMethods = shippingMethodService.getAllShippingMethods(weight, city);
        return ResponseEntity.ok(shippingMethods);
    }
}
