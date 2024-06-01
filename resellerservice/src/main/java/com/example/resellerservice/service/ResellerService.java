package com.example.resellerservice.service;

import com.example.resellerservice.model.Reseller;
import com.example.resellerservice.repository.ResellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResellerService {
    private final ResellerRepository resellerRepository;

    @Autowired
    public ResellerService(ResellerRepository resellerRepository) {
        this.resellerRepository = resellerRepository;
    }

    public List<Reseller> getAll() {
        return resellerRepository.findAll();
    }

    public Reseller getResellerById(int resellerId) {
        return resellerRepository.findById(resellerId).orElse(null);
    }

    public Reseller createReseller(Reseller reseller) {
        return resellerRepository.save(reseller);
    }

    public Reseller updateReseller(Reseller reseller) {
        return resellerRepository.save(reseller);
    }

    public void deleteResellerById(int resellerId) {
        resellerRepository.deleteById(resellerId);
    }
}
