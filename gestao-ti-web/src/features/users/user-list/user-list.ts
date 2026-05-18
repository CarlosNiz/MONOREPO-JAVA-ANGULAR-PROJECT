import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList implements OnInit {

  users: User[] = [];
  loading = false;
  errorMessage = '';
  currentPage = 0;
  totalPages = 0;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.findAll(this.currentPage, 10).subscribe({
      next: (page) => {
        this.users = page.content;
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
      this.loadUsers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  promoteUser(id: string): void {
    if (!confirm('Promover este usuário a ADMIN?')) return;

    this.userService.promote(id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => alert(err.message)
    });
  }

  deleteUser(id: string): void {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    this.userService.delete(id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => alert(err.message)
    });
  }
}