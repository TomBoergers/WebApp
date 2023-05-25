package com.springend.backend.Websocket;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Websocket {

    @Id
    @GeneratedValue
    private Long sessionId;

    private Long userId;

    private String status;


    public Websocket() {
    }

    public Websocket (Long sessionId, Long userId, String status) {
    }


    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
