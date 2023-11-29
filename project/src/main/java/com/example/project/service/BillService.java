package com.example.project.service;

import com.example.project.dto.BillDTO;
import com.example.project.entity.Bill;
import com.example.project.entity.User;
import com.example.project.mapper.BillMapper;
import com.example.project.repository.BillRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BillService {
    private final BillRepository billRepository;
    private final BillMapper billMapper;

    public BillService(BillRepository billRepository, BillMapper billMapper) {
        this.billRepository = billRepository;
        this.billMapper = billMapper;
    }

    public List<BillDTO> getAllBills() {
        return billRepository.findAll().stream()
                .map(billMapper::toDTO)
                .sorted(Comparator.comparing(BillDTO::getId).reversed())
                .collect(Collectors.toList());
    }

    public BillDTO getBillById(Long id) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bill not found"));
        return billMapper.toDTO(bill);
    }

    public BillDTO createBill(BillDTO billDTO) {
        Bill bill = billMapper.toEntity(billDTO);
        Bill createdBill = billRepository.save(bill);
        return billMapper.toDTO(createdBill);
    }

    public BillDTO updateBill(BillDTO billDTO) {
        Bill bill = billMapper.toEntity(billDTO);
        Bill updatedBill = billRepository.save(bill);
        return billMapper.toDTO(updatedBill);
    }

    public void deleteBill(Long id) {
        billRepository.deleteById(id);
    }
}

