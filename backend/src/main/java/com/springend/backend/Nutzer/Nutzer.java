package com.springend.backend.Nutzer;

import jakarta.persistence.Column;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Nutzer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userID;

    @Column(name = "vorname")
    private String vorname;

    @Column(name = "nachname")
    private String nachname;

    @Column(name = "e-mail")
    private String eMail;

    @Column(name = "geburtsdatum")
    private LocalDate gbd;

    @Column(name = "passwort")
    private String passwort;

    public Nutzer(){

    }

    public Nutzer(String vorname, String nachname, String eMail, LocalDate gbd, String passwort) {
        this.vorname = vorname;
        this.nachname = nachname;
        this.eMail = eMail;
        this.gbd = gbd;
        this.passwort = passwort;
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

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public LocalDate getGbd() {
        return gbd;
    }

    public void setGbd(LocalDate gbd) {
        this.gbd = gbd;
    }

    public String getPasswort() {
        return passwort;
    }

    public void setPasswort(String passwort) {
        this.passwort = passwort;
    }
}
