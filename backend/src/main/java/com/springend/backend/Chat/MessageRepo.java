package com.springend.backend.Chat;

import com.springend.backend.Nutzer.Nutzer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepo extends JpaRepository<Nutzer, String> {
}
