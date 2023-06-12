package com.springend.backend.Chat;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

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
            System.out.println("Controller:" + chat);
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

    @PostMapping("/editMessage")
    public void editMessage(@RequestBody Message message) {
        try {
            chatService.editMessage(message);
        } catch (Exception e) {
            System.out.println("Controller: Couldn't edit message");
        }
    }

    @DeleteMapping("/deleteMessage/{id}")
    public void deleteMessage(@PathVariable("id") Long messageId) {
        try {
            chatService.deleteMessage(messageId);
        } catch (Exception e) {
            System.out.println("Controller: Couldn't delete message");
        }
    }
}
