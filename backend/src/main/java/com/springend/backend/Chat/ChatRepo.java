package com.springend.backend.Chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.HashSet;

@Repository
public interface ChatRepo extends JpaRepository<Chat, Long> {

    HashSet<Chat> getChatByFirstUserEmail(String email);

    HashSet<Chat> getChatBySecondUserEmail(String email);

    HashSet<Chat> getChatByFirstUserEmailAndSecondUserEmail(String firstUserEmail, String secondUserEmail);

    HashSet<Chat> getChatBySecondUserEmailAndFirstUserEmail(String firstUserEmail, String secondUserEmail);
}
