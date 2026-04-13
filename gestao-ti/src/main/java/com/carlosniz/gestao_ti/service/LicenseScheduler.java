package com.carlosniz.gestao_ti.service;

import com.carlosniz.gestao_ti.entity.LicenseStatus;
import com.carlosniz.gestao_ti.entity.SoftwareLicense;
import com.carlosniz.gestao_ti.repository.SoftwareLicenseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class LicenseScheduler {

    private final SoftwareLicenseRepository softwareLicenseRepository;

    @Scheduled(cron = "0 0 8 * * *") // Roda todo dia às 8h
    public void checkExpiredLicenses() {
        LocalDate today = LocalDate.now();
        LocalDate warningDate = today.plusDays(30);

        List<SoftwareLicense> licenses = softwareLicenseRepository.findAll();

        for (SoftwareLicense license : licenses) {
            if (license.getExpirationDate().isBefore(today)) {
                license.setStatus(LicenseStatus.EXPIRADA);
                softwareLicenseRepository.save(license);
                log.warn("Licença expirada: {} - {}", license.getSoftwareName(), license.getLicenseKey());

            } else if (license.getExpirationDate().isBefore(warningDate)) {
                license.setStatus(LicenseStatus.EXPIRANDO);
                softwareLicenseRepository.save(license);
                log.warn("Licença expirando em breve: {} - vence em {}",
                        license.getSoftwareName(), license.getExpirationDate());
            }
        }

        log.info("Verificação de licenças concluída em {}", today);
    }
}