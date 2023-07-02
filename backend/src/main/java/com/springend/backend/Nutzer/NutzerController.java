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





        //Standard Methods
        @GetMapping("/all")
        public ResponseEntity<List<Nutzer>> getNutzers() {
            List<Nutzer> nutzers = nutzerService.findAllNutzers();
            return new ResponseEntity<>(nutzers, HttpStatus.OK);
        }
        @GetMapping("/get/{ID}")
        public Nutzer getNutzerByID(@PathVariable long ID){
            try{
                Nutzer nutzer = nutzerService.getUserbyID(ID);
                return nutzer;
            } catch(Exception e){
                return null;
            }
        }
        @GetMapping("/findUser/{email}")
        public Nutzer getNutzerByEmail(@RequestParam String email) {
            try {
                System.out.println("Controller: gefunden");
                return nutzerService.findNutzerByEmail(email);
            } catch (Exception e) {
                System.out.println("error");
                return null;
            }
        }
        @GetMapping("/getFavTable/{ID}")
        public ResponseEntity<Long> getFavTableID(@PathVariable long ID) {
        try{
            Long favTableID = nutzerService.getFavTable(ID);
            return new ResponseEntity<>(favTableID, HttpStatus.OK);
        } catch (Exception e) {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            return null;
        }
        }
        @PutMapping("/setFavTable")
        public ResponseEntity<Nutzer> setFavTableID(@RequestBody Nutzer nutzer, @RequestBody long favTableID){
        try{
            nutzerService.setFavTableID(nutzer.getID(),favTableID);
            return new ResponseEntity<>(nutzer, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        }
        @PostMapping("/add")
        public ResponseEntity<Nutzer> addNutzer(@RequestBody Nutzer nutzer) {
            Nutzer newNutzer = nutzerService.addNutzer(nutzer);
            return new ResponseEntity<>(newNutzer, HttpStatus.OK);
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


        //Login and Register Methods
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

        //Email Methods
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


        //Friendlist and Requests Methods
        @GetMapping("/allUsers")
        public ResponseEntity<String[][]> getUsers() {
            try {
                String[][] users = nutzerService.getAllUsers();
                return new ResponseEntity<>(users, HttpStatus.OK);
            } catch (Exception e) {
                throw new RuntimeException();
            }
        }
        @GetMapping("/getFriendRequests/{ID}")
        public ResponseEntity<String[][]> getNutzersRequests(@PathVariable long ID) {
            try {
                String[][] friendrequests = nutzerService.showFriendrequests(ID);
                return new ResponseEntity<>(friendrequests, HttpStatus.OK);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        @GetMapping("/getOwnFriendlist/{ID}")
        public ResponseEntity<String[][]> getOwnNutzersFriends(@PathVariable long ID) {
            try {
                String[][] friendlist = nutzerService.showOwnFriendlist(ID);
                return new ResponseEntity<>(friendlist, HttpStatus.OK);
            } catch (Exception e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        @GetMapping("/getFriendlist/{ID}")
        public ResponseEntity<String[][]> getNutzersFriends(@PathVariable long ID) {
            try {
                String[][] friendlist = nutzerService.showFriendlist(ID);
                return new ResponseEntity<>(friendlist, HttpStatus.OK);
            } catch (Exception e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        @GetMapping("/allFriends/{ID}")
        public ResponseEntity<List<Nutzer>> getFriends(@PathVariable long ID) throws Exception {
            List<Nutzer> nutzers = nutzerService.ownShowFriendlist(ID);
            return new ResponseEntity<>(nutzers, HttpStatus.OK);
        }
        @PutMapping  ("/sendRequest")
            public ResponseEntity<Nutzer> sendFriendrequest(@RequestBody Map<String, String> body) {
                try{
                    Nutzer nutzerReceivingRequest = nutzerService.findNutzerByEmail(body.get("friendEmail"));
                    Nutzer nutzerSendingRequest = nutzerService.findNutzerByEmail(body.get("ownEmail"));

                    if (nutzerReceivingRequest != null) {
                        nutzerService.sendRequest(nutzerSendingRequest,nutzerReceivingRequest);
                        emailService.freundschaftsanfrageVerschicken(nutzerReceivingRequest.getEmail());
                        return new ResponseEntity<>(nutzerReceivingRequest, HttpStatus.OK);
                    } else {
                        System.out.println("Nutzer nicht gefunden");
                        return ResponseEntity.notFound().build();
                    }
                } catch (Exception e){
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
            }
        @PutMapping("/acceptFriend")
        public ResponseEntity<Nutzer> acceptFriend(@RequestBody Map<String, String> body){
            try{
                Nutzer nutzerToAdd = nutzerService.findNutzerByEmail(body.get("friendEmail"));
                Nutzer nutzerFriendlist = nutzerService.findNutzerByEmail(body.get("ownEmail"));
                nutzerService.acceptFriend(nutzerToAdd,nutzerFriendlist);
                return new ResponseEntity<>(nutzerFriendlist, HttpStatus.OK);
            } catch (Exception e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        @PutMapping("/deleteFriend")
        public ResponseEntity<Nutzer> deleteFriend(@RequestBody Map<String, String> body){
            try{
                System.out.println("b1");
                Nutzer nutzerToDelete = nutzerService.findNutzerByEmail(body.get("friendEmail"));
                System.out.println("b2");
                Nutzer nutzerFriendList = nutzerService.findNutzerByEmail(body.get("ownEmail"));
                System.out.println("b3");
                nutzerService.deleteFriend(nutzerToDelete, nutzerFriendList);
                System.out.println("b4");
                return new ResponseEntity<>(nutzerFriendList, HttpStatus.OK);
            }catch (Exception e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        @PutMapping("/denyFriend")
        public ResponseEntity<Nutzer> denyFriend(@RequestBody Map<String, String> body){
            try{
                Nutzer nutzerToDeny = nutzerService.findNutzerByEmail(body.get("friendEmail"));
                Nutzer nutzerFriendlist = nutzerService.findNutzerByEmail(body.get("ownEmail"));

                nutzerService.denyFriend(nutzerToDeny, nutzerFriendlist);
                return new ResponseEntity<>(nutzerFriendlist, HttpStatus.OK);
            } catch (Exception e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
    }

        //Privacy Methods
        @PutMapping("/togglePrivacy")
        public ResponseEntity<Nutzer> togglePrivacy(@RequestBody Nutzer nutzer){
            try{
                nutzerService.togglePrivacy(nutzer.getEmail());
                return new ResponseEntity<>(nutzer, HttpStatus.OK);
            } catch (Exception e) {
                throw new RuntimeException();
            }
        }
        @GetMapping("/getPrivacy/{ID}")
        public Boolean getPrivacyByID(@PathVariable long ID){
            try{
                boolean privacy = nutzerService.getPrivacy(ID);
                return privacy;
            } catch(Exception e){
                return null;
            }
        }

        @PutMapping("/toggleProfilePrivacy")
        public ResponseEntity<Nutzer> toggleProfilePrivacy(@RequestBody Nutzer nutzer){
            try{
                nutzerService.toggleProfilePrivacy(nutzer.getEmail());
                return new ResponseEntity<>(nutzer, HttpStatus.OK);
            } catch (Exception e) {
                throw new RuntimeException();
            }
        }
        @GetMapping("/getProfilePrivacy/{ID}")
        public Boolean getProfilePrivacyByID(@PathVariable long ID){
            try{
                boolean privacy = nutzerService.getProfilePrivacy(ID);
                return privacy;
            } catch(Exception e){
                return null;
            }
    }

}


