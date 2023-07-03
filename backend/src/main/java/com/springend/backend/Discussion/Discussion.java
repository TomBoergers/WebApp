package com.springend.backend.Discussion;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Discussion {
    @Id
    @GeneratedValue
    private Long discussionId;

    private String title;

    private String content;

    private String category;

    @OneToMany(mappedBy = "discussion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    public Discussion() {
    }

    public Discussion(String title, String content, String category) {
        this.title = title;
        this.content = content;
        this.category = category;
    }

    public void setDiscussionId(Long discussionId) {
        this.discussionId = discussionId;
    }

    public Long getDiscussionId() {
        return discussionId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
