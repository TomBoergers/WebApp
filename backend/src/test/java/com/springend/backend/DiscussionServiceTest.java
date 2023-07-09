package com.springend.backend;

import com.springend.backend.Discussion.Discussion;
import com.springend.backend.Discussion.DiscussionController;
import com.springend.backend.Discussion.DiscussionRepo;
import com.springend.backend.Discussion.DiscussionService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@Transactional
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class DiscussionServiceTest {

    @Autowired
    DiscussionService discussionService;
    @Autowired
    DiscussionController discussionController;
    @Autowired
    DiscussionRepo discussionRepo;

    @Test
    @DisplayName("Test should pass when two discussions are added")
    void shouldAddDiscussion() {
        Discussion discussion = new Discussion("Admin Post", "Admin Content", "Admin Catergory");
        Discussion discussion1 = new Discussion("1","1","1");
        discussionService.addDiscussion(discussion);
        discussionService.addDiscussion(discussion1);
        List<Discussion> discussionList = discussionRepo.findAll();
        Assertions.assertEquals(2, discussionList.size());
    }

    @Test
    @DisplayName("Test should pass when one discussion is deleted")
    void shouldDeleteDiscussion() throws Exception {
        Discussion discussion = new Discussion("Admin Post", "Admin Content", "Admin Catergory");
        Discussion discussion1 = new Discussion("1","1","1");
        discussionService.addDiscussion(discussion);
        discussionService.addDiscussion(discussion1);
        discussionService.deletePost(1L);
        List<Discussion> discussionList = discussionRepo.findAll();
        Assertions.assertEquals(1, discussionList.size());
    }
    @Test
    @DisplayName("Test should pass when two likes are added")
    void shouldAddLikes() {
        Discussion discussion = new Discussion("Admin Post", "Admin Content", "Admin Catergory");
        discussionService.addDiscussion(discussion);
        discussionService.addLike(1L);
        discussionService.addLike(1L);
        Assertions.assertEquals(2,discussion.getLikes());
    }
}
