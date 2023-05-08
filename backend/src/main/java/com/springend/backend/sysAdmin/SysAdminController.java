package com.springend.backend.sysAdmin;


import com.springend.backend.Nutzer.Nutzer;
import com.springend.backend.Nutzer.NutzerService;
import com.springend.backend.ZweiFaktor.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/SysAdmin")
public class SysAdminController {


    private final SysAdminService SysAdminService;
    private final EmailService emailService;
    private final HashMap<String, String> sysAdminCodes = new HashMap<>();

    public SysAdminController(SysAdminService SysAdminService, EmailService emailService) {
        this.SysAdminService = SysAdminService;
        this.emailService = emailService;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody SysAdmin sysAdmin) {
        System.out.println(sysAdmin);
        try {
            SysAdmin authenticatedSysAdmin = SysAdminService.authenticateSysAdmin(sysAdmin.getEmail(), sysAdmin.getPassword());
            String code = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 999999));
            emailService.codeVerschicken(sysAdmin.getEmail(), code);
            sysAdminCodes.put(sysAdmin.getEmail(), code);
            System.out.println(code);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/findAdmin")
    public ResponseEntity<Object> findAdmin(@RequestBody SysAdmin sysAdmin) {
        try {
            SysAdmin foundAdmin = SysAdminService.findAdminByEmail(sysAdmin.getEmail());
            return new ResponseEntity<>(foundAdmin, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @GetMapping("/all")
    public ResponseEntity<List<SysAdmin>> getSysAdmin() {
        List<SysAdmin> SysAdmins = SysAdminService.findAllSysAdmin();
        return new ResponseEntity<>(SysAdmins, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<SysAdmin> addSysAdmin(@RequestBody SysAdmin SysAdmin) {
        SysAdmin newSysAdmin = SysAdminService.addSysAdmin(SysAdmin);
        return new ResponseEntity<>(newSysAdmin, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{ID}")
    public ResponseEntity<?> deleteSysAdmin(@PathVariable("ID") long ID) {
        SysAdminService.deleteSysAdmin(ID);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/zweiFaktor")
    public ResponseEntity<Object> zweiFaktor(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String eingabeCode = body.get("code");
        System.out.println(email);
        System.out.println(sysAdminCodes.get(email));
        System.out.println(eingabeCode);
        // Überprüfe, ob der Code in der HashMap gespeichert wurde und ob er mit dem eingegebenen Code übereinstimmt
        if (sysAdminCodes.containsKey(email) && sysAdminCodes.get(email).equals(eingabeCode)) {
            return ResponseEntity.ok().build();
        } else {
            System.out.println("Code ist falsch");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
