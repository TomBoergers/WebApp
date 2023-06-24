package com.springend.backend.Discussion;

import com.springend.backend.Reader.CSVReader.CSVFile;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscussionService {

    private final DiscussionRepo discussionRepo;

    public DiscussionService(DiscussionRepo discussionRepo) {
        this.discussionRepo = discussionRepo;
    }

    public void addDiscussion(Discussion post) {
        System.out.println(post);
        discussionRepo.save(post);
    }

    public String[][] getDiscussions() {
        List<Discussion> discussionList = discussionRepo.findAll();
        Discussion discussion;

        String[][] discussions = new String[discussionList.size()][3];
        for (int i = 0; i < discussionList.size(); i++) {
            discussion = discussionList.get(i);

            discussions[i][0] = discussion.getTitle();
            discussions[i][1] = discussion.getContent();
            discussions[i][2] = discussion.getCategory();
        }
        System.out.println(discussions.toString());
        return discussions;
    }
}
