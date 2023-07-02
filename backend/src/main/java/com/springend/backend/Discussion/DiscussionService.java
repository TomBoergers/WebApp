package com.springend.backend.Discussion;

import com.springend.backend.Reader.CSVReader.CSVFile;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiscussionService {

    private final DiscussionRepo discussionRepo;

    private final CommentRepo commentRepo;

    public DiscussionService(DiscussionRepo discussionRepo, CommentRepo commentRepo) {
        this.discussionRepo = discussionRepo;
        this.commentRepo = commentRepo;
    }

    public void addDiscussion(Discussion post) {
        System.out.println(post);
        discussionRepo.save(post);
    }

    public String[][] getDiscussions() {
        List<Discussion> discussionList = discussionRepo.findAll();
        Discussion discussion;

        String[][] discussions = new String[discussionList.size()][4];
        for (int i = 0; i < discussionList.size(); i++) {
            discussion = discussionList.get(i);

            discussions[i][0] = discussion.getTitle();
            discussions[i][1] = discussion.getContent();
            discussions[i][2] = discussion.getCategory();
            discussions[i][3] = String.valueOf(discussion.getDiscussionId());
        }
        System.out.println(discussions.toString());
        return discussions;
    }

    public Discussion getById(Long Id) {
        Optional<Discussion> optionalDiscussion = discussionRepo.findById(Id);
        Discussion discussion = optionalDiscussion.get();
        System.out.println("Service");
        return discussion;
    }

    public void addComment(Comment comment, Long discussionId) {
        Optional<Discussion> optionalDiscussion = discussionRepo.findById(discussionId);
        Discussion discussion = optionalDiscussion.get();
        Comment newComment = new Comment();
        newComment.setDiscussion(discussion);
        commentRepo.save(newComment);
    }

    public String[] getComments(Long ID) {
        return null;
    }
}
