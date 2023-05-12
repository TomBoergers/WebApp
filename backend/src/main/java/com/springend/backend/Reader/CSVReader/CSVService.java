package com.springend.backend.Reader.CSVReader;

import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class CSVService {

    private final CSVRepo csvRepo;
    public CSVService(CSVRepo csvRepo){this.csvRepo = csvRepo;}

    public List<CSVFile> findAllCSV() {
        return csvRepo.findAll();
    }

    public CSVFile findCSVByID(Long ID) {
        return csvRepo.findCSVByID(ID);
    }

    public CSVFile addCSV(String filepath, int amountOfFields, String delimiter, String name, String jahr) {
        CSVFile toSave = new CSVFile();
        toSave.setFilepath(filepath);
        toSave.setAmountOfFields(amountOfFields);
        toSave.setDelimiter(delimiter);
        toSave.setName(name);
        toSave.setJahr(jahr);

        List<String> records = new ArrayList<String>();

        String line = "";

        try {
            BufferedReader reader = new BufferedReader(new FileReader(filepath));
            while ((line = reader.readLine()) != null) {
                records.add(line);
            }
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
        toSave.setRecords(records);
        return csvRepo.save(toSave);
    }

    public String[][] showCSV(long ID) throws Exception {
        try {
            CSVFile csvfile = csvRepo.findCSVByID(ID);
            int count = csvfile.getRecords().size();
            String delimiter = csvfile.getDelimiter();
            String[] data;
            String arrayToReturn[][] = new String[count][csvfile.getAmountOfFields()];
            for (int i = 0; i < count; i++) {
                data = csvfile.getRecords().get(i).split(delimiter);
                for (int j = 0; j < data.length; j++) {
                    arrayToReturn[i][j] = data[j];
                }
            }
         return arrayToReturn;
        }
        catch (Exception e) {
            throw new Exception("Inhalt konnte nicht in ein Array umgwandelt werden.");
        }
    }

    public String[][] namesAndYears() {
        List<CSVFile> files = csvRepo.findAll();
        CSVFile csvfile;
        String[][] namesAndYears = new String[files.size()][4];
        for (int i = 0; i < files.size(); i++) {
            csvfile = files.get(i);

            namesAndYears[i][0] = csvfile.getName();
            namesAndYears[i][1] = csvfile.getJahr();
            namesAndYears[i][2] = String.valueOf(csvfile.getID());
            namesAndYears[i][3] = csvfile.getIdentifier();
        }
        return namesAndYears;
    }

    public String[] nameAndYear(Long ID) {
        CSVFile files = csvRepo.findCSVByID(ID);
        System.out.println(files);
        String[] nameAndYear = new String[4];
        nameAndYear[0] = files.getName();
        nameAndYear[1] = files.getJahr();
        nameAndYear[2] = String.valueOf(files.getID());
        nameAndYear[3] = files.getIdentifier();
        return nameAndYear;
    }

    public String[][] updateTable(Long ID, String newName, String newYear) {
        CSVFile csvFile = csvRepo.findCSVByID(ID);
        System.out.println(csvFile);
        csvFile.setName(newName);
        csvFile.setJahr(newYear);
        csvRepo.save(csvFile);
        try {
            return showCSV(ID);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public CSVFile editContent(Long ID, String[][] csvRecords) {
        CSVFile csvFile = csvRepo.findCSVByID(ID);
        List<String> newRecords = new ArrayList<>();

        for (String[] row : csvRecords) {
            String newRecord = String.join(",", row);
                newRecords.add(newRecord);
            }

        csvFile.setRecords(newRecords);
        csvRepo.save(csvFile);

        try {
            return csvFile;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}