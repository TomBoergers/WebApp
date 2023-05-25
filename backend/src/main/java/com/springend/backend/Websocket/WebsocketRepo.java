package com.springend.backend.Websocket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebsocketRepo extends JpaRepository<Websocket, Long> {
}
