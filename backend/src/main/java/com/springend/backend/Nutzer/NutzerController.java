package com.springend.backend.Nutzer;

import com.springend.backend.ZweiFaktor.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/nutzer")
public class NutzerController {

        private final NutzerService nutzerService;
    private final EmailService emailService;

    public NutzerController(NutzerService nutzerService, EmailService emailService) {
            this.nutzerService = nutzerService;
        this.emailService = emailService;
    }

        @PostMapping("/login")
        public ResponseEntity<Object> login(@RequestBody Nutzer nutzer) {
            System.out.println(nutzer);
            try {
                Nutzer authenticatedNutzer = nutzerService.authenticateNutzer(nutzer.getEmail(), nutzer.getPassword());
                int code = ThreadLocalRandom.current().nextInt(100000, 999999);
                emailService.codeVerschicken(nutzer.getEmail(), String.valueOf(code));
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        @PostMapping("/register")
        public ResponseEntity<Object> register(@RequestBody Nutzer nutzer) {
            System.out.println(nutzer);
            try {
                Nutzer registeredNutzer = nutzerService.registerNutzer(nutzer);
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        @PostMapping("/findUser")
        public ResponseEntity<Object> findNutzer(@RequestBody Nutzer nutzer) {
            try {
                Nutzer foundNutzer = nutzerService.findNutzerByEmail(nutzer.getEmail());
                return new ResponseEntity<>(foundNutzer, HttpStatus.OK);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        @GetMapping("/all")
        public ResponseEntity<List<Nutzer>> getNutzers() {
            List<Nutzer> nutzers = nutzerService.findAllNutzers();
            return new ResponseEntity<>(nutzers, HttpStatus.OK);
        }


        @PostMapping("/add")
        public ResponseEntity<Nutzer> addNutzer(@RequestBody Nutzer nutzer) {
            Nutzer newNutzer = nutzerService.addNutzer(nutzer);
            return new ResponseEntity<>(newNutzer, HttpStatus.OK);
        }

        @DeleteMapping("/delete/{ID}")
        public ResponseEntity<?> deleteNutzer(@PathVariable("ID") long ID) {
            nutzerService.deleteNutzer(ID);
            return new ResponseEntity<>(HttpStatus.OK);
        }


    }


