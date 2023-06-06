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
    public Chat getById(long id) throws Exception {
        Optional<Chat> chatid = chatRepo.findById(id);
        if (chatid.isPresent()) {
            return chatid.get();
        } else {
            throw new Exception();
        }
    }

    public HashSet<Chat> getChatByFirstUserName(String username) throws Exception {
        HashSet<Chat> chat = chatRepo.getChatByFirstUserName(username);

        if (chat.isEmpty()) {
            throw new Exception();
        } else {
            return chat;
        }
    }

    public HashSet<Chat> getChatBySecondUserName(String username) throws Exception {
        HashSet<Chat> chat = chatRepo.getChatBySecondUserName(username);
        if (chat.isEmpty()) {
            throw new Exception();
        } else {
            return chat;
        }
    }

    public Chat addMessage(Message add, long chatId) throws Exception {
        Optional<Chat> chat=chatRepo.findById(chatId);
        Chat abc=chat.get();

        if(abc.getMessageList()==null){
            List<Message> msg=new ArrayList<>();
            msg.add(add);
            abc.setMessageList(msg);
            return chatRepo.save(abc);
        }else{
            List<Message> rates=abc.getMessageList();
            rates.add(add);
            abc.setMessageList(rates);
            return chatRepo.save(abc);
        }
    }
}
