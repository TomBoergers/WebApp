package com.springend.backend.sysAdmin;

import com.springend.backend.Nutzer.Nutzer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/SysAdmin")
public class SysAdminController {

    private final SysAdminService SysAdminService;

    public SysAdminController(SysAdminService SysAdminService) {this.SysAdminService = SysAdminService;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody SysAdmin sysAdmin) {
        System.out.println(sysAdmin);
        try {
            SysAdmin authenticatedSysAdmin = SysAdminService.authenticateSysAdmin(sysAdmin.getEmail(), sysAdmin.getPassword());
            return ResponseEntity.ok().build();
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

}
