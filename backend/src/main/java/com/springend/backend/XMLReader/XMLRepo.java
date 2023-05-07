package com.springend.backend.XMLReader;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface XMLRepo extends JpaRepository<XMLFile, Long> {
    XMLFile findByID(long ID);
    XMLFile findByJahr(String jahr);
    XMLFile findByName(String name);
}
