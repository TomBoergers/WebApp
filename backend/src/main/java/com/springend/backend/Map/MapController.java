package com.springend.backend.Map;

import com.springend.backend.Reader.CSVReader.CSVFile;
import com.springend.backend.Reader.CSVReader.CSVService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MapController {

    private final MapService mapService;
    public MapController(MapService mapsService) {
        this.mapService = mapsService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<MapFile>> getFiles() {
        List<MapFile> files = mapService.findAllMaps();
        return new ResponseEntity<>(files, HttpStatus.OK);
    }
}
