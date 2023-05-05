package com.springend.backend.CSVReader;

import com.springend.backend.Nutzer.Nutzer;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CSVService {
    private final CSVRepo csvRepo;

    public CSVService(CSVRepo csvRepo){this.csvRepo = csvRepo;}
    public List<CSVFile> findAllCSV() {
        return csvRepo.findAll();
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
            throw new Exception("Kaputt");
        }
    }
    public String[][] namesAndYears() {
            List<CSVFile> files = csvRepo.findAll();
            CSVFile csvfile;
            String[][] namesAndYears = new String[files.size()][3];
            for (int i = 0; i < files.size(); i++) {
                csvfile = files.get(i);


                namesAndYears[i][0] = String.valueOf(csvfile.getID());
                namesAndYears[i][1] = csvfile.getName();
                namesAndYears[i][2] = csvfile.getJahr();
        }
            return namesAndYears;
    }
}
