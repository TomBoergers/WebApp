package com.springend.backend;

import com.springend.backend.Nutzer.Nutzer;
import com.springend.backend.Nutzer.NutzerController;
import com.springend.backend.Nutzer.NutzerService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.ArrayList;

import static org.mockito.Mockito.when;

public class NutzerControllerTest {

    @Test
    void getNutzerByEmail() {
        NutzerService nutzerService = Mockito.mock(NutzerService.class);
        NutzerController nutzerController = new NutzerController(nutzerService, null);
        Nutzer n = new Nutzer("Simon", "Lenk", "slenk01@outlook.de", LocalDate.of(2003, 5, 26), "12345", new ArrayList<Long>(), new ArrayList<Long>(), false, false);
        when(nutzerService.findNutzerByEmail("slenk01@outlook.de")).thenReturn(n);
        Assertions.assertEquals(nutzerController.getNutzerByEmail("slenk01@outlook.de"), n);
    }


}
