package com.springend.backend.sysAdmin;

import com.springend.backend.Nutzer.Nutzer;
import com.springend.backend.Nutzer.NutzerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class sysadminService {

    private final sysadminRepo sysadminRepo;

    public sysadminService(sysadminRepo sysadminRepo) {
        this.sysadminRepo = sysadminRepo;
    }

    public List<sysadmin> findAllsysadmin() {
        return sysadminRepo.findAll();
    }

    public sysadmin findsysadminByemail(String email) {
        return sysadminRepo.findsysadminByemail(email);
    }

    public boolean checkPassword(String password, sysadmin sysadmin) {
        if(password.equals(sysadmin.getPassword())){
            return true;
        } else {
            return false;
        }
    }

    public sysadmin addsysadmin(sysadmin sysadmin) {
        return sysadminRepo.save(sysadmin);
    }

    public void deletesysadmin(Long ID) {
        sysadminRepo.deleteById(ID);
    }


}
