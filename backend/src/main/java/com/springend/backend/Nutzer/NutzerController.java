package com.springend.backend.Nutzer;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/nutzer")
public class NutzerController {

        private final NutzerService nutzerService;

        public NutzerController(NutzerService nutzerService) {
            this.nutzerService = nutzerService;
        }

        @GetMapping("/all")
        public ResponseEntity<List<Nutzer>> getNutzers() {
            List<Nutzer> nutzers = nutzerService.findAllNutzers();
            return new ResponseEntity<>(nutzers, HttpStatus.OK);
        }


        @GetMapping("/find/{id}")
        public ResponseEntity<Nutzer> getNutzerById(@PathVariable("id") Long userID) {
            Nutzer nutzer = nutzerService.findNutzerByID(userID);
            return new ResponseEntity<>(nutzer, HttpStatus.OK);

        }

        @PostMapping("/add")
        public ResponseEntity<Nutzer> addNutzer(@RequestBody Nutzer nutzer) {
            Nutzer newNutzer = nutzerService.addNutzer(nutzer);
            return new ResponseEntity<>(newNutzer, HttpStatus.OK);
        }

        @DeleteMapping("/delete/{nutzerID}")
        public ResponseEntity<?> deleteNutzer(@PathVariable("nutzerID") long userID) {
            nutzerService.deleteNutzer(userID);
            return new ResponseEntity<>(HttpStatus.OK);
        }
}
