package com.carlosniz.gestao_ti.exception;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ApiError {
    private int status;
    private String message;
    private LocalDateTime timestamp;
}
