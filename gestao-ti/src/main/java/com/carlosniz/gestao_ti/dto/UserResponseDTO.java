package com.carlosniz.gestao_ti.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class UserResponseDTO {
    private UUID id;
    private String username;
    private String email;
    private String roleName;
    private LocalDateTime createdAt;
}