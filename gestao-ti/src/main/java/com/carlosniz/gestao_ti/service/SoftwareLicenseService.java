package com.carlosniz.gestao_ti.service;

import com.carlosniz.gestao_ti.dto.SoftwareLicenseRequestDTO;
import com.carlosniz.gestao_ti.dto.SoftwareLicenseResponseDTO;
import com.carlosniz.gestao_ti.entity.SoftwareLicense;
import com.carlosniz.gestao_ti.repository.SoftwareLicenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SoftwareLicenseService {

    private final SoftwareLicenseRepository softwareLicenseRepository;

    public SoftwareLicenseResponseDTO create(SoftwareLicenseRequestDTO dto) {
        SoftwareLicense license = SoftwareLicense.builder()
                .softwareName(dto.getSoftwareName())
                .licenseKey(dto.getLicenseKey())
                .vendor(dto.getVendor())
                .totalSeats(dto.getTotalSeats())
                .usedSeats(dto.getUsedSeats())
                .expirationDate(dto.getExpirationDate())
                .status(dto.getStatus())
                .build();

        softwareLicenseRepository.save(license);

        return toResponse(license);
    }

    public Page<SoftwareLicenseResponseDTO> findAll(Pageable pageable) {
        return softwareLicenseRepository.findAll(pageable)
                .map(this::toResponse);
    }

    public SoftwareLicenseResponseDTO findById(UUID id) {
        SoftwareLicense license = softwareLicenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Licença não encontrada"));

        return toResponse(license);
    }

    public SoftwareLicenseResponseDTO update(UUID id, SoftwareLicenseRequestDTO dto) {
        SoftwareLicense license = softwareLicenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Licença não encontrada"));

        license.setSoftwareName(dto.getSoftwareName());
        license.setLicenseKey(dto.getLicenseKey());
        license.setVendor(dto.getVendor());
        license.setTotalSeats(dto.getTotalSeats());
        license.setUsedSeats(dto.getUsedSeats());
        license.setExpirationDate(dto.getExpirationDate());
        license.setStatus(dto.getStatus());

        softwareLicenseRepository.save(license);
        return toResponse(license);
    }

    public void delete(UUID id) {
        softwareLicenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Licença não encontrada"));

        softwareLicenseRepository.deleteById(id);
    }

    private SoftwareLicenseResponseDTO toResponse(SoftwareLicense license) {
        return SoftwareLicenseResponseDTO.builder()
                .id(license.getId())
                .softwareName(license.getSoftwareName())
                .licenseKey(license.getLicenseKey())
                .vendor(license.getVendor())
                .totalSeats(license.getTotalSeats())
                .usedSeats(license.getUsedSeats())
                .expirationDate(license.getExpirationDate())
                .status(license.getStatus())
                .createdAt(license.getCreatedAt())
                .build();
    }
}
