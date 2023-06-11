package com.springend.backend.Chat;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.List;

@Entity
public class Chat {
    @Id
    @GeneratedValue
    private Long chatID;

    private String chatName;

    @ElementCollection
    private List<String> partecipants;

    public Chat() {
    }

    public Chat(String chatName, List<String> partecipants) {
        this.chatName = chatName;
        this.partecipants = partecipants;
    }

    public Chat(String chatName) {
        this.chatName = chatName;
    }

    public void setChatID(Long chatID) {
        this.chatID = chatID;
    }

    public Long getChatID() {
        return chatID;
    }

    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }
}
