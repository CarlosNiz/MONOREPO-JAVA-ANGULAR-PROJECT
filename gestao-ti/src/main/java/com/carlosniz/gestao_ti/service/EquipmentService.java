package com.carlosniz.gestao_ti.service;

import com.carlosniz.gestao_ti.dto.EquipmentRequestDTO;
import com.carlosniz.gestao_ti.dto.EquipmentResponseDTO;
import com.carlosniz.gestao_ti.entity.Equipment;
import com.carlosniz.gestao_ti.entity.User;
import com.carlosniz.gestao_ti.repository.EquipmentRepository;
import com.carlosniz.gestao_ti.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;
    private final UserRepository userRepository;

    public EquipmentResponseDTO create(EquipmentRequestDTO dto) {
        User assignedUser = null;
        if(dto.getAssignedUserId() != null) {
            assignedUser = userRepository.findById(dto.getAssignedUserId())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        }

        Equipment equipment = Equipment.builder()
                .name(dto.getName())
                .type(dto.getType())
                .serialNumber(dto.getSerialNumber())
                .brand(dto.getBrand())
                .model(dto.getModel())
                .status(dto.getStatus())
                .assignedUser(assignedUser)
                .build();

        equipmentRepository.save(equipment);
        return toResponse(equipment);
    }

    public Page<EquipmentResponseDTO> findAll(Pageable pageable) {
        return equipmentRepository.findAll(pageable)
                .map(this::toResponse);
    }

    public EquipmentResponseDTO findById(UUID id) {
        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipamento não encontrado"));

        return toResponse(equipment);
    }

    public EquipmentResponseDTO update (UUID id, EquipmentRequestDTO dto) {
        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipamento não encontrado"));

        User assignedUser = null;
        if (dto.getAssignedUserId() != null) {
            assignedUser = userRepository.findById(dto.getAssignedUserId())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        }

        equipment.setName(dto.getName());
        equipment.setType(dto.getType());
        equipment.setSerialNumber(dto.getSerialNumber());
        equipment.setBrand(dto.getBrand());
        equipment.setModel(dto.getModel());
        equipment.setStatus(dto.getStatus());
        equipment.setAssignedUser(assignedUser);

        equipmentRepository.save(equipment);
        return toResponse(equipment);
    }

    public void delete(UUID id) {
        equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipamento não encontrado"));

        equipmentRepository.deleteById(id);
    }

    private EquipmentResponseDTO toResponse(Equipment equipment) {
        return EquipmentResponseDTO.builder()
                .id(equipment.getId())
                .name(equipment.getName())
                .type(equipment.getType())
                .serialNumber(equipment.getSerialNumber())
                .brand(equipment.getBrand())
                .model(equipment.getModel())
                .status(equipment.getStatus())
                .assignedUsername(equipment.getAssignedUser() != null
                        ? equipment.getAssignedUser().getUsername()
                        : null)
                .createdAt(equipment.getCreatedAt())
                .build();
    }
}
