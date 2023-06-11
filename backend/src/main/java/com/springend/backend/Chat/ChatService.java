package com.springend.backend.Chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private final MessageRepo messageRepo;

    private final ChatRepo chatRepo;

    public ChatService(MessageRepo messageRepo, ChatRepo chatRepo) {
        this.messageRepo = messageRepo;
        this.chatRepo = chatRepo;
    }

    public void handleMessage(String to, Message message) {
        try {
            message.setChatID(createAndOrGetChat(to));
            message.setTimestamp(generateTimeStamp());
            simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);
            System.out.println("Service: Message sent");
        } catch (Exception e) {
            System.out.println("Service: couldn't handle message");
        }
    }

    public List<Message> getMessages(String chatName) {
        try {
            Chat chat = chatRepo.findChatByChatName(chatName);

            if(chat != null) {
                return messageRepo.findAllByChatID(chat.getChatID());
            } else {
                return new ArrayList<Message>();
            }
        } catch (Exception e) {
            System.out.println("Service: getMessages error");
            return null;
        }
    }

    public List<Chat> getChats(String user) {
        try {
            return chatRepo.findChatByPartecipants(user);
        } catch (Exception e) {
            System.out.println("Service: Couldn't getChats");
            return null;
        }
    }

    public Long createAndOrGetChat(String name) {
        Chat chat = chatRepo.findChatByChatName(name);

        if(chat != null) {
            return chat.getChatID();
        } else {
            Chat newChat = new Chat(name);
            return chatRepo.save(newChat).getChatID();
        }
    }

    public String generateTimeStamp() {
        Instant i = Instant.now();
        String date = i.toString();
        System.out.println("Source: " + i.toString());
        int endRange = date.indexOf('T');
        date = date.substring(0, endRange);
        date = date.replace('-', '/');
        System.out.println("Date extracted: " + date);
        String time = Integer.toString(i.atZone(ZoneOffset.UTC).getHour() + 1);
        time += ":";

        int minutes = i.atZone(ZoneOffset.UTC).getMinute();
        if (minutes > 9) {
            time += Integer.toString(minutes);
        } else {
            time += "0" + Integer.toString(minutes);
        }

        System.out.println("Time extracted: " + time);
        String timeStamp = date + "-" + time;
        return timeStamp;
    }
}
