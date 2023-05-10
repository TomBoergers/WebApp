package com.springend.backend.Reader.XMLReader;

import com.springend.backend.Reader.AbstractFile;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class XMLFile extends AbstractFile {



    private String filepath;

    private String name;

    private String jahr;

    private String identifier = "xml";

    @ElementCollection
    List<ArrayList<String>> records = new ArrayList<>();

    public XMLFile(){

    }
    public XMLFile(String filepath, String name, String jahr, List<ArrayList<String>> records){
        this.filepath = filepath;
        this.name = name;
        this.jahr = jahr;
        this.records = records;
    }


    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJahr() {
        return jahr;
    }

    public void setJahr(String jahr) {
        this.jahr = jahr;
    }

    public List<ArrayList<String>> getRecords() {
        return records;
    }

    public void setRecords(List<ArrayList<String>> records) {
        this.records = records;
    }

    public String getIdentifier(){
        return identifier;
    }
}
