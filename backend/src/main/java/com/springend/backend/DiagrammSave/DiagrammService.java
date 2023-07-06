package com.springend.backend.DiagrammSave;

import org.springframework.stereotype.Service;

@Service
public class DiagrammService {

    private final DiagrammRepo diagrammRepo;

    public DiagrammService(DiagrammRepo diagrammRepo){
        this.diagrammRepo = diagrammRepo;
    }
    public Diagramm saveDiagram(String diagramData){
        if (diagramData == null || diagramData.isEmpty()) {
            throw new IllegalArgumentException("Diagram data cannot be empty");
        }

        // Save the diagram data using the repository
        Diagramm diagram = new Diagramm(diagramData);
        return diagrammRepo.save(diagram);
    }
}



