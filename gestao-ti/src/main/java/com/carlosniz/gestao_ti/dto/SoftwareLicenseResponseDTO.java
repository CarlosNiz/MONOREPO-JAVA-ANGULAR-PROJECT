package com.carlosniz.gestao_ti.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class SoftwareLicenseResponseDTO {
    private UUID id;
    private String softwareName;
    private String licenseKey;
    private String vendor;
    private Integer totalSeats;
    private Integer usedSeats;
    private LocalDate expirationDate;
    private String status;
    private LocalDateTime createdAt;
}