package com.example.project.mapper;

import com.example.project.dto.StatusDTO;
import com.example.project.entity.Status;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StatusMapper {
    StatusDTO toDTO(Status status);
    Status toEntity(StatusDTO statusDTO);
}
