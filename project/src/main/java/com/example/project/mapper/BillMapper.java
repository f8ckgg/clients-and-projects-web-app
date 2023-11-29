package com.example.project.mapper;

import com.example.project.dto.BillDTO;
import com.example.project.entity.Bill;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BillMapper {
    BillDTO toDTO(Bill bill);
    Bill toEntity(BillDTO billDTO);
}
