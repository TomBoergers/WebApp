package com.springend.backend.sysAdmin;

import jakarta.persistence.Column;
import jakarta.persistence.*;

import java.time.LocalDate;
@Entity

public class sysadmin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ID;

    @Column(name = "vorname")
    private String vorname;

    @Column(name = "nachname")
    private String nachname;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    public sysadmin(){

    }

    public sysadmin(String vorname, String nachname, String email, String password) {
        this.vorname = vorname;
        this.nachname = nachname;
        this.email = email;
        this.password = password;
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

    public String getPassword() {
        return password;
    }
}
