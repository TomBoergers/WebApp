package com.springend.backend.Nutzer;

import com.springend.backend.ZweiFaktor.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/nutzer")
public class NutzerController {

    private final NutzerService nutzerService;
    private final EmailService emailService;
    private final HashMap<String, String> nutzerCodes = new HashMap<>();

    public NutzerController(NutzerService nutzerService, EmailService emailService) {
        this.nutzerService = nutzerService;
        this.emailService = emailService;
    }

        @PostMapping("/login")
        public ResponseEntity<Object> login(@RequestBody Nutzer nutzer) {
            try {
                Nutzer authenticatedNutzer = nutzerService.authenticateNutzer(nutzer.getEmail(), nutzer.getPassword());
                String code = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 999999));
                emailService.codeVerschicken(nutzer.getEmail(), code);
                nutzerCodes.put(nutzer.getEmail(),code);
                System.out.println("Der Code für " + nutzer.getEmail()+ " lautet "+code);
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        @PostMapping("/register")
        public ResponseEntity<Object> register(@RequestBody Nutzer nutzer) {
            System.out.println(nutzer);
            try {
                Nutzer registeredNutzer = nutzerService.registerNutzer(nutzer);
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        @PostMapping("/findUser")
        public ResponseEntity<Object> findNutzer(@RequestBody Nutzer nutzer) {
            try {
                Nutzer foundNutzer = nutzerService.findNutzerByEmail(nutzer.getEmail());
                return new ResponseEntity<>(foundNutzer, HttpStatus.OK);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        @GetMapping("/all")
        public ResponseEntity<List<Nutzer>> getNutzers() {
            List<Nutzer> nutzers = nutzerService.findAllNutzers();
            return new ResponseEntity<>(nutzers, HttpStatus.OK);
        }


        @PostMapping("/add")
        public ResponseEntity<Nutzer> addNutzer(@RequestBody Nutzer nutzer) {
            Nutzer newNutzer = nutzerService.addNutzer(nutzer);
            return new ResponseEntity<>(newNutzer, HttpStatus.OK);
        }

        @GetMapping("/find/{email}")
        public Nutzer findNutzerByEmail(@RequestParam String email) {
            try {
                System.out.println("Controller: gefunden");
                return nutzerService.findNutzerByEmail(email);
            } catch (Exception e) {
                System.out.println("error");
                return null;
            }
        }

        @PostMapping("/zweiFaktor")
        public ResponseEntity<Object> zweiFaktor(@RequestBody Map<String, String> body) {
            String email = body.get("email");
            String eingabeCode = body.get("code");
            if (nutzerCodes.containsKey(email) && nutzerCodes.get(email).equals(eingabeCode)) {
                return ResponseEntity.ok().build();
            } else {
                System.out.println("Code ist falsch");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
        @PostMapping("/erneutSenden")
        public ResponseEntity<Object> erneutSenden(@RequestBody Map<String, String> body) {
            try {
                String code = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 999999));
                emailService.codeVerschicken(body.get("email"), code);
                nutzerCodes.put(body.get("email"),code);
                System.out.println(code);
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        @PutMapping("/acceptFriend")
        public ResponseEntity<Nutzer> acceptFriend(@RequestBody Nutzer nutzerToAdd, Nutzer nutzerFriendlist){
            try{
            nutzerService.acceptFriend(nutzerToAdd,nutzerFriendlist);
            return new ResponseEntity<>(nutzerFriendlist, HttpStatus.OK);
            } catch (Exception e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        /*@PutMapping ("/sendRequest")
        public ResponseEntity<Nutzer> sendFriendrequest(@RequestBody Nutzer nutzerToAdd, Nutzer nutzerRequestlist) {
            try{
                nutzerService.sendRequest(nutzerToAdd,nutzerRequestlist);
                return new ResponseEntity<>(nutzerRequestlist, HttpStatus.OK);
            } catch (Exception e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }*/
        @PutMapping ("/sendRequest")
        public ResponseEntity<Nutzer> sendFriendrequest(@RequestBody Map<String, String> body) {
            try{
                Nutzer nutzerToAdd = nutzerService.findNutzerByEmail(body.get("friendEmail"));
                Nutzer nutzerRequestlist = nutzerService.findNutzerByEmail(body.get("ownEmail"));

                if (nutzerToAdd != null) {
                    nutzerService.sendRequest(nutzerToAdd,nutzerRequestlist);
                    emailService.freundschaftsanfrageVerschicken(nutzerToAdd.getEmail());
                    return new ResponseEntity<>(nutzerRequestlist, HttpStatus.OK);
                } else {
                    System.out.println("Nutzer nicht gefunden");
                    return ResponseEntity.notFound().build();
                }
            } catch (Exception e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }


        @PutMapping("/deleteFriend")
        public ResponseEntity<Nutzer> deleteFriend(@RequestBody Nutzer nutzerToDelete, Nutzer nutzerFriendList){
            try{
                nutzerService.deleteFriend(nutzerToDelete, nutzerFriendList);
                return new ResponseEntity<>(nutzerFriendList, HttpStatus.OK);
            }catch (Exception e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        @GetMapping("/getFriendlist/{ID}")
        public ResponseEntity<String[][]> getNutzersFriends(@RequestBody long ID) {
            try {
                String[][] friendlist = nutzerService.showFriendlist(ID);
                return new ResponseEntity<>(friendlist, HttpStatus.OK);
                } catch (Exception e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        /*@GetMapping("/ownFriendlist")
        public ResponseEntity<String[][]> getOwnFriends(@RequestBody String email) {
            try {
                Nutzer nutzer = nutzerService.findNutzerByEmail(email);
                String[][] friendlist = nutzerService.showOwnFriendlist(nutzer);
                return new ResponseEntity<>(friendlist, HttpStatus.OK);
            } catch (Exception e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }*/


        @GetMapping("/getFriendRequests/{ID}")
        public ResponseEntity<String[][]> getNutzersRequests(@RequestBody long ID) {
            try {
                String[][] friendrequests = nutzerService.showFriendrequests(ID);
                return new ResponseEntity<>(friendrequests, HttpStatus.OK);
            } catch (Exception e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        @GetMapping("/allUsers")
        public ResponseEntity<String[][]> getUsers() {
            try {
                String[][] users = nutzerService.getAllUsers();
                return new ResponseEntity<>(users, HttpStatus.OK);
            } catch (Exception e) {
                throw new RuntimeException();
            }
        }
}


