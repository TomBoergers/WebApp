package com.springend.backend.Reader.CSVReader;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CSVRepo extends JpaRepository<CSVFile, Long> {



    CSVFile findCSVByID(long ID);

}
