package com.example.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatusDTO {
    private Long id;
    private String status;
    private LocalDate statusdate;
    private ProjectDTO project;
}
