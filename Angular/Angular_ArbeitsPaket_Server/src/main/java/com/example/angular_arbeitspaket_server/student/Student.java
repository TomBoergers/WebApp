package com.example.angular_arbeitspaket_server.student;

import javax.persistence.*;

@Entity
public class Student
{
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private long id;
        private String firstName;
        private String lastName;
        private String subject;
        @Column(unique = true)
        private String email;

    public Student() {
    }

    public Student(String firstName, String lastName,String subject, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.subject=subject;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
