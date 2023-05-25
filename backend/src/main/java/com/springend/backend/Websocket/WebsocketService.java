package com.springend.backend.Websocket;

import org.springframework.stereotype.Service;

@Service
public class WebsocketService {

    private final WebsocketRepo websocketRepo;

    public WebsocketService (WebsocketRepo websocketRepo) {
        this.websocketRepo = websocketRepo;
    }

    public void processChatMessage(Websocket message) {

    }
}
