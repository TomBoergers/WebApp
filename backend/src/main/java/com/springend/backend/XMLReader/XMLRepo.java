package com.springend.backend.XMLReader;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface XMLRepo extends JpaRepository<XMLFile, Long> {
    XMLFile findXMLByID(long ID);
    XMLFile findXMLByJahr(String jahr);
    XMLFile findXMLByName(String name);
}
