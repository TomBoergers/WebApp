package com.springend.backend.XMLReader;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class XMLFile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long ID;

    String filepath;

    String name;

    String jahr;

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

    public long getID() {
        return ID;
    }

    public void setID(long ID) {
        this.ID = ID;
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
}
