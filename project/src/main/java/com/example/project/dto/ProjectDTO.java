package com.example.project.dto;

import com.example.project.entity.Client;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {
    private Long id;
    private UserDTO admin;
    private UserDTO designer;
    private boolean made;
    private String name;
    private String link;
    private String address;
    private String square;
    private Client client;
}
