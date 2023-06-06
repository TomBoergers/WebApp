package com.springend.backend.Chat;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Message {

    @Id
    @GeneratedValue
    private Long messageId;

    private String senderEmail;

    private Date time = new Date(System.currentTimeMillis());

    private String replyMessage;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;

    public Message() {

    }

    public Message(String senderEmail, Date time, String replyMessage) {
        this.senderEmail = senderEmail;
        this.time = time;
        this.replyMessage = replyMessage;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getReplyMessage() {
        return replyMessage;
    }

    public void setReplyMessage(String replyMessage) {
        this.replyMessage = replyMessage;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public Long getMessageId() {
        return messageId;
    }
}
