package com.carlosniz.gestao_ti.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class EquipmentResponseDTO {
    private UUID id;
    private String name;
    private String type;
    private String serialNumber;
    private String brand;
    private String model;
    private String status;
    private String assignedUsername;
    private LocalDateTime createdAt;
}