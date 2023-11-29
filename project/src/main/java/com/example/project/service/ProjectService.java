package com.example.project.service;


import com.example.project.dto.BillDTO;
import com.example.project.dto.ProjectDTO;
import com.example.project.dto.UserDTO;
import com.example.project.entity.Project;
import com.example.project.entity.User;
import com.example.project.mapper.ProjectMapper;
import com.example.project.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final StatusService statusService;

    public ProjectService(StatusService statusService,ProjectRepository projectRepository, ProjectMapper projectMapper) {
        this.statusService=statusService;
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(projectMapper::toDTO)
                .sorted(Comparator.comparing(ProjectDTO::getId).reversed())
                .collect(Collectors.toList());
    }
    public List<ProjectDTO> getAllProjects2() {
        Long id = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return projectRepository.findAllByDesignerId(id).stream()
                .map(projectMapper::toDTO)
                .sorted(Comparator.comparing(ProjectDTO::getId).reversed())
                .collect(Collectors.toList());
    }
    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));
        return projectMapper.toDTO(project);
    }

    public ProjectDTO createProject(ProjectDTO projectDTO) {
        Long userId = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userId);
        projectDTO.setAdmin(userDTO);
        Project project = projectMapper.toEntity(projectDTO);
        Project createdProject = projectRepository.save(project);
        statusService.createStatus(project.getId());
        return projectMapper.toDTO(createdProject);
    }

    public ProjectDTO updateProject(ProjectDTO projectDTO) {
        Project project = projectMapper.toEntity(projectDTO);
        Project updatedProject = projectRepository.save(project);
        return projectMapper.toDTO(updatedProject);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
    public ProjectDTO setProjectMade(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));
        project.setMade(true);
        Project updatedProject = projectRepository.save(project);
        return projectMapper.toDTO(updatedProject);
    }
}


