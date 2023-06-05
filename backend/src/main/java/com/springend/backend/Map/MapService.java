package com.springend.backend.Map;


import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MapService {

    private final MapRepository mapRepo;
    public MapService(MapRepository mapRepo){this.mapRepo = mapRepo;}


    public MapFile addMapFile(String filepath, String name){
        MapFile toSave = new MapFile();
        toSave.setName(name);
        toSave.setFilepath(filepath);
        return mapRepo.save(toSave);
    }

    public List<MapFile> findAllMaps(){
        return mapRepo.findAll();
    }
}
