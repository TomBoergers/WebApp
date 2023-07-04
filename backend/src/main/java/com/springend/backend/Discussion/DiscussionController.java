package com.springend.backend.Discussion;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

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
            System.out.println(post);
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
            System.out.println("Controller");
            return new ResponseEntity<>(discussion, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping("/addComment/{ID}")
    public void addComment(@RequestParam String comment, @RequestParam String name, @PathVariable Long ID) {
        try {
            Comment newComment = new Comment();
            newComment.setComment(comment);
            newComment.setName(name);
          this.discussionService.addComment(newComment, ID);
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

    @GetMapping("/getComments/{ID}")
    public ResponseEntity<Comment> getComments(@PathVariable Long ID) {
        try {

            return null;
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }
}
