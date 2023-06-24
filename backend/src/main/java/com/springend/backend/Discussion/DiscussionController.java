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
    public ResponseEntity<String> addDiscussion(@RequestBody Discussion post) {
        try {
            System.out.println(post);
            discussionService.addDiscussion(post);
            return ResponseEntity.ok("Post added successfully");
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
}
