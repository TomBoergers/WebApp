package com.springend.backend.Discussion;

import jakarta.persistence.*;

@Entity
public class Comment {
    @Id
    @GeneratedValue
    private Long commentId;

    private String comment;

    private String name;

    @ManyToOne
    private Discussion discussion;

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public Long getCommentId() {
        return commentId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Discussion getDiscussion() {
        return discussion;
    }

    public void setDiscussion(Discussion discussion) {
        this.discussion = discussion;
    }
}
