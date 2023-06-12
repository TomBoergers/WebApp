package com.springend.backend.Chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
            messageRepo.save(message);
            message.setChatID(createAndOrGetChat(to));
            message.setTimestamp(generateTimeStamp());
            messageRepo.save(message);
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
                List<Message> chatMessages = new ArrayList<>();
                chatMessages = messageRepo.findAllByChatID(chat.getChatID());
                return chatMessages;
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
            System.out.println(chat.getChatID());
            return chat.getChatID();
        } else {
            Chat newChat = new Chat(name);
            System.out.println(chatRepo.save(newChat).getChatID());
            return chatRepo.save(newChat).getChatID();
        }
    }

    public void editMessage(Message message) {
        Optional<Message> existingMessageOptional = messageRepo.findById(message.getMessageID());
        if (existingMessageOptional.isPresent()) {
            Message existingMessage = existingMessageOptional.get();
            existingMessage.setContent(message.getContent());
            messageRepo.save(existingMessage);
        } else {
            throw new RuntimeException("Message not found");
        }
    }

    public void deleteMessage(Long messageId) {
        // Führen Sie hier die Logik zum Löschen der Nachricht aus der Datenbank aus.
        // Beispiel:
        messageRepo.deleteById(messageId);
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
