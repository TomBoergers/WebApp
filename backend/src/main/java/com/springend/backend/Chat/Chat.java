package com.springend.backend.Chat;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long chatId;

    private String firstUserEmail;

    private String secondUserEmail;

    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
    private List<Message> messageList;

    public Chat () {

    }

    public Chat(String firstUserEmail, String secondUserEmail, List<Message> messageList) {
        this.firstUserEmail = firstUserEmail;
        this.secondUserEmail = secondUserEmail;
        this.messageList = messageList;
    }

    public long getChatId() {
        return chatId;
    }

    public void setChatId(long chatId) {
        this.chatId = chatId;
    }

    public String getFirstUserEmail() {
        return firstUserEmail;
    }

    public void setFirstUserEmail(String firstUserName) {
        this.firstUserEmail = firstUserName;
    }

    public String getSecondUserEmail() {
        return secondUserEmail;
    }

    public void setSecondUserEmail(String secondUserName) {
        this.secondUserEmail = secondUserName;
    }

    public List<Message> getMessageList() {
        return messageList;
    }

    public void setMessageList(List<Message> messageList) {
        this.messageList = messageList;
    }
}
