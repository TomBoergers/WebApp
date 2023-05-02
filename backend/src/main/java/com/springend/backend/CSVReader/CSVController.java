package com.springend.backend.CSVReader;

import com.springend.backend.Nutzer.Nutzer;
import com.springend.backend.Nutzer.NutzerService;
import com.springend.backend.sysAdmin.SysAdminService;
import jakarta.persistence.Table;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/CSV")
public class CSVController {
    private final CSVService csvService;

    public CSVController(CSVService csvService) {
        this.csvService = csvService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<CSVFile>> getFiles() {
        List<CSVFile> files = csvService.findAllCSV();
        return new ResponseEntity<>(files, HttpStatus.OK);
    }



    @GetMapping ("/{ID}")
    public ResponseEntity<String[][]> showDataByID(@PathVariable long ID) {
        try {
            String[][] data = csvService.showCSV(ID);
            return new ResponseEntity<>(data, HttpStatus.OK);
        }

        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
