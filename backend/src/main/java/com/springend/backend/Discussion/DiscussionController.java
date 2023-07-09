package com.springend.backend.Discussion;

import com.springend.backend.Nutzer.Nutzer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/discussion")
public class DiscussionController {

    private final DiscussionService discussionService;

    public DiscussionController(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @PostMapping("/add")
    public ResponseEntity<Discussion> addDiscussion(@RequestBody Discussion post) {
        try {
            discussionService.addDiscussion(post);
            return new ResponseEntity<>(post, HttpStatus.OK);
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getDiscussions")
    public ResponseEntity<String[][]> getDiscussions() {
        try {
            String[][] discussions = discussionService.getDiscussions();
            return new ResponseEntity<>(discussions, HttpStatus.OK);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/getById/{ID}")
    public ResponseEntity<Discussion> getById(@PathVariable long ID) {
        try {
            Discussion discussion = discussionService.getById(ID);
            return new ResponseEntity<>(discussion, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping("/addComment/{ID}")
    public ResponseEntity addComment(@PathVariable Long ID, @RequestBody Comment comment){
        try {
            discussionService.addComment(comment, ID);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/getComments/{ID}")
    public ResponseEntity<List<String[]>> getComments(@PathVariable Long ID) {
        try {
            List<String[]> comments;
            comments = discussionService.getCommentsByDiscussionId(ID);
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @DeleteMapping("/deletePost/{ID}")
    public ResponseEntity<String> deletePost(@PathVariable long ID) {
        try {
            discussionService.deletePost(ID);
            return ResponseEntity.ok("Post deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete post");
        }
    }

    @DeleteMapping("/deleteComment/{ID}")
    public ResponseEntity<String> deleteComment(@PathVariable long ID) {
        try {
            discussionService.deleteComment(ID);
            return ResponseEntity.ok("Post deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete post");
        }
    }

    @PutMapping("/addFavourite/{discussionID}")
    public ResponseEntity<Discussion> addFavourite(@PathVariable Long discussionID, @RequestBody Nutzer nutzer){
        try {
            Discussion discussion = discussionService.getById(discussionID);
            discussionService.addFavourite(discussion, nutzer.getID());
            return new ResponseEntity<>(discussion, HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @DeleteMapping("/deleteFavourite/{discussionID}")
    public ResponseEntity<Discussion> deleteFavourite(@PathVariable Long discussionID, @RequestBody Nutzer nutzer){
        try {
            Discussion discussion = discussionService.getById(discussionID);
            discussionService.deleteFavourite(discussion, nutzer.getID());
            return new ResponseEntity<>(discussion, HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping("/addLike/{ID}")
    public ResponseEntity<String> addLike(@PathVariable Long ID) {
        try {
            discussionService.addLike(ID);
            String response = "Worked";
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
