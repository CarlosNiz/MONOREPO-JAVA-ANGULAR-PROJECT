package com.carlosniz.gestao_ti.dto;

import com.carlosniz.gestao_ti.entity.EquipmentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class EquipmentRequestDTO {

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotBlank(message = "Tipo é obrigatório")
    private String type;

    @NotBlank(message = "Número de série é obrigatório")
    private String serialNumber;

    private String brand;
    private String model;

    @NotNull(message = "Status é obrigatório")
    private EquipmentStatus status;

    private UUID assignedUserId;
}