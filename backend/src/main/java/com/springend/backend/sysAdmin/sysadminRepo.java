package com.springend.backend.sysAdmin;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface sysadminRepo extends JpaRepository<sysadmin, Long> {


    sysadmin findsysadminByemail(String email);
}
