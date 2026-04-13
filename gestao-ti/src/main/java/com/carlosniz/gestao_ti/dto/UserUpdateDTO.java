package com.carlosniz.gestao_ti.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateDTO {

    @Size(min = 3, max = 50, message = "Username deve ter entre 3 e 50 caracteres")
    @Pattern(
            regexp = "^[a-zA-Z]+$",
            message = "Username deve conter apenas letras"
    )
    private String username;

    @Email(message = "Email inválido")
    private String email;

    private String password;
}
