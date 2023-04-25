package com.springend.backend.Nutzer;

import org.springframework.beans.factory.annotation.Autowired;
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

    public Nutzer findNutzerByemail(String email) {
        return nutzerRepo.findNutzerByemail(email);
    }

    public boolean checkPassword(String password, Nutzer nutzer) {
        if(password.equals(nutzer.getPassword())){
            return true;
        } else {
            return false;
        }
    }

    public Nutzer addNutzer(Nutzer nutzer) {
        return nutzerRepo.save(nutzer);
    }

    public void deleteNutzer(Long userID) {
        nutzerRepo.deleteById(userID);
    }
}
