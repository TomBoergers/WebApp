package com.springend.backend.DiagrammSave;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

    @RestController
    @RequestMapping("/diagramm")
    public class DiagrammController {

        private DiagrammService diagrammService;

        public DiagrammController(DiagrammService diagrammService){
            this.diagrammService= diagrammService;
        }
        @Autowired
        public DiagrammController() {
        }

        @PostMapping("/api/saveDiagramm")
        public ResponseEntity<String> saveDiagramm(@RequestBody Diagramm chartOptions) {
            diagrammService.saveDiagram(chartOptions.toString());
            return ResponseEntity.ok("Diagram saved successfully!");
        }
    }

