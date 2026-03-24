package com.carlosniz.gestao_ti.repository;

import com.carlosniz.gestao_ti.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, UUID> {
    Optional<Equipment> findBySerialNumber(String serialNumber);
    List<Equipment> findByStatus(String status);
    List<Equipment> findByAssignedUserId(UUID userId);
}