package com.carlosniz.gestao_ti.dto;

import com.carlosniz.gestao_ti.entity.LicenseStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SoftwareLicenseRequestDTO {

    @NotBlank(message = "Nome do software é obrigatório")
    private String softwareName;

    @NotBlank(message = "Chave de licença é obrigatória")
    private String licenseKey;

    private String vendor;
    private Integer totalSeats;
    private Integer usedSeats;

    @NotNull(message = "Data de expiração é obrigatória")
    private LocalDate expirationDate;

    @NotBlank(message = "Status é obrigatório")
    private LicenseStatus status;
}