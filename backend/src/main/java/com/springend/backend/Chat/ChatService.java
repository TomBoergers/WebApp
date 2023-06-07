package com.springend.backend.Chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private final ChatRepo chatRepo;

    public ChatService(ChatRepo chatRepo) {
        this.chatRepo = chatRepo;
    }

    public Chat addChat(Chat chat) {
        return chatRepo.save(chat);
    }

    public List<Chat> findallchats() throws Exception {
        if (chatRepo.findAll().isEmpty()) {
            throw new Exception();
        } else {
            return chatRepo.findAll();
        }
    }
    public Chat getById(long chatId) throws Exception {
        Optional<Chat> chat = chatRepo.findById(chatId);

        if (chat.isPresent()) {
            return chat.get();
        } else {
            throw new Exception();
        }
    }

    public HashSet<Chat> getChatByFirstUserEmail(String email) throws Exception {
        HashSet<Chat> chat = chatRepo.getChatByFirstUserEmail(email);

        if (chat.isEmpty()) {
            throw new Exception();
        } else {
            return chat;
        }
    }

    public HashSet<Chat> getChatBySecondUserEmail(String email) throws Exception {
        HashSet<Chat> chat = chatRepo.getChatBySecondUserEmail(email);
        if (chat.isEmpty()) {
            throw new Exception();
        } else {
            return chat;
        }
    }

    public HashSet<Chat> getChatByFirstOrSecondUserEmail(String userEmail) throws Exception {
        HashSet<Chat> chat = chatRepo.getChatByFirstUserEmail(userEmail);
        HashSet<Chat> chat1 = chatRepo.getChatBySecondUserEmail(userEmail);

        chat1.addAll(chat);

        if (chat.isEmpty() && chat1.isEmpty()) {
            throw new Exception();
        } else if (chat1.isEmpty()) {
            return chat;
        } else {
            return chat1;
        }
    }

    public HashSet<Chat> getChatByFirstAndSecondUser(String firstUserEmail, String secondUserEmail) throws Exception {
        HashSet<Chat> chat = chatRepo.getChatByFirstUserEmailAndSecondUserEmail(firstUserEmail, secondUserEmail);
        HashSet<Chat> chat1 = chatRepo.getChatBySecondUserEmailAndFirstUserEmail(firstUserEmail, secondUserEmail);
        if (chat.isEmpty() && chat1.isEmpty()) {
            throw new Exception();
        } else if (chat.isEmpty()) {
            return chat1;
        } else {
            return chat;
        }
    }

    public Chat addMessage(Message message, long chatId) throws Exception {
        Optional<Chat> chat = chatRepo.findById(chatId);
        Chat tempChat = chat.get();

        if(tempChat.getMessageList() == null) {
            List<Message> newMessages = new ArrayList<>();
            newMessages.add(message);
            tempChat.setMessageList(newMessages);
            return chatRepo.save(tempChat);
        } else {
            List<Message> addMessages = tempChat.getMessageList();
            addMessages.add(message);
            tempChat.setMessageList(addMessages);
            return chatRepo.save(tempChat);
        }
    }
}
