package com.carlosniz.gestao_ti.controller;

import com.carlosniz.gestao_ti.dto.SoftwareLicenseRequestDTO;
import com.carlosniz.gestao_ti.dto.SoftwareLicenseResponseDTO;
import com.carlosniz.gestao_ti.service.SoftwareLicenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/licenses")
@RequiredArgsConstructor
public class SoftwareLicenseController {

    private final SoftwareLicenseService softwareLicenseService;

    @PostMapping
    public ResponseEntity<SoftwareLicenseResponseDTO> create(@RequestBody @Valid SoftwareLicenseRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(softwareLicenseService.create(dto));
    }

    @GetMapping
    public ResponseEntity<Page<SoftwareLicenseResponseDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok(softwareLicenseService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SoftwareLicenseResponseDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(softwareLicenseService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SoftwareLicenseResponseDTO> update(@PathVariable UUID id,
                                                             @RequestBody @Valid SoftwareLicenseRequestDTO dto) {
        return ResponseEntity.ok(softwareLicenseService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        softwareLicenseService.delete(id);
        return ResponseEntity.noContent().build();
    }
}