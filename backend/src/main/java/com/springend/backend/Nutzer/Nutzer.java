package com.springend.backend.Nutzer;

import jakarta.persistence.Column;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "users")
public class Nutzer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long ID;

    private String vorname;

    private String nachname;

    @Column(unique = true)
    private String email;

    private LocalDate geburtsdatum;

    private String password;
    private Long favTableID;

    private String favTable;
    @ElementCollection
    private List<Long> friendrequests;
    @ElementCollection
    private List<Long> friendlist;

    private boolean privacy;

    private boolean profilePrivacy;

    private long profileTable;

    public Nutzer(){

    }

    public Nutzer(String vorname, String nachname, String email, LocalDate geburtsdatum, String password, List<Long> friendlist, List<Long> friendrequests, boolean privacy, boolean profilePrivacy) {
        this.vorname = vorname;
        this.nachname = nachname;
        this.email = email;
        this.geburtsdatum = geburtsdatum;
        this.password = password;
        this.friendlist = friendlist;
        this.privacy = privacy;
        this.friendrequests = friendrequests;
        this.profilePrivacy = profilePrivacy;
    }

    public long getID() {
        return ID;
    }

    public void setID(long ID) {
        this.ID = ID;
    }

    public String getVorname() {
        return vorname;
    }

    public void setVorname(String vorname) {
        this.vorname = vorname;
    }

    public String getNachname() {
        return nachname;
    }

    public void setNachname(String nachname) {
        this.nachname = nachname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getGeburtsdatum() {
        return geburtsdatum;
    }

    public void setGeburtsdatum(LocalDate geburtsdatum) {
        this.geburtsdatum = geburtsdatum;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public List<Long> getFriendlist() {
        return friendlist;
    }

    public void setFriendlist(List<Long> friendlist) {
        this.friendlist = friendlist;
    }

    public boolean isPrivacy() {
        return privacy;
    }

    public void setPrivacy(boolean privacy) {
        this.privacy = privacy;
    }

    public List<Long> getFriendrequests() {
        return friendrequests;
    }

    public void setFriendrequests(List<Long> friendrequests) {
        this.friendrequests = friendrequests;
    }

    public Long getFavTableID() {
        return favTableID;
    }

    public void setFavTableID(Long favTableID) {
        this.favTableID = favTableID;
    }

    public boolean isProfilePrivacy() {
        return profilePrivacy;
    }

    public void setProfilePrivacy(boolean profilePrivacy) {
        this.profilePrivacy = profilePrivacy;
    }

    public String getFavTable() {
        return favTable;
    }

    public void setFavTable(String favTable) {
        this.favTable = favTable;
    }

    public long getProfileTable() {
        return profileTable;
    }

    public void setProfileTable(long profileTable) {
        this.profileTable = profileTable;
    }

    @Override
    public String toString() {
        return "Nutzer{" +
                "ID=" + ID +
                ", vorname='" + vorname + '\'' +
                ", nachname='" + nachname + '\'' +
                ", email='" + email + '\'' +
                ", geburtsdatum=" + geburtsdatum +
                ", password='" + password + '\'' +
                '}';
    }


}