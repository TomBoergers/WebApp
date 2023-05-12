package com.springend.backend.Nutzer;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NutzerService {

    private final NutzerRepo nutzerRepo;
    public NutzerService(NutzerRepo nutzerRepo) {
        this.nutzerRepo = nutzerRepo;
    }

    public Nutzer authenticateNutzer(String email, String password) throws Exception {

        Optional<Nutzer> optionalNutzer = Optional.ofNullable(nutzerRepo.findNutzerByEmail(email));

        if(optionalNutzer.isPresent()) {
            Nutzer nutzer = optionalNutzer.get();

            if(nutzer.getPassword().equals(password)) {
                return nutzer;
            } else {
                System.out.println("Falsches Passwort");
                throw new Exception("Falsches Passwort");
            }
        } else {
            System.out.println("Nutzer nicht gefunden");
            throw new Exception("Nutzer nicht gefunden");
        }
    }

    public Nutzer registerNutzer(Nutzer nutzer) {
        if (nutzerRepo.findNutzerByEmail(nutzer.getEmail()) != null) {
            throw new RuntimeException("Nutzer existiert bereits");
        } else {
            nutzerRepo.save(nutzer);
            return nutzer;
        }
    }

    public List<Nutzer> findAllNutzers() {
        return nutzerRepo.findAll();
    }

    public Nutzer findNutzerByEmail(String email) {
        return nutzerRepo.findNutzerByEmail(email);
    }

    public Nutzer addNutzer(Nutzer nutzer) {
        return nutzerRepo.save(nutzer);
    }

    public void deleteNutzer(Long userID) {
        nutzerRepo.deleteById(userID);
    }
}