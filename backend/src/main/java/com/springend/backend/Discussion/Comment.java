package com.springend.backend.Discussion;

import jakarta.persistence.*;

@Entity
public class Comment {
    @Id
    @GeneratedValue
    private Long commentId;

    private Long discussionId;

    private String comment;

    private String name;


    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public Long getCommentId() {
        return commentId;
    }

    public String getComment() {
        return comment;
    }

    public Long getDiscussionId() {
        return discussionId;
    }

    public void setDiscussionId(Long discussionId) {
        this.discussionId = discussionId;
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

    @Override
    public String toString() {
        return "Comment{" +
                "commentId=" + commentId +
                ", comment='" + comment + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
