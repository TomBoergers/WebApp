package com.springend.backend.Discussion;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Discussion {
    @Id
    @GeneratedValue
    private Long discussionId;

    public void setDiscussionId(Long discussionId) {
        this.discussionId = discussionId;
    }

    public Long getDiscussionId() {
        return discussionId;
    }
}
