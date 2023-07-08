package com.springend.backend.DiagrammSave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiagrammRepo extends JpaRepository<Diagramm, Long> {
}