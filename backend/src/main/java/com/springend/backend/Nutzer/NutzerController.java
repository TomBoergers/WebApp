package com.springend.backend.Nutzer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/nutzer")
public class NutzerController {

        private final NutzerService nutzerService;

        public NutzerController(NutzerService nutzerService) {
            this.nutzerService = nutzerService;
        }

        @PostMapping("/login")
        public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
            String email = credentials.get("email");
            String password = credentials.get("password");
            Nutzer nutzer = nutzerService.findNutzerByemail(email);
            if (nutzer != null && nutzerService.checkPassword(password, nutzer)) {
                return ResponseEntity.ok("Der Login war erfolgreich");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        @GetMapping("/all")
        public ResponseEntity<List<Nutzer>> getNutzers() {
            List<Nutzer> nutzers = nutzerService.findAllNutzers();
            return new ResponseEntity<>(nutzers, HttpStatus.OK);
        }


        //@GetMapping("/find/{id}")
        //public ResponseEntity<Nutzer> getNutzerById(@PathVariable("id") Long nutzerID) {
            //Nutzer nutzer = nutzerService.findNutzerByID(nutzerID);
            //return new ResponseEntity<>(nutzer, HttpStatus.OK);
        //}

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
