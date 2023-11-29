package com.example.project.service;


import com.example.project.dto.BillDTO;
import com.example.project.dto.UserDTO;
import com.example.project.entity.User;
import com.example.project.mapper.UserMapper;
import com.example.project.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final UserMapper userMapper;
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAllByAdmin(false).stream()
                .map(userMapper::toDTO)
                .sorted(Comparator.comparing(UserDTO::getId).reversed())
                .collect(Collectors.toList());
    }
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return userMapper.toDTO(user);
    }
    public UserDTO updateUser(String name) {
        User user = userRepository.findById(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId()).orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(name);
        User updatedUser = userRepository.save(user);
        return userMapper.toDTO(updatedUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

}