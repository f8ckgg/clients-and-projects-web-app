package com.example.project.mapper;

import com.example.project.dto.ProjectDTO;
import com.example.project.entity.Project;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    ProjectDTO toDTO(Project project);
    Project toEntity(ProjectDTO projectDTO);
}
