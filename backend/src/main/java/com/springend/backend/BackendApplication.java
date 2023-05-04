package com.springend.backend;

import com.springend.backend.CSVReader.CSVController;
import com.springend.backend.CSVReader.CSVRepo;
import com.springend.backend.CSVReader.CSVService;
import com.springend.backend.Nutzer.Nutzer;
import com.springend.backend.Nutzer.NutzerRepo;
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
    CommandLineRunner init(NutzerRepo nutzerRepo) {

        return args -> {
            nutzerRepo.save(new Nutzer("Test","Name","test@gmail.com", LocalDate.of(1999,1,1),"12345"));

        };
    }
    @Bean
    CommandLineRunner init2(SysAdminRepo sysAdminRepo) {
      return args -> {
          sysAdminRepo.save(new SysAdmin("Test1","Name1","test1@gmail.com","123456"));
      };
    }

    @Bean
    CommandLineRunner init3(CSVService csvService, CSVRepo csvRepo){

        return args -> {
          csvService.addCSV("C:\\Users\\Tom\\IdeaProjects\\gruppe-f-git\\backend\\src\\main\\java\\com\\springend\\backend\\Datentabellen\\aachenvornamen2021-commasep-decimalpoint.csv",4,",","Vornamen der Stadt Aachen","2021");
          csvService.addCSV("C:\\Users\\Tom\\IdeaProjects\\gruppe-f-git\\backend\\src\\main\\java\\com\\springend\\backend\\Datentabellen\\strassennamen.csv",4,",","Strassenliste der Stadt Aachen","2021");


        };

    }



}
