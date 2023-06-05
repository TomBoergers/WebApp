package com.springend.backend.Websocket;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WebsocketService {

    private List<String> chatHistory = new ArrayList<>();

    private final WebsocketRepo websocketRepo;

    public WebsocketService (WebsocketRepo websocketRepo) {
        this.websocketRepo = websocketRepo;
    }

    public void sendMessage(Websocket message) {
        //Senden von Nachrichten
    }
}
