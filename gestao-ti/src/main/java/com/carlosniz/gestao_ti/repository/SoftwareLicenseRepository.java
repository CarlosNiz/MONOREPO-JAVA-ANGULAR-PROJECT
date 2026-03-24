package com.carlosniz.gestao_ti.repository;

import com.carlosniz.gestao_ti.entity.SoftwareLicense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SoftwareLicenseRepository extends JpaRepository<SoftwareLicense, UUID> {
    Optional<SoftwareLicense> findByLicenseKey(String licenseKey);
    List<SoftwareLicense> findByStatus(String status);
    List<SoftwareLicense> findBySoftwareName(String softwareName);
}