package com.springend.backend.Nutzer;

import com.springend.backend.sysAdmin.SysAdmin;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NutzerService {

    private final NutzerRepo nutzerRepo;
    public NutzerService(NutzerRepo nutzerRepo) {
        this.nutzerRepo = nutzerRepo;
    }

    public Nutzer authenticateNutzer(String email, String password) throws Exception {

        Optional<Nutzer> optionalNutzer = Optional.ofNullable(nutzerRepo.findNutzerByEmail(email));

        if(optionalNutzer.isPresent()) {
            Nutzer nutzer = optionalNutzer.get();

            if(nutzer.getPassword().equals(password)) {
                return nutzer;
            } else {
                System.out.println("Falsches Passwort");
                throw new Exception("Falsches Passwort");
            }
        } else {
            System.out.println("Nutzer nicht gefunden");
            throw new Exception("Nutzer nicht gefunden");
        }
    }

    public Nutzer registerNutzer(Nutzer nutzer) {
        if (nutzerRepo.findNutzerByEmail(nutzer.getEmail()) != null) {
            throw new RuntimeException("Nutzer existiert bereits");
        } else {
            nutzerRepo.save(nutzer);
            return nutzer;
        }
    }

    public List<Nutzer> findAllNutzers() {
        return nutzerRepo.findAll();
    }

    public Nutzer findNutzerByEmail(String email) {
        return nutzerRepo.findNutzerByEmail(email);
    }

    public Nutzer addNutzer(Nutzer nutzer) {
        return nutzerRepo.save(nutzer);
    }

    public Nutzer acceptFriend(Nutzer nutzerToAdd, Nutzer nutzerFriendlist) throws Exception{
        if(nutzerFriendlist.getFriendlist().contains(nutzerToAdd.getID()) == false){
            nutzerFriendlist.getFriendlist().add(nutzerToAdd.getID());
            return nutzerFriendlist;
        }
        else{
            throw new Exception("Nutzer ist bereits dein Freund!");
        }
    }

    public Nutzer sendRequest(Nutzer nutzerToAdd, Nutzer nutzerFriendrequest) throws Exception{
        if(nutzerFriendrequest.getFriendrequests().contains(nutzerToAdd.getID()) == false){
            nutzerFriendrequest.getFriendrequests().add(nutzerToAdd.getID());
            return nutzerFriendrequest;
        }
        else{
            throw new Exception("Nutzer hat deine Anfrage bereits erhalten!");
        }
    }

    public Nutzer deleteFriend(Nutzer nutzerToDelete, Nutzer nutzerFriendlist) throws Exception {
        if(nutzerFriendlist.getFriendlist().contains(nutzerToDelete.getID()) == true){
            nutzerFriendlist.getFriendlist().remove(nutzerToDelete.getID());
        return nutzerFriendlist;
        }
        else{
            throw new Exception("Dieser Nutzer ist nicht dein Freund!");
        }
    }

    public String[][] showFriendlist(long ID) throws Exception {
        Nutzer nutzerFriendlist = nutzerRepo.findNutzerByID(ID);
        List<Long> friendlistalt = nutzerFriendlist.getFriendlist();
        String[][] friendlist = new String[nutzerFriendlist.getFriendlist().size()][3];
        if (nutzerFriendlist.isPrivacy()){
            for (int i = 0; i < nutzerFriendlist.getFriendlist().size(); i++) {
                Nutzer friend = nutzerRepo.findNutzerByID(friendlistalt.get(i));
                friendlist [i][0] = String.valueOf(friend.getID());
                friendlist [i][1] = friend.getVorname();
                friendlist [i][2] = friend.getNachname();
            }
            return friendlist;
        }
        else {
            throw new Exception("Der Nutzer hat seine Freundesliste auf privat gestellt.");
        }
    }

    public String[][] showFriendrequests(long ID) throws Exception {
        Nutzer nutzerFriendRequest = nutzerRepo.findNutzerByID(ID);
        List<Long> friendrequestalt = nutzerFriendRequest.getFriendrequests();
        String[][] friendrequests = new String[nutzerFriendRequest.getFriendrequests().size()][3];
            for (int i = 0; i < nutzerFriendRequest.getFriendrequests().size(); i++) {
                Nutzer friend = nutzerRepo.findNutzerByID(friendrequestalt.get(i));
                friendrequests [i][0] = String.valueOf(friend.getID());
                friendrequests [i][1] = friend.getVorname();
                friendrequests [i][2] = friend.getNachname();
            }
            return friendrequests;
    }
}