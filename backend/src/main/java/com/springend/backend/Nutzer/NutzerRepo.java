package com.springend.backend.Nutzer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NutzerRepo extends JpaRepository<Nutzer, Long> {

    Nutzer findNutzerByuserID(Long userID);
}