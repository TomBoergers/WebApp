package com.springend.backend.Reader.CSVReader;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;

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

    @GetMapping("/allNamesAndYears")
    public ResponseEntity<String[][]> getNamesAndYears() {
        try {
            String[][] namesAndYears = csvService.namesAndYears();
            return new ResponseEntity<>(namesAndYears, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

    @GetMapping("/nameAndYear/{ID}")
    public ResponseEntity<String []> getNameAndYear(@PathVariable long ID) {
        try {
            String[] nameAndYear = csvService.nameAndYear(ID);
            return new ResponseEntity<>(nameAndYear, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

    @GetMapping ("/{ID}")
    public ResponseEntity<String[][]> showDataByID(@PathVariable long ID) {
        try {
            String[][] data = csvService.showCSV(ID);
            return new ResponseEntity<>(data, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/editTable/{ID}")
    public ResponseEntity<String[][]> editTableByID(@PathVariable long ID, @RequestBody Map<String, String> requestData) {
        String newName = requestData.get("newName");
        String newYear = requestData.get("newYear");

        try {
            String[][] updatedTable = csvService.updateTable(ID, newName, newYear);
            return new ResponseEntity<>(updatedTable, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

    @PutMapping("/editContent/{ID}")
    public ResponseEntity<CSVFile> editContent(@PathVariable long ID, @RequestBody String[][] csvFileRecords) {
        try {
            CSVFile csvFile = csvService.editContent(ID, csvFileRecords);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
