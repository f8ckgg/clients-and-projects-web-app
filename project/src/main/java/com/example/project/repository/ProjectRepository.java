package com.example.project.repository;

import com.example.project.entity.Project;
import com.example.project.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByDesignerId(Long id);

}
