package com.springend.backend.CSVReader;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
public class CSVFile {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long ID;

    private String filepath;

    @ElementCollection
    List<String> records = new ArrayList<String>();

    private int amountOfFields;

    private String delimiter;

    private String name;

    private String jahr;


    public CSVFile() {
    }

    public CSVFile(String filepath, List<String> records,int amountOfFields, String delimiter, String name, String jahr) {
    this.filepath = filepath;
    this.records = records;
    this.amountOfFields = amountOfFields;
    this.delimiter = delimiter;
    this.name = name;
    this.jahr = jahr;
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public List<String> getRecords() {
        return records;
    }

    public void setRecords(List<String> records) {
        this.records = records;
    }

    public int getAmountOfFields() {
        return amountOfFields;
    }

    public void setAmountOfFields(int amountOfFields) {
        this.amountOfFields = amountOfFields;
    }

    public long getID() {
        return ID;
    }

    public void setID(long ID) {
        this.ID = ID;
    }

    public String getDelimiter() {
        return delimiter;
    }

    public void setDelimiter(String delimiter) {
        this.delimiter = delimiter;
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
}



