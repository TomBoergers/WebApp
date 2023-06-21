package com.springend.backend.Discussion;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Comment {
    @Id
    @GeneratedValue
    private Long commentId;

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public Long getCommentId() {
        return commentId;
    }
}
