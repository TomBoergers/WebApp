package com.springend.backend.Reader.XMLReader;

import com.springend.backend.Reader.CSVReader.CSVFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/nameAndYear/{ID}")
    public ResponseEntity<String[]> getNameAndYear(@PathVariable long ID) {
        try {
            String[] nameAndYear = xmlService.getNameAndYear(ID);
            return new ResponseEntity<>(nameAndYear, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

    @PostMapping("/editTable/{ID}")
    public ResponseEntity<String[][]> editTableByID(@PathVariable long ID, @RequestBody Map<String, String> requestData) {
        String newName = requestData.get("newName");
        String newYear = requestData.get("newYear");

        try {
            String[][] updatedTable = xmlService.updateTable(ID, newName, newYear);
            return new ResponseEntity<>(updatedTable, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

    @PutMapping("/editContent/{ID}")
    public ResponseEntity<CSVFile> editContent(@PathVariable long ID, @RequestBody String[][] xmlFileRecords) {
        try {
            XMLFile xmlFile = xmlService.editContent(ID, xmlFileRecords);
            xmlService.editContent(ID,xmlFileRecords);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
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