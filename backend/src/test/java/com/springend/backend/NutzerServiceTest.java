package com.springend.backend;


import com.springend.backend.Nutzer.Nutzer;
import com.springend.backend.Nutzer.NutzerController;
import com.springend.backend.Nutzer.NutzerRepo;
import com.springend.backend.Nutzer.NutzerService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@Transactional
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class NutzerServiceTest {
    @Autowired NutzerService nutzerService;
    @Autowired NutzerRepo nutzerRepo;
    @Autowired NutzerController nutzerController;



    @Test
    void contextLoads() {
    }

    @Test
    @DisplayName("Test should pass when 2 people are added to request list")
    void shouldAdd2Request() throws Exception {
        Nutzer test1 = new Nutzer("Simon","Lenk","slenk01@outlook.de", LocalDate.of(2003,5,26),"12345", new ArrayList<Long>(), new ArrayList<Long>(), false, true);
        Nutzer test2 = new Nutzer("Phong","Nguyen","ritoisgeil2202@gmail.com", LocalDate.of(2002,8,22),"12345",  new ArrayList<Long>(),  new ArrayList<Long>(), false, true);
        Nutzer test3 = new Nutzer("Janice","Chiam","janiceyeewen@gmail.com", LocalDate.of(2000,2,2),"12345",  new ArrayList<Long>(),  new ArrayList<Long>(), false, true);
        nutzerService.addNutzer(test1);
        nutzerService.addNutzer(test2);
        nutzerService.addNutzer(test3);
        nutzerService.sendRequest(nutzerRepo.findNutzerByEmail("slenk01@outlook.de"), nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        nutzerService.sendRequest(nutzerRepo.findNutzerByEmail("ritoisgeil2202@gmail.com"), nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        Assertions.assertEquals(2, nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com").getFriendrequests().size());
    }

    @Test
    @DisplayName("Test should pass when a friend is deleted from the request list")
    void shouldDenyFriend() throws Exception {
        Nutzer test1 = new Nutzer("Simon","Lenk","slenk01@outlook.de", LocalDate.of(2003,5,26),"12345", new ArrayList<Long>(), new ArrayList<Long>(), false, true);
        Nutzer test2 = new Nutzer("Phong","Nguyen","ritoisgeil2202@gmail.com", LocalDate.of(2002,8,22),"12345",  new ArrayList<Long>(),  new ArrayList<Long>(), false, true);
        Nutzer test3 = new Nutzer("Janice","Chiam","janiceyeewen@gmail.com", LocalDate.of(2000,2,2),"12345",  new ArrayList<Long>(),  new ArrayList<Long>(), false, true);
        nutzerService.addNutzer(test1);
        nutzerService.addNutzer(test2);
        nutzerService.addNutzer(test3);
        nutzerService.sendRequest(nutzerRepo.findNutzerByEmail("slenk01@outlook.de"), nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        nutzerService.sendRequest(nutzerRepo.findNutzerByEmail("ritoisgeil2202@gmail.com"), nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        nutzerService.denyFriend(nutzerRepo.findNutzerByEmail("ritoisgeil2202@gmail.com"),  nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        Assertions.assertEquals(1, nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com").getFriendrequests().size());
    }

    @Test
    @DisplayName("Test should pass when two friend are added two the friendlist")
    void shouldAcceptFriends() throws Exception {
        Nutzer test1 = new Nutzer("Simon","Lenk","slenk01@outlook.de", LocalDate.of(2003,5,26),"12345", new ArrayList<Long>(), new ArrayList<Long>(), false, true);
        Nutzer test2 = new Nutzer("Phong","Nguyen","ritoisgeil2202@gmail.com", LocalDate.of(2002,8,22),"12345",  new ArrayList<Long>(),  new ArrayList<Long>(), false, true);
        Nutzer test3 = new Nutzer("Janice","Chiam","janiceyeewen@gmail.com", LocalDate.of(2000,2,2),"12345",  new ArrayList<Long>(),  new ArrayList<Long>(), false, true);
        nutzerService.addNutzer(test1);
        nutzerService.addNutzer(test2);
        nutzerService.addNutzer(test3);
        nutzerService.sendRequest(nutzerRepo.findNutzerByEmail("slenk01@outlook.de"), nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        nutzerService.sendRequest(nutzerRepo.findNutzerByEmail("ritoisgeil2202@gmail.com"), nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        nutzerService.acceptFriend(nutzerRepo.findNutzerByEmail("ritoisgeil2202@gmail.com"), nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        nutzerService.acceptFriend(nutzerRepo.findNutzerByEmail("slenk01@outlook.de"), nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        Assertions.assertEquals(2, nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com").getFriendlist().size());
    }

    @Test
    @DisplayName ("Test should pass when friend is deleted from both friendlists")
    void shouldDeleteFriend() throws Exception {
        Nutzer test1 = new Nutzer("Simon","Lenk","slenk01@outlook.de", LocalDate.of(2003,5,26),"12345", new ArrayList<Long>(), new ArrayList<Long>(), false, true);
        Nutzer test2 = new Nutzer("Phong","Nguyen","ritoisgeil2202@gmail.com", LocalDate.of(2002,8,22),"12345",  new ArrayList<Long>(),  new ArrayList<Long>(), false, true);
        Nutzer test3 = new Nutzer("Janice","Chiam","janiceyeewen@gmail.com", LocalDate.of(2000,2,2),"12345",  new ArrayList<Long>(),  new ArrayList<Long>(), false, true);
        nutzerService.addNutzer(test1);
        nutzerService.addNutzer(test2);
        nutzerService.addNutzer(test3);
        nutzerService.sendRequest(nutzerRepo.findNutzerByEmail("slenk01@outlook.de"), nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        nutzerService.sendRequest(nutzerRepo.findNutzerByEmail("ritoisgeil2202@gmail.com"), nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        nutzerService.acceptFriend(nutzerRepo.findNutzerByEmail("ritoisgeil2202@gmail.com"), nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        nutzerService.acceptFriend(nutzerRepo.findNutzerByEmail("slenk01@outlook.de"), nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        nutzerService.deleteFriend(nutzerRepo.findNutzerByEmail("slenk01@outlook.de"), nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com"));
        Assertions.assertEquals(1, nutzerRepo.findNutzerByEmail("janiceyeewen@gmail.com").getFriendlist().size());
        Assertions.assertEquals(0, nutzerRepo.findNutzerByEmail("slenk01@outlook.de").getFriendlist().size());
    }
}
