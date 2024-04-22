package com.example.resellerservice.repository;

import com.example.resellerservice.model.Reseller;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ResellerRepository extends JpaRepository<Reseller, Integer> {
}
