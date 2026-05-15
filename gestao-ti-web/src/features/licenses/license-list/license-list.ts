import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LicenseService } from '../../../core/services/license.service';
import { AuthService } from '../../../core/services/auth.service';
import { License } from '../../../shared/models/license.model';

@Component({
  selector: 'app-license-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './license-list.html',
  styleUrl: './license-list.scss'
})
export class LicenseList implements OnInit {

  licenses: License[] = [];
  loading = false;
  errorMessage = '';
  currentPage = 0;
  totalPages = 0;

  constructor(
    private licenseService: LicenseService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLicenses();
  }

  loadLicenses(): void {
    this.loading = true;
    this.licenseService.findAll(this.currentPage, 10).subscribe({
      next: (page) => {
        this.licenses = page.content;
        this.totalPages = page.totalPages;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadLicenses();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadLicenses();
    }
  }

  deleteLicense(id: string): void {
    if (!confirm('Tem certeza que deseja excluir esta licença?')) return;

    this.licenseService.delete(id).subscribe({
      next: () => this.loadLicenses(),
      error: (err) => alert(err.message)
    });
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}