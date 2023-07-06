package com.springend.backend.DiagrammSave;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Diagramm {
    private String diagrammData;
    @Id
    @GeneratedValue
    private Long diagrammId;

    public Diagramm(String diagrammData){
        this.diagrammData = diagrammData;
    }

    public Diagramm() {

    }

    public void setDiagrammId(Long diagrammId) {
        this.diagrammId = diagrammId;
    }

    public Long getDiagrammId() {
        return diagrammId;
    }
}
