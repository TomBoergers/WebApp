package com.springend.backend.Chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
            return new ResponseEntity("Chat Already Exist", HttpStatus.CONFLICT);
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
    public ResponseEntity<Chat> getChatById(@PathVariable int id) {
        try {
            return new ResponseEntity<Chat>(chatService.getById(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Chat Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/message/{chatId}")
    public ResponseEntity<Chat> addMessage(@RequestBody Message add , @PathVariable int chatId) throws Exception {
        return new ResponseEntity<Chat>(chatService.addMessage(add,chatId), org.springframework.http.HttpStatus.OK);
    }
}
