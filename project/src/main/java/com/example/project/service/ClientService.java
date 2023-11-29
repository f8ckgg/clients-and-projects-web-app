package com.example.project.service;

import com.example.project.dto.BillDTO;
import com.example.project.dto.ClientDTO;
import com.example.project.entity.Client;
import com.example.project.mapper.ClientMapper;
import com.example.project.repository.ClientRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {
    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public ClientService(ClientRepository clientRepository, ClientMapper clientMapper) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
    }

    public List<ClientDTO> getAllClients() {
        return clientRepository.findAll().stream()
                .map(clientMapper::toDTO)
                .sorted(Comparator.comparing(ClientDTO::getId).reversed())
                .collect(Collectors.toList());
    }

    public ClientDTO getClientById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client not found"));
        return clientMapper.toDTO(client);
    }

    public ClientDTO createClient(ClientDTO clientDTO) {
        Client client = clientMapper.toEntity(clientDTO);
        Client createdClient = clientRepository.save(client);
        return clientMapper.toDTO(createdClient);
    }

    public ClientDTO updateClient(ClientDTO clientDTO) {
        Client client = clientMapper.toEntity(clientDTO);
        Client updatedClient = clientRepository.save(client);
        return clientMapper.toDTO(updatedClient);
    }

    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }
}
