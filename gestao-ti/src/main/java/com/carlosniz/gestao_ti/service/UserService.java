package com.carlosniz.gestao_ti.service;

import com.carlosniz.gestao_ti.dto.UserRequestDTO;
import com.carlosniz.gestao_ti.dto.UserResponseDTO;
import com.carlosniz.gestao_ti.dto.UserUpdateDTO;
import com.carlosniz.gestao_ti.entity.Role;
import com.carlosniz.gestao_ti.entity.User;
import com.carlosniz.gestao_ti.repository.RoleRepository;
import com.carlosniz.gestao_ti.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponseDTO create(UserRequestDTO dto) {
        Role role = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role padrão não encontrada"));

        User user = User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(role)
                .build();

        userRepository.save(user);
        log.info("Usuário criado: {}", user.getUsername());
        return toResponse(user);
    }

    public Page<UserResponseDTO> findAll(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(this::toResponse);
    }

    public UserResponseDTO findById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return toResponse(user);
    }

    public void delete(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        userRepository.deleteById(id);
        log.info("Usuário deletado, {}", user.getUsername());
    }

    public UserResponseDTO promoteToAdmin(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseThrow(() -> new RuntimeException("Role ADMIN não encontrada"));

        user.setRole(adminRole);
        userRepository.save(user);
        log.info("Usuário promovido para ADMIN: {}", user.getUsername());
        return toResponse(user);
    }

    public UserResponseDTO update(UUID id, UserUpdateDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if(dto.getUsername() != null) {
            user.setUsername(dto.getUsername());
        }
        if(dto.getEmail() != null) {
            user.setEmail(dto.getEmail());
        }
        if(dto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        userRepository.save(user);
        log.info("Usuário atualizado: {}", user.getUsername());
        return toResponse(user);
    }

    private UserResponseDTO toResponse(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roleName(user.getRole().getName())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
