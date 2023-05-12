package com.springend.backend.sysAdmin;

import com.springend.backend.Nutzer.Nutzer;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SysAdminService {

    private final SysAdminRepo SysAdminRepo;

    public SysAdminService(SysAdminRepo SysAdminRepo) {
        this.SysAdminRepo = SysAdminRepo;
    }

    public List<SysAdmin> findAllSysAdmin() {
        return SysAdminRepo.findAll();
    }

    public SysAdmin authenticateSysAdmin(String email, String password) throws Exception {

        Optional<SysAdmin> optionalSysAdmin = Optional.ofNullable(SysAdminRepo.findSysAdminByEmail(email));

        if(optionalSysAdmin.isPresent()) {
            SysAdmin sysAdmin = optionalSysAdmin.get();

            if(sysAdmin.getPassword().equals(password)) {
                return sysAdmin;
            } else {
                System.out.println("Falsches Passwort");
                throw new Exception("Falsches Passwort");
            }
        } else {
            System.out.println("Admin nicht gefunden");
            throw new Exception("Admin nicht gefunden");
        }
    }

    public SysAdmin registerSysAdmin(SysAdmin sysAdmin) {
        if (SysAdminRepo.findSysAdminByEmail(sysAdmin.getEmail()) != null) {
            throw new RuntimeException("Nutzer existiert bereits");
        } else {
            SysAdminRepo.save(sysAdmin);
            return sysAdmin;
        }
    }

    public SysAdmin findAdminByEmail(String email) {
        return SysAdminRepo.findSysAdminByEmail(email);
    }

    public void deleteSysAdmin(Long userID) {
        SysAdminRepo.deleteById(userID);
    }

    public SysAdmin addSysAdmin(SysAdmin SysAdmin) {
        return SysAdminRepo.save(SysAdmin);
    }
}