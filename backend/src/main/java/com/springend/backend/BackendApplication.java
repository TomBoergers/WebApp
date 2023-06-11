package com.springend.backend;

import com.springend.backend.Nutzer.NutzerService;
import com.springend.backend.Reader.CSVReader.CSVService;
import com.springend.backend.Nutzer.Nutzer;
import com.springend.backend.Nutzer.NutzerRepo;
import com.springend.backend.Reader.XMLReader.XMLService;
import com.springend.backend.sysAdmin.SysAdmin;
import com.springend.backend.sysAdmin.SysAdminRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


import java.time.LocalDate;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner init(NutzerRepo nutzerRepo, SysAdminRepo sysAdminRepo, NutzerService nutzerService) {
        return args -> {
            nutzerRepo.save(new Nutzer("Test","Name","test@gmail.com", LocalDate.of(1999,1,1),"12345", null, null, false));
            nutzerRepo.save(new Nutzer("Test2","Name2","test2@gmail.com", LocalDate.of(1999,1,1),"12345", null, null, false));
            nutzerRepo.save(new Nutzer("Simon","Lenk","slenk01@outlook.de", LocalDate.of(2003,5,26),"12345", null, null, false));
            nutzerRepo.save(new Nutzer("Janice","Chiam","janiceyeewen@gmail.com", LocalDate.of(2000,2,2),"12345", null, null, false));
            nutzerRepo.save(new Nutzer("Tom","Börgers","steamboy445@gmail.com", LocalDate.of(2003,3,2),"12345", null, null, false));
            nutzerRepo.save(new Nutzer("Phong","Nguyen","ritoisgeil2202@gmail.com", LocalDate.of(2002,8,22),"12345", null, null, false));
            sysAdminRepo.save(new SysAdmin("Test1","Name1","test1@gmail.com","123456"));

        };
    }

    @Bean
    CommandLineRunner init2(CSVService csvService, XMLService xmlService) {
        return args -> {
            csvService.addCSV("backend/src/main/java/com/springend/backend/Datentabellen/aachenvornamen2021-commasep-decimalpoint.csv", 4, ",", "Vornamen der Stadt Aachen", "2021");
            csvService.addCSV("backend/src/main/java/com/springend/backend/Datentabellen/sterbefalle-monatlich-2015_2022.csv", 9, ",", "Sterbefälle", "2015-2022");
            csvService.addCSV("backend/src/main/java/com/springend/backend/Datentabellen/anzahl-der-arbeitslosen-in-der-stadteregion-aachen22.csv", 5, ";", "Anzahl der Arbeitslosen", "2022");
            csvService.addCSV("backend/src/main/java/com/springend/backend/Datentabellen/anzahl-der-arbeitssuchenden-in-der-stadteregion-aachen22.csv", 5, ";", "Anzahl der Arbeitssuchenden", "2022");
            csvService.addCSV("backend/src/main/java/com/springend/backend/Datentabellen/geburten-monatlich-2015_2022.csv", 9, ",", "Geburten", "2015-2022");
            csvService.addCSV("backend/src/main/java/com/springend/backend/Datentabellen/strassennamen.csv", 4, ",", "Strassenliste der Stadt Aachen", "2021");
            xmlService.addXML("backend/src/main/java/com/springend/backend/Datentabellen/CDTest.xml", "CDTest", "2000");
            xmlService.addXML("backend/src/main/java/com/springend/backend/Datentabellen/FoodMenuTest.xml", "Food Menu", "2000");
        };
    }


}