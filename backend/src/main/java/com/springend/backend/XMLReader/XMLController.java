package com.springend.backend.XMLReader;

import com.springend.backend.CSVReader.CSVFile;
import com.springend.backend.CSVReader.CSVService;
import jakarta.persistence.Id;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/XML")
public class XMLController {

    private final XMLService xmlService;

    public XMLController(XMLService xmlService) {
        this.xmlService = xmlService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<XMLFile>> getFiles() {
        List<XMLFile> files = xmlService.findAllXML();
        return new ResponseEntity<>(files, HttpStatus.OK);
    }
    @GetMapping("/allNamesAndYears")
    public ResponseEntity<String[][]> getNamesAndYears() {
        try {
            String[][] namesAndYears = xmlService.xmlNamesAndYears();
            return new ResponseEntity<>(namesAndYears, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }
    @GetMapping("/{ID}")
    public ResponseEntity<String[][]> getRecordsByID (@PathVariable long ID){
        try {
            String[][] data = xmlService.showXML(ID);
            return new ResponseEntity<>(data, HttpStatus.OK);
        }
        catch (Exception e){
            throw new RuntimeException();
        }
    }



}
