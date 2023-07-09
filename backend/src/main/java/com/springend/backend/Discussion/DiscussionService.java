package com.springend.backend.Discussion;

import com.springend.backend.Nutzer.Nutzer;
import com.springend.backend.Nutzer.NutzerRepo;
import com.springend.backend.Reader.CSVReader.CSVFile;
import com.springend.backend.ZweiFaktor.EmailService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DiscussionService {

    private final DiscussionRepo discussionRepo;
    private NutzerRepo nutzerRepo;
    private final CommentRepo commentRepo;
    private EmailService emailService;
    public DiscussionService(DiscussionRepo discussionRepo, CommentRepo commentRepo, NutzerRepo nutzerRepo, EmailService emailService) {
        this.discussionRepo = discussionRepo;
        this.commentRepo = commentRepo;
        this.nutzerRepo = nutzerRepo;
        this.emailService = emailService;
    }

    public void addDiscussion(Discussion post) {
        discussionRepo.save(post);
    }

    public String[][] getDiscussions() {
        List<Discussion> discussionList = discussionRepo.findAll();
        Discussion discussion;

        String[][] discussions = new String[discussionList.size()][5];
        for (int i = 0; i < discussionList.size(); i++) {
            discussion = discussionList.get(i);

            discussions[i][0] = discussion.getTitle();
            discussions[i][1] = discussion.getContent();
            discussions[i][2] = discussion.getCategory();
            discussions[i][3] = String.valueOf(discussion.getDiscussionId());
            discussions[i][4] = String.valueOf(discussion.getLikes());
        }
        return discussions;
    }

    public Discussion getById(Long Id) {
        Optional<Discussion> optionalDiscussion = discussionRepo.findById(Id);
        Discussion discussion = optionalDiscussion.get();
        return discussion;
    }

    public void addComment(Comment comment, Long discussionId) throws Exception{
        Optional<Discussion> optionalDiscussion = discussionRepo.findById(discussionId);
        Discussion discussion = optionalDiscussion.get();


        Comment newComment = new Comment();
        newComment.setComment(comment.getComment());
        newComment.setName(comment.getName());
        newComment.setDiscussionId(discussion.getDiscussionId());

        List<Long> favouriteUsers = optionalDiscussion.get().getFavouriteUsers();
        for(Long userId : favouriteUsers){
            Nutzer currentUser = nutzerRepo.findNutzerByID(userId);
            this.emailService.diskussionNeuerComment(currentUser.getEmail());
        }

        commentRepo.save(newComment);
    }

    public List<String[]> getCommentsByDiscussionId(Long discussionId) {
        List<String[]> result = new ArrayList<>();
        List<Comment> comments = commentRepo.findCommentsByDiscussionId(discussionId);

        for (Comment comment : comments) {
            String[] commentData = new String[3];
            commentData[0] = comment.getComment();
            commentData[1] = comment.getName();
            commentData[2] = String.valueOf(comment.getCommentId());
            result.add(commentData);
        }

        return result;
    }

    public void addFavourite(Discussion discussion, long nutzerID) {
        List<Long> newFavourites = discussion.getFavouriteUsers();
        newFavourites.add(nutzerID);
        discussion.setFavouriteUsers(newFavourites);
        discussionRepo.save(discussion);
    }

    public void deletePost(Long postId) throws Exception{
        Optional<Discussion> optionalDiscussion = discussionRepo.findById(postId);
        if (optionalDiscussion.isPresent()) {
            List<Long> favouriteUsers = optionalDiscussion.get().getFavouriteUsers();
            for(Long userId : favouriteUsers){
                Nutzer currentUser = nutzerRepo.findNutzerByID(userId);
                this.emailService.deletedPost(currentUser.getEmail());
            }
            Discussion discussion = optionalDiscussion.get();
            discussionRepo.delete(discussion);
        } else {
            throw new IllegalArgumentException("Post not found");
        }
    }

    public void deleteComment(Long commentId) throws Exception{
        Optional<Comment> commentOptional = commentRepo.findById(commentId);
        if (commentOptional.isPresent()) {
            Long discussionID = commentOptional.get().getDiscussionId();
            Optional<Discussion> optionalDiscussion = discussionRepo.findById(discussionID);
            List<Long> favouriteUsers = optionalDiscussion.get().getFavouriteUsers();
            for(Long userId : favouriteUsers){
                Nutzer currentUser = nutzerRepo.findNutzerByID(userId);
                this.emailService.deletedComment(currentUser.getEmail());
            }
            Comment comment = commentOptional.get();
            commentRepo.delete(comment);

        } else {
            throw new IllegalArgumentException("Post not found");
        }
    }

    public void deleteFavourite (Discussion discussion, long nutzerID) throws Exception{
        if(discussion.getFavouriteUsers().contains(nutzerID)) {
            List<Long> newFavourites = discussion.getFavouriteUsers();
            newFavourites.remove(nutzerID);
            discussion.setFavouriteUsers(newFavourites);
            discussionRepo.save(discussion);
        } else {
            throw new Exception("Der Nutzer hat die Diskussion nicht favorisiert.");
        }
    }

    public void addLike(Long ID) {
        Optional<Discussion> optionalDiscussion = discussionRepo.findById(ID);
        Discussion discussion = optionalDiscussion.get();

        Integer likes = discussion.getLikes();
        likes++;
        discussion.setLikes(likes);
        discussionRepo.save(discussion);
    }
}
