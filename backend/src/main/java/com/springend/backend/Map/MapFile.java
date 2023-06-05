package com.springend.backend.Map;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MapFile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long ID;

    private String filepath;

    private String name;

    public MapFile(){

}

    public MapFile(String filepath, String name){
        this.filepath = filepath;
        this.name = name;
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
