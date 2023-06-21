package com.springend.backend.Discussion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscussionRepo extends JpaRepository<Discussion, Long> {
}
