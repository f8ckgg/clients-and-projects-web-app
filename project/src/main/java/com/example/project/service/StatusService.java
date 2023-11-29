package com.example.project.service;

import com.example.project.dto.BillDTO;
import com.example.project.dto.StatusDTO;
import com.example.project.entity.Project;
import com.example.project.entity.Status;
import com.example.project.entity.User;
import com.example.project.mapper.StatusMapper;
import com.example.project.repository.ProjectRepository;
import com.example.project.repository.StatusRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatusService {
    private final StatusRepository statusRepository;
    private final ProjectRepository projectRepository;
    private final StatusMapper statusMapper;

    public StatusService(StatusRepository statusRepository, StatusMapper statusMapper, ProjectRepository projectRepository) {
        this.statusRepository = statusRepository;
        this.statusMapper = statusMapper;
        this.projectRepository=projectRepository;

    }

    public List<StatusDTO> getAllStatuses(Long projectId) {
        return statusRepository.findAllByProjectId(projectId).stream()
                .map(statusMapper::toDTO)
                .sorted(Comparator.comparing(StatusDTO::getId))
                .collect(Collectors.toList());
    }

    public StatusDTO getStatusById(Long id) {
        Status status = statusRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Status not found"));
        return statusMapper.toDTO(status);
    }

    public StatusDTO createStatus(Long projectId) {
        Status status = new Status();
        status.setStatus("ADMIN_CREATED");
        status.setStatusdate(LocalDate.now());
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));
        status.setProject(project);
        Status createdStatus = statusRepository.save(status);
        return statusMapper.toDTO(createdStatus);
    }
    public StatusDTO createDesignerConfirmedStatus(Long projectId) {
        Status status = new Status();
        status.setStatus("DESIGNER_CONFIRMED");
        status.setStatusdate(LocalDate.now());
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));
        status.setProject(project);
        Status createdStatus = statusRepository.save(status);
        return statusMapper.toDTO(createdStatus);
    }

    public StatusDTO createAdminApprovedStatus(Long projectId) {
        Status status = new Status();
        status.setStatus("ADMIN_APPROVED");
        status.setStatusdate(LocalDate.now());
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));
        status.setProject(project);
        Status createdStatus = statusRepository.save(status);
        return statusMapper.toDTO(createdStatus);
    }

    public StatusDTO createAdminDisapprovedStatus(Long projectId) {
        Status status = new Status();
        status.setStatus("ADMIN_DISAPPROVED");
        status.setStatusdate(LocalDate.now());
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));
        status.setProject(project);
        Status createdStatus = statusRepository.save(status);
        return statusMapper.toDTO(createdStatus);
    }

    public StatusDTO updateStatus(StatusDTO statusDTO) {
        Status status = statusMapper.toEntity(statusDTO);
        Status updatedStatus = statusRepository.save(status);
        return statusMapper.toDTO(updatedStatus);
    }

    public void deleteStatus(Long id) {
        statusRepository.deleteById(id);
    }
    public double calculateArithmeticMean() {
        Long designerId = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        List<Project> projects = projectRepository.findAllByDesignerId(designerId);
        List<Integer> differences = new ArrayList<>();

        for (Project project : projects) {
            List<Status> statuses = statusRepository.findByProjectIdOrderByStatusdateAsc(project.getId());

            if (!statuses.isEmpty()) {
                LocalDate firstStatusDate = statuses.get(0).getStatusdate();
                LocalDate lastStatusDate = statuses.get(statuses.size() - 1).getStatusdate();
                int difference = (int) ChronoUnit.DAYS.between(firstStatusDate, lastStatusDate);
                differences.add(difference);
            }
        }

        double mean = differences.stream().mapToInt(Integer::intValue).average().orElse(0.0);
        return mean;
    }

}
