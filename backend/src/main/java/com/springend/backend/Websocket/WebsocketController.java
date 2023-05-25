package com.springend.backend.Websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@MessageMapping("/websocket")
public class WebsocketController {

    private final WebsocketService websocketService;

    public WebsocketController(WebsocketService websocketService) {
        this.websocketService = websocketService;
    }

    @MessageMapping("/chat")
    public void handleChatMessage(Websocket message) {
        websocketService.processChatMessage(message);
    }
}
