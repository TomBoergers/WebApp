package com.springend.backend.Chat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Message {
    @Id
    @GeneratedValue
    private Long messageID;

    private long chatID;

    private String sender;

    private String timestamp;

    private String content;

    public Message() {
    }

    public Message(long chatID, String sender, String timestamp, String content) {
        this.chatID = chatID;
        this.sender = sender;
        this.timestamp = timestamp;
        this.content = content;
    }

    public void setMessageID(Long messageID) {
        this.messageID = messageID;
    }

    public Long getMessageID() {
        return messageID;
    }

    public long getChatID() {
        return chatID;
    }

    public void setChatID(long chatID) {
        this.chatID = chatID;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
