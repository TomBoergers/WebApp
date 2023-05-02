package com.springend.backend.CSVReader;

import com.springend.backend.Nutzer.Nutzer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CSVRepo extends JpaRepository<CSVFile, Long> {



    CSVFile findCSVByID(long ID);

}
