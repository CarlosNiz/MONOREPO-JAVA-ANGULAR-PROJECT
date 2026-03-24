package com.carlosniz.gestao_ti.dto;

import jakarta.validation.constraints.NotBlank;
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

    @NotBlank(message = "Status é obrigatório")
    private String status;

    private UUID assignedUserId;
}