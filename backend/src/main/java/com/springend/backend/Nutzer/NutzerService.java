package com.springend.backend.Nutzer;

import com.springend.backend.Reader.CSVReader.CSVFile;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

        if (optionalNutzer.isPresent()) {
            Nutzer nutzer = optionalNutzer.get();

            if (nutzer.getPassword().equals(password)) {
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

    public void acceptFriend(Nutzer nutzerToAdd, Nutzer nutzerFriendlist) throws Exception {
        if (!nutzerFriendlist.getFriendlist().contains(nutzerToAdd.getID()) && nutzerFriendlist.getFriendrequests().contains(nutzerToAdd.getID())) {
            List<Long> neueListe = nutzerFriendlist.getFriendlist();
            neueListe.add(nutzerToAdd.getID());
            nutzerFriendlist.setFriendrequests(neueListe);
            nutzerRepo.save(nutzerFriendlist);
        } else {
            throw new Exception("Nutzer ist bereits dein Freund!");
        }
    }

    public void denyFriend(Nutzer nutzerToDeny, Nutzer nutzerFriendlist) throws Exception {
        if (!nutzerFriendlist.getFriendlist().contains(nutzerToDeny.getID()) && nutzerFriendlist.getFriendrequests().contains(nutzerToDeny.getID())) {
            List<Long> neueListe = nutzerFriendlist.getFriendlist();
            neueListe.remove(nutzerToDeny.getID());
            nutzerFriendlist.setFriendrequests(neueListe);
            nutzerRepo.save(nutzerFriendlist);
        } else {
            throw new Exception("Nutzer ist bereits dein Freund!");
        }
    }

    public void sendRequest(Nutzer nutzerSendingRequest, Nutzer nutzerReceivingRequest) throws Exception {
        if (!nutzerReceivingRequest.getFriendrequests().contains(nutzerSendingRequest.getID())&& !nutzerSendingRequest.getFriendrequests().contains(nutzerReceivingRequest.getID())) {
            List<Long> neueListe = nutzerReceivingRequest.getFriendrequests();
            neueListe.add(nutzerSendingRequest.getID());
            nutzerReceivingRequest.setFriendrequests(neueListe);
            nutzerRepo.save(nutzerReceivingRequest);
        } else {
            throw new Exception("Nutzer hat deine Anfrage bereits erhalten!");
        }
    }

        public void deleteFriend(Nutzer nutzerToDelete, Nutzer nutzerFriendlist) throws Exception {
        if (nutzerFriendlist.getFriendlist().contains(nutzerToDelete.getID())) {
            nutzerFriendlist.getFriendlist().remove(nutzerToDelete.getID());
            nutzerRepo.save(nutzerFriendlist);
        } else {
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
    /*public String[][] showOwnFriendlist(Nutzer nutzer) throws Exception {
        List<Long> friendsIds = nutzer.getFriendlist();
        String[][] friendlist = new String[friendsIds.size()][3];
        if (friendlist.length>0) {
            for (int i = 0; i < friendsIds.size(); i++) {
                Nutzer friend = nutzerRepo.findNutzerByID(friendsIds.get(i));
                friendlist[i][0] = String.valueOf(friend.getID());
                friendlist[i][1] = friend.getVorname();
                friendlist[i][2] = friend.getNachname();
            }
            return friendlist;
        } else {
            throw new Exception("Freundesliste nicht vorhanden");
        }
    }*/

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

    public String[][] getAllUsers() {
        List<Nutzer> nutzerList = nutzerRepo.findAll();
        String[][] users = new String[nutzerList.size()][2];

        for (int i = 0; i < nutzerList.size(); i++) {
            Nutzer nutzer = nutzerList.get(i);
            users[i][0] = nutzer.getVorname()+" "+nutzer.getNachname();
            users[i][1] = nutzer.getEmail();
        }

        return users;
    }

    public void togglePrivacy(long ID){
        Nutzer nutzer = nutzerRepo.findNutzerByID(ID);
        if(nutzer.isPrivacy()){
            nutzer.setPrivacy(false);
            nutzerRepo.save(nutzer);
        }
        else{
            nutzer.setPrivacy(true);
            nutzerRepo.save(nutzer);
        }
    }
}