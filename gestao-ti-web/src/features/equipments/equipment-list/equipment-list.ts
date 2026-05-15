import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { EquipmentService } from '../../../core/services/equipment.service';
import { AuthService } from '../../../core/services/auth.service';
import { Equipment } from '../../../shared/models/equipment.model';

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './equipment-list.html',
  styleUrl: './equipment-list.scss'
})
export class EquipmentList implements OnInit {

  equipments: Equipment[] = [];
  loading = false;
  errorMessage = '';
  currentPage = 0;
  totalPages = 0;
  isAdmin = false;

  constructor(
    private equipmentService: EquipmentService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments(): void {
    this.loading = true;
    this.equipmentService.findAll(this.currentPage, 10).subscribe({
      next: (page) => {
        this.equipments = page.content;
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
      this.loadEquipments();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadEquipments();
    }
  }

  deleteEquipment(id: string): void {
    if (!confirm('Tem certeza que deseja excluir este equipamento?')) return;

    this.equipmentService.delete(id).subscribe({
      next: () => this.loadEquipments(),
      error: (err) => alert(err.message)
    });
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}