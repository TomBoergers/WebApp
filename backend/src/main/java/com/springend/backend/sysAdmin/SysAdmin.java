package com.springend.backend.sysAdmin;

import jakarta.persistence.Column;
import jakarta.persistence.*;
@Entity
@Table (name = "admins")


      public class SysAdmin {

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

            public SysAdmin(){

            }

            public SysAdmin(String vorname, String nachname, String email, String password) {
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

      public Long getID() {
            return ID;
      }

      public void setID(Long ID) {
            this.ID = ID;
      }

      @Override
      public String toString() {
            return "Admin{" +
                    "ID=" + ID +
                    ", vorname='" + vorname + '\'' +
                    ", nachname='" + nachname + '\'' +
                    ", email='" + email + '\'' +
                    ", password='" + password + '\'' +
                    '}';
      }

      }