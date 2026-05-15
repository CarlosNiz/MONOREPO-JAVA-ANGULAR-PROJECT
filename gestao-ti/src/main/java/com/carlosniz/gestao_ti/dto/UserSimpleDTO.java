package com.carlosniz.gestao_ti.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserSimpleDTO {
    private UUID id;
    private String username;
}