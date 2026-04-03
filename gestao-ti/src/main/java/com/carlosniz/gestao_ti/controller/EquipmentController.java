package com.carlosniz.gestao_ti.controller;

import com.carlosniz.gestao_ti.dto.EquipmentRequestDTO;
import com.carlosniz.gestao_ti.dto.EquipmentResponseDTO;
import com.carlosniz.gestao_ti.service.EquipmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/equipments")
@RequiredArgsConstructor
public class EquipmentController {
    private final EquipmentService equipmentService;

    @PostMapping
    public ResponseEntity<EquipmentResponseDTO> create(@RequestBody @Valid EquipmentRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(equipmentService.create(dto));
    }

    @GetMapping
    public ResponseEntity<Page<EquipmentResponseDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok(equipmentService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipmentResponseDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(equipmentService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EquipmentResponseDTO> update(@PathVariable UUID id,
                                                       @RequestBody @Valid EquipmentRequestDTO dto) {
        return ResponseEntity.ok(equipmentService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        equipmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
