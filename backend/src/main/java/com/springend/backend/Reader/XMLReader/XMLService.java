package com.springend.backend.Reader.XMLReader;


import com.springend.backend.Reader.XMLReader.XMLFile;
import com.springend.backend.Reader.XMLReader.XMLRepo;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class XMLService {
    private final XMLRepo xmlRepo;

    public XMLService(XMLRepo xmlRepo){this.xmlRepo = xmlRepo;}
    public List<XMLFile> findAllXML() {
        return xmlRepo.findAll();
    }

    public XMLFile addXML(String filepath, String name, String jahr){

        List<ArrayList<String>> dataList = new ArrayList<>();
        File f = new File(filepath);
        Document doc = null;


        try {
            // Create Doc
            SAXBuilder builder = new SAXBuilder();
            doc = builder.build(f);

            // Get Root Element and name
            Element root = doc.getRootElement();

            // Get Second Level Elements
            List<Element> items = root.getChildren();

            // Get column names
            List<Element> firstItem = items.get(0).getChildren();
            ArrayList<String> colNames =  new ArrayList<String>();
            for (Element col : firstItem){
                colNames.add(col.getName());
            }
            dataList.add(colNames);

            // Get data
            for (Element item : items) {
                ArrayList<String> row = new ArrayList<String>();
                for (Element col : item.getChildren()) {
                    row.add(col.getText());
                }
                dataList.add(row);
            }
        } catch (IOException | JDOMException e) {
            throw new RuntimeException(e);
        }
        XMLFile toSave = new XMLFile();
        toSave.setFilepath(filepath);
        toSave.setName(name);
        toSave.setJahr(jahr);
        toSave.setRecords(dataList);
        return xmlRepo.save(toSave);
    }

    public String[][] xmlNamesAndYears() {
        List<XMLFile> files = xmlRepo.findAll();
        XMLFile xmlFile;
        String[][] xmlNamesAndYears = new String[files.size()][4];
        for (int i = 0; i < files.size(); i++) {
            xmlFile = files.get(i);

            xmlNamesAndYears[i][0] = xmlFile.getName();
            xmlNamesAndYears[i][1] = xmlFile.getJahr();
            xmlNamesAndYears[i][2] = String.valueOf(xmlFile.getID());
            xmlNamesAndYears[i][3] = xmlFile.getIdentifier();
        }
        return xmlNamesAndYears;
    }

    public String[][] showXML (long ID) throws Exception {
        try {
            XMLFile xmlfile = xmlRepo.findXMLByID(ID);
            int length = xmlfile.getRecords().size();
            int width = xmlfile.getRecords().get(1).size();
            String[] data;
            String arrayToReturn[][] = new String[length][width];
            int i = 0;
            for (List<String> l: xmlfile.getRecords()) {
                arrayToReturn[i++] = l.toArray(new String[l.size()]);
            }
            return arrayToReturn;
        }
        catch (Exception e) {
            throw new Exception("Inhalt konnte nicht in ein Array umgwandelt werden.");
        }
    }

}
