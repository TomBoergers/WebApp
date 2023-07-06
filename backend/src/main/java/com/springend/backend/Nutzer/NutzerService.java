package com.springend.backend.Nutzer;
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


        // Standard Methods
        public Nutzer getUserbyID(long ID){
            Nutzer nutzer = nutzerRepo.findNutzerByID(ID);
            return nutzer;
        }
        public List<Nutzer> findAllNutzers() {
            return nutzerRepo.findAll();
        }
        public String[][] getAllUsers() {
            List<Nutzer> nutzerList = nutzerRepo.findAll();
            String[][] users = new String[nutzerList.size()][3];

            for (int i = 0; i < nutzerList.size(); i++) {
                Nutzer nutzer = nutzerList.get(i);
                users[i][0] = nutzer.getVorname()+" "+nutzer.getNachname();
                users[i][1] = nutzer.getEmail();
                users[i][2]= String.valueOf(nutzer.getID());
            }

            return users;
        }
        public Nutzer findNutzerByEmail(String email) {
            return nutzerRepo.findNutzerByEmail(email);
        }
        public Nutzer addNutzer(Nutzer nutzer) {
            return nutzerRepo.save(nutzer);
    }

        public Long getFavTableID(long ID){
            Long favTableID = nutzerRepo.findNutzerByID(ID).getFavTableID();
            return favTableID;
        }

        public void setFavTableID(Nutzer nutzer, long favTableID){
            nutzer.setFavTableID(favTableID);
            nutzerRepo.save(nutzer);
        }

        public void setFavTable(Nutzer nutzer, String favTable){
            nutzer.setFavTable(favTable);
            nutzerRepo.save(nutzer);
        }

        public void setProfileTable(Nutzer nutzer, long profileTableID){
            nutzer.setProfileTable(profileTableID);
            nutzerRepo.save(nutzer);
        }

        public String getFavTable(long ID){
            String favTable = nutzerRepo.findNutzerByID(ID).getFavTable();
            return favTable;
        }

        //Login and Register Methods
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


         //Friendlist Methods
        public void acceptFriend(Nutzer nutzerToAdd, Nutzer nutzerFriendlist) throws Exception {
            if (!nutzerFriendlist.getFriendlist().contains(nutzerToAdd.getID()) &&
                    nutzerFriendlist.getFriendrequests().contains(nutzerToAdd.getID())) {
               //Freund wird in die eigene Freundesliste hinzugefügt
                List<Long> newFriendlist = nutzerFriendlist.getFriendlist();
                newFriendlist.add(nutzerToAdd.getID());
                nutzerFriendlist.setFriendlist(newFriendlist);

                //Anfrage wird aus der Liste der Freundschaftsanfragen gelöscht
                List<Long> newFriendrequestsList = nutzerFriendlist.getFriendrequests();
                newFriendrequestsList.remove(nutzerToAdd.getID());
                nutzerFriendlist.setFriendrequests(newFriendrequestsList);

                //Man selbst wird auch in der Freundesliste des anderen hinzugefügt
                List<Long> newFriendlistOfFriend = nutzerToAdd.getFriendlist();
                newFriendlistOfFriend.add(nutzerFriendlist.getID());
                nutzerToAdd.setFriendlist(newFriendlistOfFriend);

                nutzerRepo.save(nutzerFriendlist);
                nutzerRepo.save(nutzerToAdd);

            } else {
                throw new Exception("Nutzer ist bereits dein Freund!");
            }
        }
        public void denyFriend(Nutzer nutzerToDeny, Nutzer nutzerFriendlist) throws Exception {
            //Wenn der Nutzer nicht in der eigenen Freundesliste ist und der Nutzer in der eigenen Liste der Freundschaftsanfrage vorhanden ist
            if (!nutzerFriendlist.getFriendlist().contains(nutzerToDeny.getID()) && nutzerFriendlist.getFriendrequests().contains(nutzerToDeny.getID())) {
                List<Long> neueListe = nutzerFriendlist.getFriendrequests();
                neueListe.remove(nutzerToDeny.getID());
                nutzerFriendlist.setFriendrequests(neueListe);
                nutzerRepo.save(nutzerFriendlist);

            } else {
                throw new Exception("Nutzer ist bereits dein Freund!");
            }
        }
        public void sendRequest(Nutzer nutzerSendingRequest, Nutzer nutzerReceivingRequest) throws Exception {
            if (!nutzerReceivingRequest.getFriendrequests().contains(nutzerSendingRequest.getID())
                    && !nutzerSendingRequest.getFriendrequests().contains(nutzerReceivingRequest.getID())
                    && !nutzerSendingRequest.getFriendlist().contains(nutzerReceivingRequest.getID())
            ) {
                List<Long> neueListe = nutzerReceivingRequest.getFriendrequests();
                neueListe.add(nutzerSendingRequest.getID());
                nutzerReceivingRequest.setFriendrequests(neueListe);
                nutzerRepo.save(nutzerReceivingRequest);
            } else {
                throw new Exception("Nutzer hat deine Anfrage bereits erhalten!");
            }
        }
        public void deleteFriend(Nutzer nutzerToDelete, Nutzer nutzerFriendlist) throws Exception {
            System.out.println("c1");
        if (nutzerFriendlist.getFriendlist().contains(nutzerToDelete.getID())) {
            System.out.println("c2");
            //NutzerToDelete wird aus der eigenen Liste gelöscht
            nutzerFriendlist.getFriendlist().remove(nutzerToDelete.getID());
            System.out.println("c3");
            //Man selbst wird aus der Freundseliste des anderen gelöscht
            nutzerToDelete.getFriendlist().remove(nutzerFriendlist.getID());
            System.out.println("c4");
            nutzerRepo.save(nutzerFriendlist);
            nutzerRepo.save(nutzerToDelete);
        } else {
            throw new Exception("Dieser Nutzer ist nicht dein Freund!");
            }
        }
        public String[][] showFriendlist(long ID) {
            Nutzer nutzerFriendlist = nutzerRepo.findNutzerByID(ID);
            List<Long> friendlistalt = nutzerFriendlist.getFriendlist();
            String[][] friendlist = new String[friendlistalt.size()][5];
            for (int i = 0; i < friendlistalt.size(); i++) {
                Nutzer friend = nutzerRepo.findNutzerByID(friendlistalt.get(i));
                friendlist[i][0] = String.valueOf(friend.getID());
                friendlist[i][1] = friend.getVorname();
                friendlist[i][2] = friend.getNachname();
                friendlist[i][3] = friend.getVorname() + " " + friend.getNachname();
                friendlist[i][4] = friend.getEmail();
            }
            return friendlist;
        }

        public String[][] showOwnFriendlist(long ID) {
            Nutzer nutzerFriendlist = nutzerRepo.findNutzerByID(ID);
            List<Long> friendlistalt = nutzerFriendlist.getFriendlist();
            String[][] friendlist = new String[nutzerFriendlist.getFriendlist().size()][6];
            for (int i = 0; i < nutzerFriendlist.getFriendlist().size(); i++) {
                Nutzer friend = nutzerRepo.findNutzerByID(friendlistalt.get(i));
                friendlist[i][0] = String.valueOf(nutzerFriendlist.getID());
                friendlist[i][1] = friend.getVorname();
                friendlist[i][2] = friend.getNachname();
                friendlist[i][3] = friend.getVorname() + " " + friend.getNachname();
                friendlist[i][4] = friend.getEmail();
                friendlist[i][5] = String.valueOf(friend.getID());
            }
            return friendlist;
        }
        public String[][] showFriendrequests(long ID) {
            Nutzer nutzerFriendRequest = nutzerRepo.findNutzerByID(ID);
            List<Long> friendrequestalt = nutzerFriendRequest.getFriendrequests();
            String[][] friendrequests = new String[nutzerFriendRequest.getFriendrequests().size()][5];
            for (int i = 0; i < nutzerFriendRequest.getFriendrequests().size(); i++) {
                Nutzer friend = nutzerRepo.findNutzerByID(friendrequestalt.get(i));
                friendrequests [i][0] = String.valueOf(friend.getID());
                friendrequests [i][1] = friend.getVorname();
                friendrequests [i][2] = friend.getNachname();
                friendrequests [i][3] = friend.getVorname()+ " " + friend.getNachname();
                friendrequests [i][4] = friend.getEmail();
            }
            return friendrequests;
        }
       public List<Nutzer> ownShowFriendlist(long ID) {
        Nutzer nutzerFriendlist = nutzerRepo.findNutzerByID(ID);
        List<Long> friendlistalt = nutzerFriendlist.getFriendlist();
        List<Nutzer> friendlist = new ArrayList<>();
        for (Long friendID : friendlistalt) {
            Nutzer friend = nutzerRepo.findNutzerByID(friendID);
            friendlist.add(friend);
        }
        return friendlist;
    }

    //Privacy Methods
    public Boolean getPrivacy (long ID){
            Nutzer nutzer = nutzerRepo.findNutzerByID(ID);
            return nutzer.isPrivacy();

    }
    public void togglePrivacy(String email){

        Nutzer nutzer = nutzerRepo.findNutzerByEmail(email);
        if(nutzer.isPrivacy()){
            nutzer.setPrivacy(false);
            nutzerRepo.save(nutzer);
        }
        else{
            nutzer.setPrivacy(true);
            nutzerRepo.save(nutzer);
        }
    }
    public Boolean getProfilePrivacy (long ID){
        Nutzer nutzer = nutzerRepo.findNutzerByID(ID);
        return nutzer.isProfilePrivacy();

    }
    public void toggleProfilePrivacy(String email){

        Nutzer nutzer = nutzerRepo.findNutzerByEmail(email);
        if(nutzer.isProfilePrivacy()){
            nutzer.setProfilePrivacy(false);
            nutzerRepo.save(nutzer);
        }
        else{
            nutzer.setProfilePrivacy(true);
            nutzerRepo.save(nutzer);
        }
    }
}