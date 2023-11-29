package com.example.project.repository;

import com.example.project.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StatusRepository extends JpaRepository<Status, Long> {
    List<Status> findAllByProjectId(Long id);
    List<Status> findByProjectIdOrderByStatusdateAsc(Long projectId);
}
