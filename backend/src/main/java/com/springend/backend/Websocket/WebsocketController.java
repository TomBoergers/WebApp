package com.springend.backend.Websocket;

import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@MessageMapping("/chat")
public class WebsocketController {

    private final WebsocketService websocketService;

    public WebsocketController(WebsocketService websocketService) {
        this.websocketService = websocketService;
    }

    @MessageMapping("/send")
    @SendTo("/topic/chat/{chatId}")
    public void handleChatMessage(@DestinationVariable String chatId, Message message) {
        //Verarbeiten der Nachricht
    }
}
