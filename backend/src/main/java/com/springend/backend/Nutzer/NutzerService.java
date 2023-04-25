package com.springend.backend.Nutzer;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NutzerService {

    private final NutzerRepo nutzerRepo;

    public NutzerService(NutzerRepo nutzerRepo) {
        this.nutzerRepo = nutzerRepo;
    }

    public List<Nutzer> findAllNutzers() {
        return nutzerRepo.findAll();
    }

    public Nutzer findNutzerByID(Long userID) {
        return nutzerRepo.findNutzerByuserID(userID);
    }

    public Nutzer addNutzer(Nutzer nutzer) {
        return nutzerRepo.save(nutzer);
    }

    public void deleteNutzer(Long userID) {
        nutzerRepo.deleteById(userID);
    }
}
