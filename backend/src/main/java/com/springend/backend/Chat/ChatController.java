package com.springend.backend.Chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/add")
    public ResponseEntity<Chat> createChat(@RequestBody Chat chat) throws Exception {
        try {
            return new ResponseEntity<Chat>(chatService.addChat(chat), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity("Chat Already Exists", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Chat>> getAllChats() {
        try {
            return new ResponseEntity<List<Chat>>(chatService.findallchats(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("List not found", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chat> getChatById(@PathVariable long chatId) {
        try {
            return new ResponseEntity<Chat>(chatService.getById(chatId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Chat Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getChatByFirstOrSecondUserEmail/{userEmail}")
    public ResponseEntity<?> getChatByFirstUserNameOrSecondUserName(@PathVariable String userEmail) {
        try {
            HashSet<Chat> byChat = this.chatService.getChatByFirstOrSecondUserEmail(userEmail);
            return new ResponseEntity<>(byChat, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Chat Not Exits", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/getChatByFirstAndSecondUser")
    public ResponseEntity<?> getChatByFirstUserAndSecondUser(@RequestParam("firstUserEmail") String firstUserEmail, @RequestParam("secondUserEmail") String secondUserEmail) {
        try {
            HashSet<Chat> chatByBothEmail = this.chatService.getChatByFirstAndSecondUser(firstUserEmail, secondUserEmail);
            return new ResponseEntity<>(chatByBothEmail, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Chat Not Exits", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/message/{chatId}")
    public ResponseEntity<Chat> addMessage(@RequestBody Message message, @PathVariable long chatId) throws Exception {
        return new ResponseEntity<Chat>(chatService.addMessage(message, chatId), HttpStatus.OK);
    }
}
