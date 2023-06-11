package com.springend.backend.Chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepo extends JpaRepository<Chat, Long> {
    Chat findChatByChatName(String name);

    List<Chat> findChatByPartecipants(String user);
}
