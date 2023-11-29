package com.example.project.controller;

import com.example.project.dto.StatusDTO;
import com.example.project.service.StatusService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statuses")
public class StatusController {
    private final StatusService statusService;

    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<List<StatusDTO>> getAllStatuses(@PathVariable Long projectId) {
        System.out.println(projectId);
        List<StatusDTO> statuses = statusService.getAllStatuses(projectId);
        return new ResponseEntity<>(statuses, HttpStatus.OK);
    }

    @PostMapping("/create/{projectId}")
    public ResponseEntity<StatusDTO> createStatus(@PathVariable Long projectId) {
        StatusDTO createdStatus = statusService.createStatus(projectId);
        return new ResponseEntity<>(createdStatus, HttpStatus.CREATED);
    }

    @PostMapping("/confirm/{projectId}")
    public ResponseEntity<StatusDTO> createStatus2(@PathVariable Long projectId) {
        StatusDTO createdStatus = statusService.createDesignerConfirmedStatus(projectId);
        return new ResponseEntity<>(createdStatus, HttpStatus.CREATED);
    }

    @PostMapping("/approve/{projectId}")
    public ResponseEntity<StatusDTO> createStatus3(@PathVariable Long projectId) {
        StatusDTO createdStatus = statusService.createAdminApprovedStatus(projectId);
        return new ResponseEntity<>(createdStatus, HttpStatus.CREATED);
    }

    @PostMapping("/disapprove/{projectId}")
    public ResponseEntity<StatusDTO> createStatus4(@PathVariable Long projectId) {
        StatusDTO createdStatus = statusService.createAdminDisapprovedStatus(projectId);
        return new ResponseEntity<>(createdStatus, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StatusDTO> updateStatus(@PathVariable Long id, @RequestBody StatusDTO statusDTO) {
        statusDTO.setId(id);
        StatusDTO updatedStatus = statusService.updateStatus(statusDTO);
        return new ResponseEntity<>(updatedStatus, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStatus(@PathVariable Long id) {
        statusService.deleteStatus(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/mean")
    public ResponseEntity<Double> getArithmeticMean() {
        double mean = statusService.calculateArithmeticMean();
        return ResponseEntity.ok(mean);
    }
}
