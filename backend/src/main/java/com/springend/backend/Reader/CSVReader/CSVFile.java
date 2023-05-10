package com.springend.backend.Reader.CSVReader;


import com.springend.backend.Reader.AbstractFile;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
public class CSVFile extends AbstractFile {




    private String filepath;

    @ElementCollection
    List<String> records = new ArrayList<String>();

    private int amountOfFields;

    private String delimiter;

    private String name;

    private String jahr;

    private String identifier = "csv";


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

    public String getIdentifier(){
        return identifier;
    }

    @Override
    public String toString() {
        return "CSVFile{" +
                "filepath='" + filepath + '\'' +
                ", records=" + records +
                ", amountOfFields=" + amountOfFields +
                ", delimiter='" + delimiter + '\'' +
                ", name='" + name + '\'' +
                ", jahr='" + jahr + '\'' +
                ", identifier='" + identifier + '\'' +
                '}';
    }
}



