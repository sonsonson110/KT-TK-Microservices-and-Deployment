package com.example.resellerservice.controller;

import com.example.resellerservice.model.Reseller;
import com.example.resellerservice.service.ResellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resellers")
public class ResellerController {
    @Autowired
    ResellerService resellerService;

    @GetMapping
    ResponseEntity<List<Reseller>> getAllResellers() {
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
}
