package com.springend.backend.sysAdmin;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/sysadmin")
public class sysadminController {

    private final sysadminService sysadminService;

    public sysadminController(sysadminService sysadminService) {
        this.sysadminService = sysadminService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<sysadmin>> getsysadmin() {
        List<sysadmin> sysadmins = sysadminService.findAllsysadmin();
        return new ResponseEntity<>(sysadmins, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<sysadmin> addsysadmin(@RequestBody sysadmin sysadmin) {
        sysadmin newsysadmin = sysadminService.addsysadmin(sysadmin);
        return new ResponseEntity<>(newsysadmin, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{ID}")
    public ResponseEntity<?> deletesysadmin(@PathVariable("ID") long ID) {
        sysadminService.deletesysadmin(ID);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
