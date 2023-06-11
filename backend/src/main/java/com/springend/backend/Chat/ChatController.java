package com.springend.backend.Chat;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/chat/{to}")
    public void sendMessage(@DestinationVariable String to, Message message) {
        System.out.println("handling send message: " + message + " to: " + to);
        try {
            chatService.handleMessage(to, message);
        } catch (Exception e) {
            System.out.println("Controller: Couldn't send message");
        }
    }

    @PostMapping("/getMessages")
    public List<Message> getMessages(@RequestBody String chat) {
        try {
            return chatService.getMessages(chat);
        } catch (Exception e) {
            System.out.println("Controller: Couldn't get Messages");
            return null;
        }
    }

    @PostMapping("/getChats")
    public List<Chat> getChats(@RequestBody String user) {
        try {
            return chatService.getChats(user);
        } catch (Exception e) {
            System.out.println("Controller: Couldn't getChat");
            return new ArrayList<Chat>();
        }
    }
}
