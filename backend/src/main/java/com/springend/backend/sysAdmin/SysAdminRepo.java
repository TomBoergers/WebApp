package com.springend.backend.sysAdmin;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface SysAdminRepo extends JpaRepository<SysAdmin, Long>  {
    SysAdmin findSysAdminByID(Long ID);

    SysAdmin findSysAdminByEmail(String email);
}
