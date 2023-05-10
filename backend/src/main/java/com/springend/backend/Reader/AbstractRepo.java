package com.springend.backend.Reader;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AbstractRepo extends JpaRepository<AbstractFile,Long> {
}
